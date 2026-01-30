import type { HttpContext } from '@adonisjs/core/http'
import { DetectLocalService } from '#services/detect_local_service'
import { ContentService, ContentTypeEnum } from '#services/content_service'
import { AboutContentService, AboutContentTypeEnum } from '#services/about_content_service'

export default class ResearchController {
  async index(ctx: HttpContext) {
    const locale = DetectLocalService.getLocale(ctx)
    return ctx.response.redirect().toRoute('research-show', { locale })
  }

  async show({ params, view }: HttpContext) {
    const language = params.locale
    const contentPath = ContentTypeEnum.research
    const i18n = DetectLocalService.getI18n(language)

    //Get Content
    const content = await ContentService.getContent(contentPath, language)

    //Get about content
    const aboutContentPath = AboutContentTypeEnum.aboutResearch
    const aboutContent = await AboutContentService.getContent(aboutContentPath, language)

    console.log('content')
    console.log(content)

    if (i18n && content) {
      return view.render('pages/research', {
        i18n,
        currentLocale: language,
        path: contentPath,
        content,
        aboutContent,
      })
    }
  }
}
