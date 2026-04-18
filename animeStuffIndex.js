import {createDraggable, utils, spring, animate, onScroll, createLayout} from '/animeJS/dist/modules/index.js';

const [ $text ] = utils.$('textBoxRight');

createDraggable('.textBoxRight', {
    container: [0, 0, 0, 0],
    releaseEase: spring({ bounce: .7 })
});

animate('.textBoxRight', {
    x: [500, 0],
    loop: false,
    ease: spring({ bounce: .35 }),
    autoplay: onScroll({container: '.scroll-container'})
})
