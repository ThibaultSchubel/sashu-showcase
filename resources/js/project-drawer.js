export default class ProjectDrawer {
  duration = 800
  projectDrawer
  background

  firstLayer
  firstLayerTransition = `transform ${this.duration}ms cubic-bezier( 0.5, -0.5, 0.3, 1)`

  secondLayer
  secondLayerTransition = `transform ${this.duration}ms ease-out`
  secondLayerIdle = '5rem'

  descriptionSpot
  titleSpot
  subtitleSpot

  constructor() {
    this.background = document.querySelector('.project-drawer-background')
    this.projectDrawer = document.querySelector('.project-drawer-layers')

    this.firstLayer = document.querySelector('.project-drawer__first-layer')
    this.secondLayer = document.querySelector('.project-drawer__second-layer')

    this.titleSpot = document.querySelector('#title-spot')
    this.subtitleSpot = document.querySelector('#subtitle-spot')
    this.descriptionSpot = document.querySelector('#description-spot')

    if (this.background) this.background.style.transition = `opacity ${this.duration}ms ease-out`

    this.closeWithoutAnimations()
  }

  open(element) {
    this.projectDrawer.style.display = 'block'

      this.titleSpot.textContent = element.target.querySelector('h3').textContent
      this.subtitleSpot.textContent = element.target.querySelector('h5').textContent
      this.descriptionSpot.textContent = element.target.querySelector('p').textContent


    setTimeout(() => {
      if (this.firstLayer) {
        this.firstLayer.style.transition = `transform ${this.duration}ms`
        this.firstLayer.style.transform = `translateY(5rem)`
      }

      if (this.secondLayer) {
        this.secondLayer.style.transition = this.secondLayerTransition
        this.secondLayer.style.transform = `scaleX(1) translateY(0)`
      }

      this.background.style.opacity = 1
    }, 10)
  }

  close() {
    this.descriptionSpot = document.querySelector('#description-spot')
    this.titleSpot = document.querySelector('#title-spot')
    this.subtitleSpot = document.querySelector('#subtitle-spot')

    if (this.firstLayer) {
      this.firstLayer.style.transition = this.firstLayerTransition
      this.firstLayer.style.transform = `translateY(${this.firstLayer.offsetHeight}px)`
    }

    if (this.secondLayer) {
      this.secondLayer.style.transition = this.secondLayerTransition
      this.secondLayer.style.transform = `scaleX(0.9) translateY(${this.secondLayerIdle})`
    }

    this.background.style.opacity = 0

    window.setTimeout(() => {
      this.projectDrawer.style.display = `none`
    }, this.duration + 10)
  }

  closeWithoutAnimations() {
    this.background.style.opacity = 0
    this.secondLayer.style.transform = `scaleX(0.9) translateY(${this.secondLayerIdle})`
    this.firstLayer.style.transform = `translateY(${this.firstLayer.offsetHeight}px)`
    this.projectDrawer.style.display = `none`
  }
}