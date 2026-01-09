import {Curtain} from './curtain';
import { LogoMenu } from './logo-menu.js'

const CURTAIN_DURATION = 300

const curtain = new Curtain();
const logoMenu = new LogoMenu();

const loadListener = () => {
  curtain.open(CURTAIN_DURATION)
}

const clickListener = (e) => {
  console.log(e.target.id)

  if (e.target.href) {
    e.preventDefault()
    curtain.close(e.target.href, CURTAIN_DURATION)
  } else if (e.target.id === 'menu-button') {
    e.preventDefault()
    logoMenu.toggle(1000)
  }
}

window.addEventListener('load', loadListener)
window.addEventListener('click', clickListener)
