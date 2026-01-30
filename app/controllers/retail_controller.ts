import type { HttpContext } from '@adonisjs/core/http'
import { DetectLocalService } from '#services/detect_local_service'
import { ContentService, ContentTypeEnum } from '#services/content_service'
import { AboutContentService, AboutContentTypeEnum } from '#services/about_content_service'

export default class RetailController {
  async index(ctx: HttpContext) {
    const locale = DetectLocalService.getLocale(ctx)
    return ctx.response.redirect().toRoute('retail-show', { locale })
  }

  async show({ params, view }: HttpContext) {
    //Get Locale
    const language = params.locale
    const contentPath = ContentTypeEnum.retail
    const i18n = DetectLocalService.getI18n(language)

    //Get Content
    const content = await ContentService.getContent(contentPath, language)

    //Get about content
    const aboutContentPath = AboutContentTypeEnum.aboutRetail
    const aboutContent = await AboutContentService.getContent(aboutContentPath, language)

    if (i18n && content) {
      return view.render('pages/retail', {
        i18n,
        currentLocale: language,
        path: contentPath,
        content,
        aboutContent,
      })
    }
  }
}
