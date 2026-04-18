import {createDraggable, utils, spring, animate, onScroll, createLayout, stagger} from '/animeJS/dist/modules/index.js';

const [ $text ] = utils.$('textBoxRight');

createDraggable('.textBoxLeft', {
    container: [0, 0, 0, 0],
    releaseEase: spring({ bounce: .7 })
});

animate('.textBoxLeft', {
    x: [-1000, 0],
    loop: false,
    delay: stagger(500),
    ease: spring({ bounce: .35 }),
    autoplay: onScroll({container: '.scroll-container'})
})
