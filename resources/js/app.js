import {Curtain} from './curtain';

const CURTAIN_DURATION = 300

const curtain = new Curtain();

const loadListener = () => {
  curtain.open(CURTAIN_DURATION)
}

const clickListener = (e) => {
  if (e.target.href) {
    e.preventDefault()
    curtain.close(e.target.href, CURTAIN_DURATION)
  }
}

window.addEventListener('load', loadListener)
window.addEventListener('click', clickListener)
