export class LogoMenu {
  menuPanel
  menuButtonLogo
  menuButtonClose
  menuButton
  isMenuOpen = false

  constructor() {
    this.menuPanel = document.querySelector('#menu-panel')
    this.menuButton = document.querySelector('#menu-button')
    this.menuButtonLogo = document.querySelector('#menu-button-logo')
    this.menuButtonClose = document.querySelector('#menu-button-close')
  }

  toggle(duration) {

    this.menuButton.style.pointerEvents = 'none'

    if (!this.isMenuOpen) {
      /*Button*/
      this.menuButtonLogo.style.transform = `scaleY(1)`
      this.menuButtonLogo.style.opacity = 1
      this.menuButtonClose.style.opacity = 0
      this.menuButtonLogo.style.transition = `transform ${duration / 2}ms ease`
      this.menuButtonLogo.style.transform = `scaleY(0)`

      this.menuButtonClose.style.transition = `none`
      this.menuButtonClose.style.transform = `scaleY(0)`

      window.setTimeout(() => {
        this.menuButtonLogo.style.opacity = 0
        this.menuButtonClose.style.opacity = 1

        this.menuButtonClose.style.transition = `transform ${duration / 2}ms ease`
        this.menuButtonClose.style.transform = `scaleY(1)`
      }, duration / 2)

      /*Panel*/
      this.menuPanel.style.opacity = 1
      this.menuPanel.style.display = `block`
    } else {
      /*Button*/
      this.menuButtonLogo.style.transform = `scaleY(0)`
      this.menuButtonLogo.style.opacity = 0
      this.menuButtonClose.style.opacity = 1
      this.menuButtonClose.style.transition = `transform ${duration / 2}ms ease`
      this.menuButtonClose.style.transform = `scaleY(0)`

      this.menuButtonLogo.style.transition = `none`
      this.menuButtonClose.style.transform = `scaleY(0)`

      window.setTimeout(() => {
        this.menuButtonLogo.style.opacity = 1
        this.menuButtonClose.style.opacity = 0

        this.menuButtonLogo.style.transition = `transform ${duration / 2}ms ease`
        this.menuButtonLogo.style.transform = `scaleY(1)`
      }, duration / 2)

      /*Panel*/
      this.menuPanel.style.transition = `opacity ${duration}ms ease-in-out`
      this.menuPanel.style.opacity = 0

      window.setTimeout(() => {
        this.menuPanel.style.display = `none`
        this.menuPanel.style.opacity = 0
      }, duration)
    }

    window.setTimeout(() => {
      this.menuButton.style.pointerEvents = 'auto'
    }, duration)

    this.isMenuOpen = !this.isMenuOpen
  }
}
