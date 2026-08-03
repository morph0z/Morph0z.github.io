const lenis = new Lenis({
    autoRaf: true,
});


window.addEventListener('load', function() {
    lenis.scrollTo(0)
    lenis.start()
});


