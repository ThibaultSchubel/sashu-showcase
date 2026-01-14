export default class ProjectDrawer {

  duration = 500
  projectDrawer
  background

  constructor() {
    this.background = document.querySelector('.project-drawer-background')
    this.projectDrawer = document.querySelector('.project-drawer-layers')

    this.firstLayer = document.querySelector('.project-drawer__first-layer')
    this.secondLayer = document.querySelector('.project-drawer__second-layer')

    this.background.style.transition = `opacity ${this.duration}ms ease-out`


  }

  open(){

    this.projectDrawer.style.display = 'block'
    this.background.style.opacity = 1

  }

  close(){
    /*
    this.background.style.opacity = 0

    window.setTimeout(() => {
      this.projectDrawer.style.display = `none`
    }, this.duration + 10)

*/
  }
}