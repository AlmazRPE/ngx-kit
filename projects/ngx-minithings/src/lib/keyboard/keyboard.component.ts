import { Component, OnInit } from "@angular/core";
import { KeyboardService } from "./keyboard.service";
import { Observable, map } from "rxjs";
import { SelectedInputEvent } from "../input/selected-input/selected-input";
import { SelectedInputService }
  from "../input/selected-input/selected-input.service";

@Component({
  selector: "ngx-minithings-keyboard",
  templateUrl: "./keyboard.component.html",
  styleUrls: []
})
export class KeyboardComponent implements OnInit
{
  public cssSelectors$: Observable<string[]>;
  public selectedInputEvent$: Observable<SelectedInputEvent<any>>;

  public constructor(
    private keyboardService: KeyboardService,
    private selectedInputService: SelectedInputService
  ) {}

  public ngOnInit(): void
  {
    // initialize css selectors on init, not after DOM load or angular somehow
    // will give ChangedBeforeChecked-ish error
    this.cssSelectors$ = this.keyboardService.isEnabled$.pipe(
      map((isEnabled: boolean) =>
      {
        return isEnabled ? ["flex"] : ["hidden"];
      })
    );
  }

  public ngAfterViewInit(): void
  {
    // initialize keyboard only after DOM is initialized
    this.keyboardService.initialize();
    this.selectedInputEvent$ = this.selectedInputService.eventBus$;
  }
}
