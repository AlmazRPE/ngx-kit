import { Injectable } from "@angular/core";
import { TranslationOptions } from "./options";
import { NotFoundError, PleaseDefineError } from "../errors";
import { I18nConfig } from "./config";
import { TranslationMapByLang } from "./translation";
import { TranslationModifier } from "./modifier";

@Injectable({
  providedIn: "root"
})
export class I18nService
{
  private lang?: string;
  private defaultLang: string = "en";
  private translationMapByLang: TranslationMapByLang;

  public constructor()
  {
    this.init({lang: "en"});
  }

  /**
   * Only defined fields of config are rewritten, others are ignored.
   */
  public init(config: I18nConfig): void
  {
    if (config.lang !== undefined)
    {
      this.lang = config.lang;
    }
    if (config.defaultLang !== undefined)
    {
      this.defaultLang = config.defaultLang;
    }
    if (config.translationMapByLang !== undefined)
    {
      this.translationMapByLang = config.translationMapByLang;
    }
  }

  public getTranslation(
    code: string,
    options?: TranslationOptions
  ): string
  {
    if (this.translationMapByLang === undefined)
    {
      throw new PleaseDefineError(
        "translation retrieve",
        "config.translationMapByLang"
      );
    }

    let finalOptions: TranslationOptions = {};
    if (options !== undefined)
    {
      finalOptions = options;
    }

    const isCapitalized: boolean = finalOptions.isCapitalized !== undefined
      ? finalOptions.isCapitalized : false;

    let finalLang: string = this.defaultLang;
    if (this.lang !== undefined)
    {
      finalLang = this.lang;
    }

    let finalModifier: string = TranslationModifier.Default;
    if (finalOptions.modifier !== undefined)
    {
      finalModifier = finalOptions.modifier;
    }

    let translation: string;
    try
    {
      translation =
        this.translationMapByLang[finalLang][code][finalModifier];
    }
    catch (err)
    {
      // try get from default
      // in case if lang is undefined, this will do redundant work, since
      // if lang === undefined => finalLang = defaultLang, but we can allow
      // this for now
      try
      {
        translation =
          this.translationMapByLang[this.defaultLang][code][finalModifier];
      }
      catch (err)
      {
        if (finalOptions.fallback === undefined)
        {
          throw new NotFoundError(
            "a translation for code " + code,
            finalOptions
          );
        }
        translation = finalOptions.fallback;
      }
    }

    if (finalOptions.params !== undefined)
    {
      for (const key in finalOptions.params)
      {
        // just skip if the translation does not contain a param - it's ok
        translation.replaceAll("${" + key + "}", finalOptions.params[key]);
      }
    }

    // TODO(ryzhovalex):
    //    check that not variable brackets are left, to avoid errors

    if (isCapitalized === true)
    {
      translation = translation[0].toUpperCase() + translation.slice(1);
    }

    return translation;
  }
}