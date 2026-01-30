import { Exception } from '@adonisjs/core/exceptions'
import { readFile } from 'node:fs/promises'
import { MarkdownFile } from '@dimerapp/markdown'
import { toHtml } from '@dimerapp/markdown/utils'

interface AboutContentObject {
  paragraph: string
  drawer1: string
  drawer2: string
  drawer3: string
  i18nFileName: string
}

export enum AboutContentTypeEnum {
  aboutRetail = 'about_retail',
  aboutResearch = 'about_research',
}

export class AboutContentService {
  private static contentFolderPath = 'resources/content'

  public static async getContent(
    contentType: AboutContentTypeEnum,
    language: 'en' | 'fr' | 'cz'
  ): Promise<AboutContentObject> {
    try {
      console.log(this.getPath(contentType, language, 'paragraph'))

      const paragraphPromise = readFile(this.getPath(contentType, language, 'paragraph'), {
        encoding: 'utf8',
      })

      const drawer1Promise = readFile(this.getPath(contentType, language, 'drawer-1'), {
        encoding: 'utf8',
      })

      const drawer2Promise = readFile(this.getPath(contentType, language, 'drawer-2'), {
        encoding: 'utf8',
      })

      const drawer3Promise = readFile(this.getPath(contentType, language, 'drawer-3'), {
        encoding: 'utf8',
      })

      const [paragraphMd, drawer1Md, drawer2Md, drawer3Md] = await Promise.all([
        paragraphPromise,
        drawer1Promise,
        drawer2Promise,
        drawer3Promise,
      ])

      const [paragraph, drawer1, drawer2, drawer3] = await Promise.all([
        await this.convertToHtml(paragraphMd),
        await this.convertToHtml(drawer1Md),
        await this.convertToHtml(drawer2Md),
        await this.convertToHtml(drawer3Md),
      ])

      return {
        paragraph,
        drawer1,
        drawer2,
        drawer3,
        i18nFileName: contentType,
      }
    } catch (error) {
      throw new Exception(`Could not load about content: ${contentType}`, {
        code: 'E_NOT_FOUND',
        status: 404,
      })
    }
  }

  private static getPath(
    contentType: AboutContentTypeEnum,
    language: 'en' | 'fr' | 'cz',
    fileName: string
  ) {
    const directory = `${this.contentFolderPath}/${contentType}/`
    const file = `${fileName}_${language}.md`
    return directory + file
  }

  private static async convertToHtml(content: string) {
    const md = new MarkdownFile(content)
    await md.process()
    return toHtml(md).contents
  }
}
