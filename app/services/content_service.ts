import { readFile, readdir } from 'node:fs/promises'
import { Exception } from '@adonisjs/core/exceptions'

interface ContentImageObject {
  image: string
  alt: LocalizedString
}

interface LocalizedString {
  en: string
  fr: string
  cz: string
}

interface RawContentObject {
  title: string | LocalizedString
  subtitle: string | LocalizedString
  year: string
  description: string | LocalizedString
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
  title: LocalizedString
  subtitle: LocalizedString
  year: string
  description: LocalizedString
  mainImageH: string
  mainImageV: string

  mainImageAlt: LocalizedString
  images: ContentImageObject[]
}

export enum ContentTypeEnum {
  retail = 'retail',
  research = 'research',
}

export class ContentService {
  private static languagesArray = ['en', 'fr', 'cz']
  private static fileExtension = '.json'
  private static contentFolderPath = 'resources/content/'
  private static imagesFolderPath = '/images/'

  public static async getContent(contentType: ContentTypeEnum): Promise<ContentObject[]> {
    try {
      const filesList = await this.getContentFilesList(contentType)

      if (filesList.length > 0) {
        const filesContentList = await Promise.all(
          filesList.map(async (file) => {
            return await this.getFileContent(contentType, file)
          })
        )

        return filesContentList.sort((a, b) => {
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

  private static getContentFilesList = async (contentType: ContentTypeEnum): Promise<string[]> => {
    try {
      const path = this.contentFolderPath + contentType
      const files = await readdir(path)
      //return filtered file list: remove files names with bad extension and bad name pattern (ex: "001_", "012_" or "103_")
      return files.filter((file) => file.endsWith(this.fileExtension) && /^\d{3}_/.test(file))
    } catch (error) {
      throw new Exception(`Could not list content in folder /${contentType}`, {
        code: 'E_NOT_FOUND',
        status: 404,
      })
    }
  }

  private static getFileContent = async (
    contentType: ContentTypeEnum,
    fileName: string
  ): Promise<ContentObject> => {
    try {
      const path = `${this.contentFolderPath}${contentType}/${fileName}`
      const file = JSON.parse(await readFile(path, 'utf8')) as RawContentObject

      //formatContent
      file.title = this.formatString(file.title)
      file.subtitle = this.formatString(file.subtitle)
      file.description = this.formatString(file.description)
      file.mainImageH = this.renameImagesWithPath(contentType, file.mainImageH)
      file.mainImageV = this.renameImagesWithPath(contentType, file.mainImageV)
      file.mainImageAlt = this.formatString(file.mainImageAlt)

      file.images = file.images.map((img) => ({
        image: this.renameImagesWithPath(contentType, img.image),
        alt: this.formatString(img.alt),
      }))

      return { ...file, fileName } as ContentObject
    } catch (error) {
      throw new Exception(`Could not find file content called ${fileName}`, {
        code: 'E_NOT_FOUND',
        status: 404,
      })
    }
  }

  private static formatString(rawString: string | LocalizedString): LocalizedString {
    if (typeof rawString === 'string') {
      const localizedObj: LocalizedString = {} as LocalizedString
      for (const lang of this.languagesArray) {
        localizedObj[lang as keyof LocalizedString] = rawString
      }

      return localizedObj
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
