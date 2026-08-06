import {createDraggable, utils, spring, animate, onScroll, createLayout, stagger} from 'https://esm.sh/animejs';

utils.$('.textBoxCenter').forEach($textBoxCenter => {
    createDraggable($textBoxCenter, {
        container: [0, 0, 0, 0],
        releaseEase: spring({ bounce: .7 })
    })
});;

animate('.textBoxCenter',{
    x: [-2000, 0],
    loop: false,
    delay: stagger(500),
    ease: spring({ bounce: .35 }),
    autoplay: true
});
