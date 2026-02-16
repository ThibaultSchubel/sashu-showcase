export class IntroVideo {
  video
  curtain

  constructor(curtain, curtainDuration) {
    this.video = document.querySelector('#intro-video')

    this.curtain = curtain

    if (this.video) {
      const source = this.video.querySelector('source')

      //Load Vertical video instead Horizontal if screen is vertical
      if (window.matchMedia('(orientation: portrait)').matches) {
        const videoSrc = source.getAttribute('src').replace(/-H/, '-V')
        source.setAttribute('src', videoSrc)
      }

      this.video.muted = true
      this.video.playsInline = true
      this.video.load()

      this.video.play().catch((error) => {
        console.error('Cannot start playing video :', error)
      })

      this.video.addEventListener('ended', () => {
        const path = window.location.pathname
        const locale = path.split('/').pop()
        this.curtain.close(`/retail/${locale}`, curtainDuration)
      })
    }
  }
}
