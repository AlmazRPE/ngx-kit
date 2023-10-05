import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InputComponent } from "./input/input.component";
import { AlertComponent } from "./alert/alert.component";
import { ButtonComponent } from "./button/button.component";
import { BlockComponent } from "./block/block.component";
import { DatalistComponent } from "./datalist/datalist.component";
import { DPSComponent } from "./dps/dps.component";
import { HrComponent } from "./hr/hr.component";
import { KeyboardComponent } from "./keyboard/keyboard.component";
import { LoadingComponent } from "./loading/loading.component";
import {
  StatusCircleComponent
} from "./status-circle/status-circle.component";
import { AlertStackComponent } from "./alert/alert-stack.component";
import { ReactiveFormsModule } from "@angular/forms";
import { UnixTimestampToDatePipe } from "./dt/unix-timestamp-to-date.pipe";
import { CapitalizeEachPipe } from "./str/capitalize-each.pipe";
import { CapitalizePipe } from "./str/capitalize.pipe";
import { PaginationComponent } from "./pagination/pagination.component";


@NgModule({
  declarations: [
    ButtonComponent,
    InputComponent,
    AlertComponent,
    AlertStackComponent,
    BlockComponent,
    DatalistComponent,
    DPSComponent,
    HrComponent,
    KeyboardComponent,
    LoadingComponent,
    StatusCircleComponent,
    UnixTimestampToDatePipe,
    CapitalizeEachPipe,
    CapitalizePipe,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    ButtonComponent,
    InputComponent,
    AlertStackComponent,
    BlockComponent,
    DatalistComponent,
    DPSComponent,
    HrComponent,
    KeyboardComponent,
    LoadingComponent,
    StatusCircleComponent,
    UnixTimestampToDatePipe,
    CapitalizeEachPipe,
    CapitalizePipe,
    PaginationComponent
  ]
})
export class NgxMinithingsModule { }
