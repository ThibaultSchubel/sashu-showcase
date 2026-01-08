import type { HttpContext } from '@adonisjs/core/http'
import i18nManager from '@adonisjs/i18n/services/main'
import { type I18n } from '@adonisjs/i18n'

export class DetectLocalService {
  static getLocale(ctx: HttpContext): string {
    return i18nManager.getFallbackLocaleFor(ctx.request.languages()[0])
  }

  static getI18n(language: string): I18n | null {
    const availableLanguages = Object.keys(i18nManager.getTranslations())
    return availableLanguages.includes(language) ? i18nManager.locale(language) : null
  }
}
