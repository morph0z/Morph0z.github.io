const lenis = new Lenis({
    autoRaf: true,
});

// Listen for the scroll event and log the event data
lenis.on('scroll', (e) => {
    if (lenis.progress >= 0.999) {lenis.scrollTo(0)}
});

window.addEventListener('load', function() {
    lenis.scrollTo(0)
});

