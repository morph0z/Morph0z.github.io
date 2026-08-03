import {createDraggable, utils, spring, animate, onScroll, createLayout} from 'https://esm.sh/animejs';

const [ $text ] = utils.$('textBoxRight');

createDraggable('.textBoxRight', {
    container: [0, 0, 0, 0],
    releaseEase: spring({ bounce: .7 })
});

//Hero section animations

animate('.textBoxRight', {
    x: [500, 0],
    loop: false,
    ease: spring({ bounce: .35 }),
    autoplay: onScroll({container: '.scroll-container'})
})

const initialDelay = 4000;

const heroSectionTitleAnimation = animate('.title', {
    y: [-1000, 0],
    loop: false,
    delay: initialDelay,
    duration: 2400,
    ease: 'outBack(0.99)',
    autoplay: false
});

const heroSectionSubtitleAnimation = animate('.subtitle', {
    y: [-1000, 0],
    loop: false,
    delay: initialDelay + 500,
    duration: 2400,
    ease: 'outBack(0.99)',
    autoplay: false
});

const heroSection3DAnimation = animate('#hero3d', {
    y: [-1000, 0],
    loop: false,
    delay: initialDelay - 1200,
    duration: 2400,
    ease: 'outBack(0)',
    autoplay: false
});


const playAnimation = () => {
    heroSectionTitleAnimation.play()
    heroSectionSubtitleAnimation.play()
    heroSection3DAnimation.play()
};

window.addEventListener('load', playAnimation);



//Info Section animations

const [ container ] = utils.$('#char3d');
const debug = true;

const timeLineInfo1 = createTimeline({ defaults: { duration: 750 } });

animate('#char3d', {
  x: [-1000, 0],
  duration: 2000,
  loop: false,
  autoplay: onScroll({
    target: '.textBoxRight',
    debug
  })
});
