import {Curtain} from './curtain';
import { LogoMenu } from './logo-menu.js'
import { AboutDrawer } from './about-drawer.js'

const CURTAIN_DURATION = 300

const curtain = new Curtain();
const logoMenu = new LogoMenu();
const aboutDrawers = new AboutDrawer();

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
  }
}

window.addEventListener('load', loadListener)
window.addEventListener('click', clickListener)
