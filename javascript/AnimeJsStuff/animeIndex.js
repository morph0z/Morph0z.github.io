import {createDraggable, utils, spring, animate, onScroll, createLayout, createTimeline} from 'https://esm.sh/animejs';

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
const debug = false;

const timeLineInfo1 = createTimeline({ defaults: { duration: 750 } });

animate('#char3d', {
  x: [-1000, 0],
  duration: 1000,
  loop: false,
  autoplay: onScroll({
    target: '.textBoxRight',
    debug
  })
});

const layoutInfo1 = createLayout('.infoGroupRight');

const [ $text ] = utils.$('textBoxRight');


const textBoxRight1 = createDraggable('#textBoxRight1', {
        container: [1,1,1,1],
        releaseEase: spring({ bounce: .7 }),
        onRelease: () => { animateLayout() }
    })

const textBoxRight2 = createDraggable('#textBoxRight2', {
        container: [1,1,1,1],
        releaseEase: spring({ bounce: .7 }),
        onRelease: () => { animateLayout() }
    })

function animateLayout() {
  layoutInfo1.record();
  const first = layoutInfo1.root.firstElementChild;
  if (first) layoutInfo1.root.append(first);
  layoutInfo1.animate({
    duration: 800,
    ease: 'inOutCirc',
  });
}

/*
let i = 0;


function animateLayout() {
  return layout.update(({ root }) => {
    root.dataset.grid = (++i % 4) + 1;
  }, {
    duration: 1000,
    delay: stagger(150),
    onComplete: () => animateLayout()
  });
}

const layoutAnimation = animateLayout();
*/
