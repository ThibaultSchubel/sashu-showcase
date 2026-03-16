import type { HttpContext } from '@adonisjs/core/http'
import { DetectLocalService } from '#services/detect_local_service'
import { ContentTypeEnum } from '#services/content_service'
import { AboutContentService, AboutContentTypeEnum } from '#services/about_content_service'
import ContentCacheService from '#services/content_cache_service'

export default class ResearchController {
  async index(ctx: HttpContext) {
    const locale = DetectLocalService.getLocale(ctx)
    return ctx.response.redirect().toRoute('research-show', { locale })
  }

  async show({ params, view }: HttpContext) {
    //Get Locale
    const language = params.locale
    const i18n = DetectLocalService.getI18n(language)

    if (!i18n) {
      const error = {
        code: '500',
        message: 'Cannot load I18N',
      }
      return view.render('pages/errors/server-error', { error })
    }

    const contentPath = ContentTypeEnum.research

    //Get Content
    //const contentArray = await ContentService.getContent(contentPath, language)
    const contentArray = await ContentCacheService.getProjectContent(ContentTypeEnum.research, 'fr')



    if (!contentArray || contentArray.error) {
      return view.render('pages/errors/server-error', { error: 'Cannot load content' })
    }

    //Get about content
    const aboutContentPath = AboutContentTypeEnum.aboutResearch
    const aboutContent = await AboutContentService.getContent(aboutContentPath, language)

    if (i18n && contentArray.content) {
      return view.render('pages/research', {
        i18n,
        currentLocale: language,
        path: contentPath,
        content: contentArray.content,
        aboutContent,
      })
    } else {
      return view.render('pages/errors/server-error')
    }
  }
}
