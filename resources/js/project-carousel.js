export default class ProjectCarousel {
  panels = []
  images = []
  hoverDuration = 300
  animationDuration = 500

  panelsHoverTransform = [
    `translateX(-30%) perspective(100rem) rotateY(60deg)  scale(0.9)`,
    `translateX(-18%) perspective(100rem) rotateY(60deg) scale(1.1)`,
    `translateX(0) perspective(0) rotateY(0) scale(1)`,
    `translateX(18%)  perspective(100rem) rotateY(-60deg) scale(1.1)`,
    `translateX(30%) perspective(100rem) rotateY(-60deg)  scale(0.9)`,
  ]

  panelsIdleTransform = [
    `translateX(-25%) perspective(80rem) rotateY(70deg)  scale(0.8)`,
    `translateX(-15%) perspective(80rem) rotateY(70deg) scale(1)`,
    `translateX(0) perspective(0) rotateY(0) scale(1)`,
    `translateX(15%)  perspective(80rem) rotateY(-70deg) scale(1)`,
    `translateX(25%) perspective(80rem) rotateY(-70deg)  scale(0.8)`,
  ]

  panelsZIndex = [10, 20, 30, 20, 10]
  panelsOpacity = [0.6, 0.8, 1, 0.8, 0.6]
  panelsTransformOrigins = [
    'center left',
    'center left',
    'center center',
    'center right',
    'center right',
  ]

  constructor() {
    this.panels = Array.from(document.querySelector('#project-carousel-stack').children)

    this.panels.forEach((panel, index) => {
      panel.style.zIndex = this.panelsZIndex[index]
      panel.style.transformOrigin = this.panelsTransformOrigins[index]
      panel.style.transform = this.panelsIdleTransform[index]
      this.changeOpacity(panel, this.panelsOpacity[index])
    })
  }

  populatePanels(element) {
    console.log(element.target)

    const images = Array.from(element.target.querySelector('#project-data-imgs').children)

    let imgIndex = 0
    this.panels.forEach((panel) => {
      panel.querySelector('img').src = images[imgIndex].src
      imgIndex++
      if (imgIndex > images.length - 1) imgIndex = 0
    })
  }

  changeImage(indent) {
    const images = this.panels.map((panel) => {
      return panel.querySelector('img')
    })
    const imagesSrc = images.map((image) => {
      return image.src
    })

    images.forEach((image, index) => {
      image.style.transition = `opacity ${this.animationDuration / 2}ms ease-in`
      image.style.opacity = 0

      let previousIndex = (index + indent + images.length) % images.length

      window.setTimeout(() => {
        image.src = imagesSrc[previousIndex]
        image.style.opacity = 1
      }, this.animationDuration / 2)
    })
  }

  hoverPreviousImage() {
    this.panels[0].style.transition = this.formatHoverTransition(this.hoverDuration * 2)
    this.panels[1].style.transition = this.formatHoverTransition(this.hoverDuration)

    window.setTimeout(() => {
      this.panels[0].style.transform = this.panelsHoverTransform[0]
      this.panels[1].style.transform = this.panelsHoverTransform[1]
    }, 10)
  }

  hoverNextImage() {
    this.panels[4].style.transition = this.formatHoverTransition(this.hoverDuration * 2)
    this.panels[3].style.transition = this.formatHoverTransition(this.hoverDuration)

    window.setTimeout(() => {
      this.panels[4].style.transform = this.panelsHoverTransform[4]
      this.panels[3].style.transform = this.panelsHoverTransform[3]
    }, 10)
  }

  leaveHoverNextImage() {
    this.panels[4].style.transition = this.formatHoverTransition(this.hoverDuration * 2)
    this.panels[3].style.transition = this.formatHoverTransition(this.hoverDuration)

    window.setTimeout(() => {
      this.panels[4].style.transform = this.panelsIdleTransform[4]
      this.panels[3].style.transform = this.panelsIdleTransform[3]
    }, 10)
  }

  leaveHoverPreviousImage() {
    this.panels[0].style.transition = this.formatHoverTransition(this.hoverDuration * 2)
    this.panels[1].style.transition = this.formatHoverTransition(this.hoverDuration)

    window.setTimeout(() => {
      this.panels[0].style.transform = this.panelsIdleTransform[0]
      this.panels[1].style.transform = this.panelsIdleTransform[1]
    }, 10)
  }

  changeOpacity(panel, opacity) {
    panel.querySelector('img').style.opacity = opacity
  }

  formatHoverTransition(duration) {
    return `transform ${duration}ms ease-out`
  }
}
