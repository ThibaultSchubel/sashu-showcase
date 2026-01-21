export class Curtain {

  curtain

  constructor() {
    this.curtain = document.querySelector('#curtain')
  }

  open(duration){
    this.curtain.style.transition = `opacity ${duration}ms ease-out`
    this.curtain.style.opacity = 0

    window.setTimeout(() => {
      this.curtain.style.display = 'none'
    }, duration)
  }

  close(link, duration){
    this.curtain.style.display = 'inline'
    this.curtain.style.transition = `opacity ${duration}ms ease-out`

    window.setTimeout(() => {
      this.curtain.style.opacity = 1
    }, 10)

    window.setTimeout(() => {
      window.location.href = link
    }, duration + 10)
  }
}