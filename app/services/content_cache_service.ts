import { ContentService, ContentServiceReturn } from '#services/content_service'
import { AboutContentService, AboutContentTypeEnum } from '#services/about_content_service'

export enum ContentTypeEnum {
  retail = 'retail',
  research = 'research',
}

interface AboutContentObj {
  language: String
}

type ProjectContentObj = { language: String } & ContentServiceReturn

export interface ContentCacheObj {
  retail: ProjectContentObj[]
  research: ProjectContentObj[]
  aboutRetail: AboutContentObj[]
  aboutResearch: AboutContentObj[]
}

class ContentCacheService {
  private static content: ContentCacheObj | null = null

  static async getProjectContent(
    contentType: ContentTypeEnum,
    language: string
  ): Promise<ProjectContentObj | null | undefined> {
    if (!this.content) {
      await this.loadContent()
    }

    if (this.content) {
      switch (contentType) {
        case 'retail':
          for (const project of this.content.retail) {
            if (project.language === language) {
              return project
            }
          }
          break

        case 'research':
          for (const project of this.content.research) {
            if (project.language === language) {
              return project
            }
          }
          break
      }
    } else {
      return null
    }
  }

  static async getAboutContent(
    contentType: ContentTypeEnum,
    language: 'en' | 'fr' | 'cz'
  ): Promise<AboutContentObj | null | undefined> {
    if (!this.content) {
      await this.loadContent()
    }

    if (this.content) {
      switch (contentType) {
        case 'retail':
          for (const project of this.content.aboutRetail) {
            if (project.language === language) {
              return project
            }
          }
          break

        case 'research':
          for (const project of this.content.aboutResearch) {
            if (project.language === language) {
              return project
            }
          }
          break
      }
    } else {
      return null
    }
  }

  static async loadContent() {
    console.log('LOADED CONTENT')
    this.content = {
      retail: await this.loadProjectContent(ContentTypeEnum.retail),
      research: await this.loadProjectContent(ContentTypeEnum.research),
      aboutRetail: await this.loadAboutContent(AboutContentTypeEnum.aboutRetail),
      aboutResearch: await this.loadAboutContent(AboutContentTypeEnum.aboutRetail),
    }
  }

  private static async loadProjectContent(contentType: ContentTypeEnum) {
    const [en, fr, cz] = await Promise.all([
      ContentService.getContent(contentType, 'en'),
      ContentService.getContent(contentType, 'fr'),
      ContentService.getContent(contentType, 'cz'),
    ])

    return [
      { ...en, language: 'en' },
      { ...fr, language: 'fr' },
      { ...cz, language: 'cz' },
    ]
  }
  private static async loadAboutContent(contentType: AboutContentTypeEnum) {
    const [en, fr, cz] = await Promise.all([
      AboutContentService.getContent(contentType, 'en'),
      AboutContentService.getContent(contentType, 'fr'),
      AboutContentService.getContent(contentType, 'cz'),
    ])

    return [
      { ...en, language: 'en' },
      { ...fr, language: 'fr' },
      { ...cz, language: 'cz' },
    ]
  }
}

export default ContentCacheService
