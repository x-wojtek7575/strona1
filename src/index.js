let nav = document.querySelector('.nav-container')
window.addEventListener('scroll', function(e){
    if(window.scrollY >=  nav.offsetHeight)
        nav.style.background = "rgba(0, 0, 0, 1)"
    else
        nav.style.background = "rgba(0, 0, 0, 0.6)"
})

class Slider {
    constructor(imgSrcArray, time)
    {
        this._time = time
        this._background = document.querySelector('.slider')
        this._nav = document.querySelector('.slider__container-nav')
        this._elements = [...document.querySelectorAll('.slider__element')]
        this._actualIndex = 0
        this._imgSrcArray = imgSrcArray
        this._dots = [...this.createNav()]
        this._intervalIndex = null
        this.automaticChange(this._time)
    }
    createNav()
    {
        for (let i = 0; i < this._imgSrcArray.length; i++)
        {
            let li = document.createElement('li')
            li.className = i === 0 ? "nav__item nav__item--active" : "nav__item";
            li.textContent = i + 1
            this._nav.appendChild(li)
        }
        return document.querySelectorAll('.nav__item')
    }
    changeElementByDirection(direction = 1)
    {
        this._actualIndex += direction
        if (this._actualIndex === this._imgSrcArray.length)
            this._actualIndex = 0;
        else if (this._actualIndex === -1)
            this._actualIndex = this._imgSrcArray.length - 1;
        //zmiana zdj
        this._background.style.backgroundImage = `url(${this._imgSrcArray[this._actualIndex]})`
        //zmiana tekstu
        let previous_index = this._elements.findIndex((element) => element.classList.contains('slider__element--active'))
        this._elements[previous_index].classList.remove('slider__element--active')
        this._elements[this._actualIndex].classList.add('slider__element--active')
        //zmiana kropki
        this._dots[previous_index].classList.remove('nav__item--active')
        this._dots[this._actualIndex].classList.add('nav__item--active')
    }
    changeElementByIndex(index)
    {
        this._actualIndex = index
        //zmiana zdj
        this._background.style.backgroundImage = `url(${this._imgSrcArray[this._actualIndex]})`
        //zmiana tekstu
        let previous_index = this._elements.findIndex((element) => element.classList.contains('slider__element--active'))
        this._elements[previous_index].classList.remove('slider__element--active')
        this._elements[this._actualIndex].classList.add('slider__element--active')
        //zmiana kropki
        this._dots[previous_index].classList.remove('nav__item--active')
        this._dots[this._actualIndex].classList.add('nav__item--active')
    }

    automaticChange(time)
    {
        this._intervalIndex = setInterval(() => {this.changeElementByDirection()
        }, time)
    }
    manualChangeByClicking(event)
    {
        clearInterval(this._intervalIndex)
        if (event.keyCode === 37)
            this.changeElementByDirection(-1)
        else if (event.keyCode === 39)
            this.changeElementByDirection()
        return this.automaticChange(this._time)
    }
    manualChangeByClicking2(event)
    {
        clearInterval(this._intervalIndex)
        this.changeElementByIndex(Number(event.target.textContent)-1)
        return this.automaticChange(this._time)
    }
}

const tablica = ['img/photo1.jpg','img/photo2.jpg','img/photo3.jpg']
const x = new Slider(tablica, 2000)
window.addEventListener('keydown', (e) => {
    x.manualChangeByClicking(e)
})
document.querySelectorAll('.nav__item').forEach((element) => {
    element.addEventListener('click', (e) => x.manualChangeByClicking2(e))
})

let zdj = document.querySelectorAll('.projects__photo-container')
let btn = document.querySelectorAll('.projects__option')
function ChangeOption()
{
    let index = this.getAttribute('data-index')
    let elements = [...zdj]
    let result = null
    if (index == 'all')
        elements.forEach((el) => {
            el.style.display = "block"
        })
    else
    {
        elements.forEach((el) => {
            if (el.getAttribute('data-index') != index)
                el.style.display = "none"
            else
                el.style.display = "block"
        })
    }
}
btn.forEach((element) => {
    element.addEventListener('click',ChangeOption)
})
