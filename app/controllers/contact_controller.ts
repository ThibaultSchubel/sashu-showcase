import type { HttpContext } from '@adonisjs/core/http'
import { DetectLocalService } from '#services/detect_local_service'

export default class ContactController {
  async index(ctx: HttpContext) {
    const locale = DetectLocalService.getLocale(ctx)
    return ctx.response.redirect().toRoute('contact-show', { locale })
  }

  async show({ params, view }: HttpContext) {
    const language = params.locale
    const i18n = DetectLocalService.getI18n(language)
    if (i18n) {
      return view.render('pages/contact', { i18n, currentLocale: language, path: 'contact' })
    }
  }
}