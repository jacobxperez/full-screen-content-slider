/* Full Screen Content Slider
 * <https://github.com/jacobxperez/full-screen-content-slider>
 * Copyright (C) 2023 Jacob Perez <jacobxperez@gmx.com>
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
------------------------------------------------------------------------------*/
const sliders = document.querySelectorAll('.slider');

const slider = () => {
    sliders.forEach((slider) => {
        const slides = slider.querySelectorAll('.slide');
        const totalSlides = slides.length;
        const imgCache = [];
        let currIndex = 0;
        let intervalTime = 5000;
        let sliderInterval;

        const cycleItems = () => {
            const currSlide = slides[currIndex];

            slides.forEach((slide) => {
                slide.classList.remove('slide-current');
            });

            currSlide.classList.add('slide-current');
        };

        const changeSlide = (direction) => {
            if (direction === 'next') {
                currIndex += 1;
                if (currIndex > totalSlides - 1) {
                    currIndex = 0;
                }
            } else if (direction === 'prev') {
                currIndex -= 1;
                if (currIndex < 0) {
                    currIndex = totalSlides - 1;
                }
            }

            cycleItems();
        };

        const startSlider = (time) => {
            clearInterval(sliderInterval);

            intervalTime = time || intervalTime;

            sliderInterval = setInterval(() => {
                changeSlide('next');
            }, intervalTime);
        };

        const preloadImages = () => {
            for (const slide of slides) {
                const imgSrc = slide.querySelector('img').src;
                const imgPromise = new Promise((resolve) => {
                    const img = new Image();
                    img.src = imgSrc;
                    img.onload = resolve;
                });
                imgCache.push(imgPromise);
            }
            return Promise.all(imgCache);
        };

        preloadImages().then(() => {
            cycleItems();
            startSlider();
        });

        const slideBtnContainer = slider.querySelector('.slider-nav');

        slideBtnContainer.addEventListener('click', (e) => {
            const target = e.target;
            if (target.classList.contains('next-slide')) {
                changeSlide('next');
                startSlider(8000);
            } else if (target.classList.contains('prev-slide')) {
                changeSlide('prev');
                startSlider(8000);
            }
        });
    });
};

slider();
