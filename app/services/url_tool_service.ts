/**
 * UrlToolService - A utility service to extract informatiosn from urls
 */
export class UrlToolService {
  /**
   * Extracts the first path segment from a given URL.
   *
   * @param {string} [url] - The URL to process. If not provided, returns an empty string.
   * @returns {string} The path segment without param
   *
   * @example
   * // Returns "/retail"
   * UrlToolService.getPathSegment("https://www.sa-shu.com/retail/fr");
   *
   * @example
   * // Returns "/"
   * UrlToolService.getPathSegment("https://www.sa-shu.com/en");
   *
   */
  static getPathSegment(url?: string): string {
    if (url) {
      const path = new URL(url).pathname
      const segments = path.split('/').filter(Boolean)

      if (segments.length > 1) {
        return `/${segments[0]}`
      }
    }
    return ''
  }
}
