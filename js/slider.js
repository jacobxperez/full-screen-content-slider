/* Full Screen Content Slider
 * <https://github.com/jacobxperez/full-screen-content-slider>
 * Copyright (C) 2023 Jacob Perez <jacobxperez@gmx.com>
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
------------------------------------------------------------------------------*/
const sliders = document.querySelectorAll('.slider')

const slider = () => {
    sliders.forEach((slider) => {
        const slides = slider.querySelectorAll('.slide')
        const totalSlides = slides.length
        const imgCache = []
        let currIndex = 0
        let intervalTime = 5000
        let sliderInterval

        const cycleItems = () => {
            const currSlide = slides[currIndex]

            slides.forEach((slide) => {
                slide.style.visibility = 'hidden'
                slide.style.zIndex = 1
                slide.style.opacity = 0 // added for fade effect
            })

            currSlide.style.visibility = 'visible'
            currSlide.style.zIndex = 5
            currSlide.style.opacity = 1 // added for fade effect
            currSlide.style.transition = 'all 0.5s ease-in-out 0s' // added for fade effect
        }

        const changeSlide = () => {
            currIndex += 1

            if (currIndex > totalSlides - 1) {
                currIndex = 0
            }

            cycleItems()
        }

        const startSlider = () => {
            clearInterval(sliderInterval)

            sliderInterval = setInterval(() => {
                changeSlide()
            }, intervalTime)
        }

        const preloadImages = () => {
            for (const slide of slides) {
                const imgSrc = slide.querySelector('img').src
                const imgPromise = new Promise((resolve) => {
                    const img = new Image()
                    img.src = imgSrc
                    img.onload = resolve
                })
                imgCache.push(imgPromise)
            }
            return Promise.all(imgCache)
        }

        preloadImages().then(() => {
            cycleItems()
            startSlider()
        })

        const nextSlideBtn = slider.querySelector('.next-slide')

        nextSlideBtn.addEventListener('click', () => {
            currIndex += 1

            if (currIndex > totalSlides - 1) {
                currIndex = 0
            }

            cycleItems()
            startSlider((intervalTime = 8000))
        })

        const prevSlideBtn = slider.querySelector('.prev-slide')

        prevSlideBtn.addEventListener('click', () => {
            currIndex -= 1

            if (currIndex < 0) {
                currIndex = totalSlides - 1
            }

            cycleItems()
            startSlider((intervalTime = 8000))
        })
    })
}

slider()
