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
    const i18n = DetectLocalService.getI18n(language)

    if (!i18n) {
      const error = {
        code: '500',
        message: 'Cannot load I18N',
      }
      return view.render('pages/errors/server_error', { error })
    }

    const contentPath = ContentTypeEnum.retail

    //Get Content
    const contentArray = await ContentService.getContent(contentPath, language)

    if (contentArray.error) {
      return view.render('pages/errors/server_error', { error: contentArray.error })
    }

    //Get about content
    const aboutContentPath = AboutContentTypeEnum.aboutRetail
    const aboutContent = await AboutContentService.getContent(aboutContentPath, language)

    if (i18n && contentArray.content) {
      return view.render('pages/retail', {
        i18n,
        currentLocale: language,
        path: contentPath,
        content: contentArray.content,
        aboutContent,
      })
    } else {
      return view.render('pages/errors/server_error', {
        error: { code: 500, message: 'Not Found' },
      })
    }
  }
}
