export class AboutDrawer {
  duration = 300
  drawerSelector = '#about-drawer'
  drawers
  drawersOffset = []

  constructor() {
    this.drawers = document.querySelectorAll(this.drawerSelector)

    if (this.drawers && this.drawers.length > 0) {
      this.drawers.forEach((drawer) => {
        const index = drawer.getAttribute('index')
        const paragraph = drawer.querySelector('#about-drawer-paragraph')
        this.drawersOffset[index] = paragraph.offsetHeight
      })

      this.closeDrawers('0')
    }

  }

  toggle(element) {
    const index = element.target.getAttribute('index')
    if(index !== undefined){
      this.openDrawer(index)
      this.closeDrawers(index)
    }

  }

  openDrawer(index){
    if (this.drawers && this.drawers.length > 0) {
      this.drawers.forEach((drawer) => {

        if (index === drawer.getAttribute('index')) {
          const paragraph = drawer.querySelector('#about-drawer-paragraph')

          paragraph.style.transition = `opacity ${this.duration}ms ease-out height ${this.duration}ms ease-out `
          paragraph.style.opacity = 1
          paragraph.style.height = this.drawersOffset[index] + 'px'
        }
      })
    }
  }



  closeDrawers(exception) {



    if (this.drawers && this.drawers.length > 0) {
      this.drawers.forEach((drawer) => {
        const aboutButton = drawer.querySelector('#about-drawer-button')

        if (exception !== drawer.getAttribute("index")) {

          aboutButton.style.opacity = 1

          const paragraph = drawer.querySelector('#about-drawer-paragraph')
          paragraph.style.transition = `height ${this.duration}ms ease-out `
          paragraph.style.transition = `opacity ${this.duration}ms ease-out height ${this.duration}ms ease-out `
          paragraph.style.opacity = 0
          paragraph.style.height = 0

        } else {
          aboutButton.style.opacity = 0

        }
      })
    }
  }
}