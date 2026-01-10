// import type { HttpContext } from '@adonisjs/core/http'

import type { HttpContext } from '@adonisjs/core/http'
import { UrlToolService } from '#services/url_tool_service'

export default class LanguageController {
  async index({ params, request, response }: HttpContext) {
    const language = params.locale
    const referrer = request.header('referer')

    return response.redirect().toPath(`${UrlToolService.getPathSegment(referrer)}/${language}`)
  }
}
