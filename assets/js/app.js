// variables
const header = document.getElementById('header')
const navi = document.getElementById('navi')
const naviHeight = navi.offsetHeight
const projectGrid = document.getElementById('project-grid')
const projects = document.querySelectorAll('.project')
const servicesGrid = document.getElementById('services-grid')
const services = document.querySelectorAll('.service')
const serviceimg = document.getElementById('service-img')
const sentences = document.querySelectorAll('.sentences')
const typer = document.getElementById('typer')

/* DOM onload */

document.addEventListener('DOMContentLoaded', init)
window.onresize = function () {
  onWidth()
}
window.onscroll = function () {
  popNav()
}

/* Init app */

function init () {
  onWidth()
  const txtElement = document.querySelector('.txt-type')
  const words = JSON.parse(txtElement.getAttribute('data-words'))
  const wait = txtElement.getAttribute('data-wait')
  const typing = new TypeWritter(txtElement, words, wait)
  typing.type()
}

function onWidth () {
  if (window.innerWidth <= 576) {
    typer.style.font = '33px/90px PoppinsBold, sans-serif'
    resizeGridSm()
  } else if (window.innerWidth > 576 && window.innerWidth <= 768) {
    typer.style.font = '55px/90px PoppinsBold, sans-serif'
    resizeGridSm()
  } else if (window.innerWidth > 768 && window.innerWidth <= 992) {
    typer.style.font = '55px/90px PoppinsBold, sans-serif'
    resizeGridMdSm()
    serviceimg.style.display = 'none'
  } else if (window.innerWidth > 992 && window.innerWidth <= 1180) {
    typer.style.font = '55px/90px PoppinsBold, sans-serif'
    resizeGridMd()
  } else if (window.innerWidth > 1180) {
    typer.style.font = '65px/90px PoppinsBold, sans-serif'
    resizeGridLg()
  }
}
function resizeGridSm () {
  serviceimg.style.display = 'none'
  projectGrid.style.gridTemplateColumns = '100%'
  servicesGrid.style.gridTemplateColumns = '100%'
  services.forEach(service => {
    service.classList.remove('grow')
    service.classList.add('mx-auto')
  })
  projects.forEach(project => {
    project.classList.remove('grow')
  })
  sentences.forEach(sentence => {
    sentence.style.fontSize = '2rem'
  })
}
function resizeGridMd () {
  serviceimg.style.display = 'none'
  serviceimg.style.zIndex = '10'
  projectGrid.style.gridTemplateColumns = '50% 50%'
  servicesGrid.style.gridTemplateColumns = 'auto auto auto auto'
  servicesGrid.style.gridGap = '10px'
  services.forEach(service => {
    service.classList.add('grow', 'mx-auto')
  })
  projects.forEach(project => {
    project.classList.add('grow')
  })
}
function resizeGridMdSm () {
  serviceimg.style.display = 'none'
  serviceimg.style.zIndex = '10'
  projectGrid.style.gridTemplateColumns = '50% 50%'
  servicesGrid.style.gridTemplateColumns = 'auto'
  services.forEach(service => {
    service.classList.add('grow', 'mx-auto')
  })
  projects.forEach(project => {
    project.classList.add('grow')
  })
}
function resizeGridLg () {
  serviceimg.style.display = 'block'
  projectGrid.style.gridTemplateColumns = '50% 50%'
  servicesGrid.style.gridTemplateColumns = '35% repeat(3, 20%)'
  services.forEach(service => {
    service.classList.add('grow')
    service.classList.remove('mx-auto')
  })
  projects.forEach(project => {
    project.classList.add('grow')
  })
}

/* Functions and Objects */

function popNav () {
  window.pageYOffset > (naviHeight) ? stickNav() : normalNav()
}

function stickNav () {
  header.style.position = 'sticky'
  header.style.top = '0'
  header.classList.add('shadow-sm', 'solid-white')
}

function normalNav () {
  header.style.position = 'static'
  header.classList.remove('shadow-sm', 'solid-white')
}

class TypeWritter {
  constructor (txtElement, words, wait = 3000) {
    this.txtElement = txtElement
    this.words = words
    this.wait = parseInt(wait, 10)
    this.txt = ''
    this.wordIndex = 0
    this.isDeleting = false
  }

  /* Type method */

  type () {
    // current index
    const current = this.wordIndex % this.words.length
    // get full word of current word
    const fullTxt = this.words[current]
    // check if deleting

    if (this.isDeleting) {
      // remove char
      this.txt = fullTxt.substring(0, this.txt.length - 1)
    } else {
      // add a character
      this.txt = fullTxt.substring(0, this.txt.length + 1)
    }

    // insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`
    // adjust speed
    let typeSpeed = 80

    if (this.isDeleting) {
      typeSpeed /= 2
    }

    // if word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
      // make pause at End
      typeSpeed = this.wait
      // set delete to true
      this.isDeleting = true
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false
      // move to next word
      this.wordIndex++
      // pause before star typing
      typeSpeed = 400
    }

    setTimeout(() => this.type(), typeSpeed)
  }
}
