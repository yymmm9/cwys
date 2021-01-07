const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};



      function pageTransition() {
        var tl = gsap.timeline();

        tl.to(".transition", {
            duration: 1.3,
            transformOrigin: "bottom left",
            //clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            transform: 'translate3d(0vw,0,0)',
            ease: "expo.out"
        });
        tl.to("main", {
            duration: .4,
            opacity: 1,
            ease: "expo.out"
        }, 0);

        tl.to("body", {
          duration: .4,
          scrollTop: 0,
          ease: "expo.out"
        }, 0);
        scrollToTop();

        // tl.to("#transition--logo", {
        //     duration: .6,
        //     delay: .03,
        //     opacity: 1,
        //     ease: "expo.out"
        // });

    }

    function contentAnimation() {
        var tl = gsap.timeline();
        tl.to(".transition", {
            duration: 1.3,
            transformOrigin: "bottom left",
            //clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
            transform: 'translate3d(-100vw,0,0)',
            ease: "expo.out"
        });
        tl.from("main", {
            duration: .4,
            opacity: 0,
            ease: "expo.out"
        }, 0);

    }

    function loadAnimation() {
        var tl = gsap.timeline();
        tl.to(".transition", {
            duration: 1.3,
            delay: .5,
            transformOrigin: "bottom left",
            //clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
            transform: 'translate3d(-100vw,0,0)',
            ease: "expo.out"
        });
        tl.from("main", {
            duration: .4,
            opacity: 0,
            ease: "expo.out"
        }, 0);

    }
    
    function delay(n) {
        n = n || 2000;
        return new Promise((done) => {
            setTimeout(() => {
                done();
            }, n);
        });
    }


     barba.init({
        sync: true,

        transitions: [
            {
                async leave(data) {
                    const done = this.async();
                    pageTransition();
                    await delay(1500);
                    done();
                },

                async enter(data) {
                    contentAnimation();
                },

                async once(data) {
                    loadAnimation();
                },
            },
        ],
    });


Barba.Dispatcher.on('newPageReady', function(current, prev, container) {
    history.scrollRestoration = 'manual';
});