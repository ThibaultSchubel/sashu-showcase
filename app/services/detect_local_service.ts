import type { HttpContext } from '@adonisjs/core/http'
import i18nManager from '@adonisjs/i18n/services/main'
import { type I18n } from '@adonisjs/i18n'

/**
 * DetectLocalService - A service for detecting and managing locales in a multilingual application I18n
 */
export class DetectLocalService {
  /**
   * Detects the user's preferred locale based on browser language settings.
   *
   * @param {HttpContext} ctx - The AdonisJS HTTP context, providing access to the request object.
   * @returns {string} The detected locale (e.g., "fr", "en", "cz") based on the user's browser settings.
   *
   * @description:
   * This method uses the `i18nManager` to determine the best matching locale
   * from the user's browser languages. It takes the first language from the
   * `Accept-Language` header (sent by the browser) and finds the best fallback
   * locale supported by the application.
   */
  static getLocale(ctx: HttpContext): string {
    return i18nManager.getFallbackLocaleFor(ctx.request.languages()[0])
  }

  /**
   * Retrieves an i18n instance for a specific language if it is supported.
   *
   * @param {string} language - The language code to retrieve (e.g., "fr", "en", "cz").
   * @returns {I18n | null} An i18n instance configured for the specified language,
   *                          or `null` if the language is not supported.
   *
   * @description:
   * This method checks if the requested language is among the available translations, depends on Adonis I18N configuration.
   * If it is, it returns an i18n instance configured for that language. Otherwise,
   * it returns `null`.
   *
   */
  static getI18n(language: string): I18n | null {
    const availableLanguages = Object.keys(i18nManager.getTranslations())
    return availableLanguages.includes(language)
      ? i18nManager.locale(language)
      : null
  }
}
