import {Curtain} from './curtain';
import { LogoMenu } from './logo-menu.js'
import { AboutDrawer } from './about-drawer.js'
import ProjectDrawer from './project-drawer.js'
import ProjectCarousel from './project-carousel.js'

const CURTAIN_DURATION = 300

const curtain = new Curtain();
const logoMenu = new LogoMenu();
const aboutDrawers = new AboutDrawer();
const projectDrawer = new ProjectDrawer();
const projectCarousel = new ProjectCarousel();

const loadListener = () => {
  curtain.open(CURTAIN_DURATION)
}

const clickListener = (e) => {

  if (e.target.href) {
    e.preventDefault()
    curtain.close(e.target.href, CURTAIN_DURATION)
  } else if (e.target.id === 'menu-button') {
    e.preventDefault()
    logoMenu.toggle(1000)
  } else if (e.target.id === 'about-drawer') {
    e.preventDefault()
    aboutDrawers.toggle(e)
  } else if (e.target.id === 'project-drawer-close') {
    e.preventDefault()
    projectDrawer.close(e)
  } else if (e.target.id === 'project') {
    e.preventDefault()
    projectDrawer.open(e)
    projectCarousel.populatePanels(e)
  } else if (e.target.id === 'project-carousel-previous') {
    e.preventDefault()
    projectCarousel.changeImage(-1)
  } else if (e.target.id === 'project-carousel-next') {
    e.preventDefault()
    projectCarousel.changeImage(1)
  }
}

const mouseEnterListener = (e) => {
  if (e.target.id === 'project-carousel-previous') {
    projectCarousel.hoverPreviousImage()
  } else if (e.target.id === 'project-carousel-next') {
    projectCarousel.hoverNextImage()
  }
}

const mouseLeaveListener = (e) => {
  if (e.target.id === 'project-carousel-previous') {
    projectCarousel.leaveHoverPreviousImage()
  } else if (e.target.id === 'project-carousel-next') {
    projectCarousel.leaveHoverNextImage()
  }
}

window.addEventListener('mouseover', mouseEnterListener)
window.addEventListener('mouseout', mouseLeaveListener)


window.addEventListener('load', loadListener)
window.addEventListener('click', clickListener)
