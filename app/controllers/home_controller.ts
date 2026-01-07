import type { HttpContext } from '@adonisjs/core/http'
import i18nManager from '@adonisjs/i18n/services/main'

export default class HomeController {
  async index({ response }: HttpContext) {
    const lang = 'en'
    return response.redirect().toRoute('home-show', { lang })
  }

  async show({ params, view }: HttpContext) {
    const language = params.lang
    const availableLanguages = Object.keys(i18nManager.getTranslations())

    let i18n

    if (availableLanguages.includes(language)) {
      i18n = i18nManager.locale(language)
    } else {
      i18n = i18nManager.locale('en')
    }
    return view.render('pages/home', { i18n })
  }
}
