import { readFile, readdir } from 'node:fs/promises'
import { Exception } from '@adonisjs/core/exceptions'
import { MarkdownFile } from '@dimerapp/markdown'
import { toHtml } from '@dimerapp/markdown/utils'

interface ContentImageObject {
  image: string
  alt: string
}

interface LocalizedString {
  en: string
  fr: string
  cz: string
}

interface RawContentObject {
  title: string | LocalizedString
  subtitle: string | LocalizedString
  mainImageH: string
  mainImageV: string
  mainImageAlt: string | LocalizedString
  images: {
    image: string
    alt: string | LocalizedString
  }[]
}

interface ContentObject {
  fileName: string
  title: string
  subtitle: string
  mainImageH: string
  mainImageV: string
  description: string
  mainImageAlt: string
  images: ContentImageObject[]
}

export enum ContentTypeEnum {
  retail = 'retail',
  research = 'research',
}

export class ContentService {
  private static contentFolderPath = 'resources/content/'
  private static imagesFolderPath = '/images/'

  public static async getContent(
    contentType: ContentTypeEnum,
    language: 'en' | 'fr' | 'cz'
  ): Promise<ContentObject[]> {
    try {
      //const filesList = await this.getContentFilesList(contentType)
      const projects = await this.listProjectsNames(contentType)

      if (projects.length > 0) {
        const contentObjects: ContentObject[] = await Promise.all(
          projects.map(async (project) => {
            const structure = await this.getStructureContent(contentType, project, language)
            const description = await this.getDescription(contentType, project, language)
            console.log(description)

            return {
              fileName: project,
              title: structure.title,
              subtitle: structure.subtitle,
              description,
              mainImageH: structure.mainImageH,
              mainImageV: structure.mainImageV,
              mainImageAlt: structure.mainImageAlt,
              images: structure.images,
            }
          })
        )

        return contentObjects.sort((a, b) => {
          const numA = Number.parseInt(a.fileName.split('-')[0], 10)
          const numB = Number.parseInt(b.fileName.split('-')[0], 10)
          return numA - numB
        })
      } else {
        return []
      }
    } catch (error) {
      throw new Exception(`Could not load content: ${contentType}`, {
        code: 'E_NOT_FOUND',
        status: 404,
      })
    }
  }

  private static async listProjectsNames(contentType: ContentTypeEnum): Promise<string[]> {
    try {
      const directoryPath = this.contentFolderPath + contentType
      const entries = await readdir(directoryPath, { withFileTypes: true })
      return entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name)
    } catch (error) {
      throw new Exception(`Could not load content: ${contentType}`, {
        code: 'E_NOT_FOUND',
        status: 404,
      })
    }
  }

  private static getDescription = async (
    contentType: ContentTypeEnum,
    fileName: string,
    language: string
  ): Promise<string> => {
    try {
      const path = `${this.contentFolderPath}${contentType}/${fileName}/${language}.md`
      const file = await readFile(path, { encoding: 'utf8' })
      const md = new MarkdownFile(file)
      await md.process()
      return toHtml(md).contents
    } catch (error) {
      throw new Exception(`Could not read description file content called ${fileName}`, {
        code: 'E_NOT_FOUND',
        status: 404,
      })
    }
  }

  private static getStructureContent = async (
    contentType: ContentTypeEnum,
    fileName: string,
    language: string
  ): Promise<ContentObject> => {
    try {
      const path = `${this.contentFolderPath}${contentType}/${fileName}/structure.json`
      const file = JSON.parse(await readFile(path, 'utf8')) as RawContentObject

      //formatContent
      file.title = this.formatString(file.title, language)
      file.subtitle = this.formatString(file.subtitle, language)
      file.mainImageH = this.renameImagesWithPath(contentType, file.mainImageH)
      file.mainImageV = this.renameImagesWithPath(contentType, file.mainImageV)
      file.mainImageAlt = this.formatString(file.mainImageAlt, language)

      file.images = file.images.map((img) => ({
        image: this.renameImagesWithPath(contentType, img.image),
        alt: this.formatString(img.alt, language),
      }))

      return { ...file, fileName } as ContentObject
    } catch (error) {
      throw new Exception(`Could not find file content called ${fileName}`, {
        code: 'E_NOT_FOUND',
        status: 404,
      })
    }
  }

  private static formatString(rawString: string | LocalizedString, language: string): string {
    if (typeof rawString === 'object') {
      return rawString[language]
    } else {
      return rawString
    }
  }

  private static renameImagesWithPath = (
    contentType: ContentTypeEnum,
    imageName: string
  ): string => {
    return `${this.imagesFolderPath}${contentType}/${imageName}`
  }
}
