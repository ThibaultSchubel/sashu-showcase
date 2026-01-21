export class IntroVideo {
  video
  curtain

  constructor(curtain, curtainDuration) {
    this.video = document.querySelector('#intro-video')

    if (this.video) {
      this.curtain = curtain
      this.video.addEventListener('ended', () => {
        const path = window.location.pathname
        const locale = path.split('/').pop()
        this.curtain.close(`/retail/${locale}`, curtainDuration)
      })
    }
  }
}
