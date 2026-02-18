function offsetTop(element, acc = 0) {
  if (element.offsetParent) {
    return offsetTop(element.offsetParent, acc + element.offsetTop);
  }
  return acc + element.offsetTop;
}

export class Parallax {
  elements = []

  init(scrollSelector) {
    this.elements = document.querySelectorAll('[data-parallax]')
    this.onScroll(scrollSelector)
  }

  onScroll(scrollSelector) {
    if (this.elements.length > 0) {
      for (const element of this.elements) {
        // Utilise scrollTop et clientHeight pour un élément DOM
        const screenY = scrollSelector.scrollTop + scrollSelector.clientHeight / 2
        const elementY = offsetTop(element) + element.offsetHeight / 2
        let diffY = elementY - screenY
        if (diffY < 0) {
          diffY = Math.abs(diffY)
        }

        const opacity = -0.0008 * diffY + 1
        const scale = -0.0002 * diffY + 1
        const border = 0.03 * diffY


        element.style.setProperty('transform', `scale(${scale})`)
        element.style.setProperty('opacity', opacity)

          if (border >= 0 && border <= 10) {
            element.style.borderRadius = `${border}rem`
          } else {
            element.style.borderRadius = `10rem`
          }
        }



    }
  }
}