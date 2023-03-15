import ASScroll from '@ashthornton/asscroll';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect } from 'react';
import useSizes from '../utils/useSizes';
import useTheme from '../utils/useTheme';

const Controls = ({
  roomRef,
  pointLight,
  orthographicCameraRef,
  circleFirstRef,
  circleSecondRef,
  circleThirdRef,
}) => {
  const sizes = useSizes();
  const theme = useTheme();
  useEffect(() => {
    roomRef.current.children.forEach((child) => {
      if (child.type === 'PointLight') {
        pointLight = child;
      }
    });
    gsap.registerPlugin(ScrollTrigger);
    document.querySelector('.page').style.overflow = 'visible';
    if (
      !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    ) {
      setSmoothScroll();
    }
    setScrollTrigger();
  }, []);

  function setupASScroll() {
    const asscroll = new ASScroll({
      ease: 0.1,
      disableRaf: true,
    });

    gsap.ticker.add(asscroll.update);

    ScrollTrigger.defaults({
      scroller: asscroll.containerElement,
    });

    ScrollTrigger.scrollerProxy(asscroll.containerElement, {
      scrollTop(value) {
        if (arguments.length) {
          asscroll.currentPos = value;
          return;
        }
        return asscroll.currentPos;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      fixedMarkers: true,
    });

    asscroll.on('update', ScrollTrigger.update);
    ScrollTrigger.addEventListener('refresh', asscroll.resize);

    requestAnimationFrame(() => {
      asscroll.enable({
        newScrollElements: document.querySelectorAll(
          '.gsap-marker-start, .gsap-marker-end, [asscroll]',
        ),
      });
    });
    return asscroll;
  }

  function setSmoothScroll() {
    setupASScroll();
  }

  function setScrollTrigger() {
    ScrollTrigger.matchMedia({
      '(min-width: 969px)': () => {
        roomRef.current.scale.set(0.35, 0.35, 0.35);
        pointLight.intensity = theme === 'light' ? 0 : 0.1;
        pointLight.decay = theme === 'light' ? 0 : 1;
        orthographicCameraRef.current.position.set(0, 6.5, 10);
        roomRef.current.position.set(0, 0, 0);
        const firstMoveTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: '.first-move',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
        firstMoveTimeline.fromTo(
          roomRef.current.position,
          { x: 0, y: 0, z: 0 },
          {
            x: () => {
              return sizes.width * 0.0014;
            },
          },
        );

        const secondMoveTimeline = gsap
          .timeline({
            scrollTrigger: {
              trigger: '.second-move',
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          })
          .to(
            roomRef.current.position,
            {
              x: () => {
                return 0.25;
              },
              z: () => {
                return sizes.height * 0.003;
              },
            },
            'same',
          )
          .to(
            roomRef.current.scale,
            {
              x: 0.75,
              y: 0.75,
              z: 0.75,
            },
            'same',
          );

        const thirdMoveTimeline = gsap
          .timeline({
            scrollTrigger: {
              trigger: '.third-move',
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          })
          .to(orthographicCameraRef.current.position, {
            y: 2.5,
            x: -4,
          });
      },

      '(max-width: 968px)': () => {
        roomRef.current.scale.set(0.2, 0.2, 0.2);
        roomRef.current.position.set(0, 0, 0);
        pointLight.intensity = theme === 'light' ? 0 : 0.1;
        pointLight.decay = theme === 'light' ? 0 : 1;
        orthographicCameraRef.current.position.set(0, 6.5, 10);

        const firstMoveTimeline = gsap
          .timeline({
            scrollTrigger: {
              trigger: '.first-move',
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.6,
            },
          })
          .to(roomRef.current.scale, {
            x: 0.25,
            y: 0.25,
            z: 0.25,
          });

        const secondMoveTimeline = gsap
          .timeline({
            scrollTrigger: {
              trigger: '.second-move',
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          })
          .to(
            roomRef.current.scale,
            {
              x: 0.6,
              y: 0.6,
              z: 0.6,
            },
            'same',
          )
          .to(
            roomRef.current.position,
            {
              x: 1.6,
              z: 2,
            },
            'same',
          );

        const thirdMoveTimeline = gsap
          .timeline({
            scrollTrigger: {
              trigger: '.third-move',
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          })
          .to(roomRef.current.position, {
            z: -4.5,
          });
      },

      all: () => {
        const sections = document.querySelectorAll('.section');
        sections.forEach((section) => {
          const progressWrapper = section.querySelector('.progress-wrapper');
          const progressBar = section.querySelector('.progress-bar');

          if (section.classList.contains('right')) {
            gsap.to(section, {
              borderTopLeftRadius: 10,
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'top top',
                scrub: 0.6,
              },
            });
            gsap.to(section, {
              borderBottomLeftRadius: 700,
              scrollTrigger: {
                trigger: section,
                start: 'bottom bottom',
                end: 'bottom top',
                scrub: 0.6,
              },
            });
          } else {
            gsap.to(section, {
              borderTopRightRadius: 10,
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'top top',
                scrub: 0.6,
              },
            });
            gsap.to(section, {
              borderBottomRightRadius: 700,
              scrollTrigger: {
                trigger: section,
                start: 'bottom bottom',
                end: 'bottom top',
                scrub: 0.6,
              },
            });
          }
          gsap.from(progressBar, {
            scaleY: 0,
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.4,
              pin: progressWrapper,
              pinSpacing: false,
            },
          });
        });

        const firstCircle = gsap
          .timeline({
            scrollTrigger: {
              trigger: '.first-move',
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.6,
            },
          })
          .to(circleFirstRef.current.scale, {
            x: 3,
            y: 3,
            z: 3,
          });

        const secondCircle = gsap
          .timeline({
            scrollTrigger: {
              trigger: '.second-move',
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.6,
            },
          })
          .to(
            circleSecondRef.current.scale,
            {
              x: 3,
              y: 3,
              z: 3,
            },
            'same',
          )
          .to(
            roomRef.current.position,
            {
              y: 0.7,
            },
            'same',
          );

        const thirdCircle = gsap
          .timeline({
            scrollTrigger: {
              trigger: '.third-move',
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.6,
            },
          })
          .to(circleThirdRef.current.scale, {
            x: 3,
            y: 3,
            z: 3,
          });

        const secondPartTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: '.third-move',
            start: 'center center',
          },
        });

        let first, second, third, fourth, fifth, sixth, seventh, eighth, ninth;
        roomRef.current.children.forEach((child) => {
          if (child.name === 'Mini_Floor') {
            first = gsap.to(child.position, {
              x: -2.35215,
              z: 5.35655,
              duration: 0.3,
            });
          }
          if (child.name === 'Mailbox') {
            second = gsap.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              duration: 0.3,
            });
          }
          if (child.name === 'Lamp') {
            third = gsap.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              ease: 'back.out(2)',
              duration: 0.3,
            });
          }
          if (child.name === 'FloorFirst') {
            fourth = gsap.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              ease: 'back.out(2)',
              duration: 0.3,
            });
          }
          if (child.name === 'FloorSecond') {
            fifth = gsap.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              duration: 0.3,
            });
          }
          if (child.name === 'FloorThird') {
            sixth = gsap.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              ease: 'back.out(2)',
              duration: 0.3,
            });
          }
          if (child.name === 'Dirt') {
            seventh = gsap.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              ease: 'back.out(2)',
              duration: 0.3,
            });
          }
          if (child.name === 'FlowerOne') {
            eighth = gsap.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              ease: 'back.out(2)',
              duration: 0.3,
            });
          }
          if (child.name === 'FlowerTwo') {
            ninth = gsap.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              ease: 'back.out(2)',
              duration: 0.3,
            });
          }
        });
        secondPartTimeline.add(first);
        secondPartTimeline.add(second);
        secondPartTimeline.add(third);
        secondPartTimeline.add(fourth);
        secondPartTimeline.add(fifth);
        secondPartTimeline.add(sixth);
        secondPartTimeline.add(seventh);
        secondPartTimeline.add(eighth);
        secondPartTimeline.add(ninth);
      },
    });
  }
};

export default Controls;
