/* Full Screen Content Slider
 * <https://github.com/jacobxperez/full-screen-content-slider>
 * Copyright (C) 2023 Jacob Perez <jacobxperez@gmx.com>
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
------------------------------------------------------------------------------*/
const slider = () => {
    const sliders = document.querySelectorAll('.slider')

    sliders.forEach((slider) => {
        const slides = slider.querySelectorAll('.slide')
        const totalSlides = slides.length
        let currIndex = 0
        const imgCache = []
        let intervalTime = 5000
        let sliderInterval
    
        function cycleItems() {
            const currSlide = slides[currIndex]
    
            slides.forEach((slide) => {
                slide.style.display = 'none'
                slide.style.zIndex = 1
            })
    
            currSlide.style.display = 'block'
            currSlide.style.zIndex = 5
        }
    
        function changeSlide() {
            currIndex += 1
    
            if (currIndex > totalSlides - 1) {
                currIndex = 0
            }
    
            cycleItems()
        }
    
        function startSlider() {
            clearInterval(sliderInterval)
    
            sliderInterval = setInterval(() => {
                changeSlide()
            }, intervalTime)
        }
    
        ;(function preloader() {
            if (currIndex < totalSlides) {
                const img = new Image()
                const imgSrc = slides[currIndex]
                    .querySelector('img')
                    .getAttribute('src')
                imgCache[currIndex] = img
                img.src = imgSrc
                img.onload = () => {
                    currIndex += 1
                    preloader()
                }
            } else {
                currIndex = 0
                cycleItems()
                startSlider()
            }
        })()
    
        const nextSlideBtn = slider.querySelector('.next-slide')
    
        nextSlideBtn.addEventListener('click', () => {
            currIndex += 1
    
            if (currIndex > totalSlides - 1) {
                currIndex = 0
            }
    
            cycleItems()
            startSlider((intervalTime = 10000))
        })
    
        const prevSlideBtn = slider.querySelector('.prev-slide')
    
        prevSlideBtn.addEventListener('click', () => {
            currIndex -= 1
    
            if (currIndex < 0) {
                currIndex = totalSlides - 1
            }
    
            cycleItems()
            startSlider((intervalTime = 10000))
        })
    })
}

slider()
