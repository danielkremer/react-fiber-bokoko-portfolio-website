import convert from './utils/covertDivsToSpans.js';

import { useFrame } from '@react-three/fiber';
import { gsap } from 'gsap';
import { useEffect, useState } from 'react';
import useSizes from './utils/useSizes.jsx';

const Preloader = ({ roomRef, enableControls, orthographicCameraRef }) => {
  const sizes = useSizes();
  let initialY = null;
  const [scaleFlag, setScaleFlag] = useState(false);
  const [moveFlag, setMoveFlag] = useState(false);

  useFrame(() => {
    if (moveFlag) {
      move();
    }
    if (scaleFlag) {
      scale();
    }
  }, []);

  useEffect(() => {
    if (roomRef.current) {
      setAssets();
      playIntro();
    }
  }, []);

  const setAssets = () => {
    convert(document.querySelector('.intro-text'));
    convert(document.querySelector('.hero-main-title'));
    convert(document.querySelector('.hero-main-description'));
    convert(document.querySelector('.hero-second-subheading'));
    convert(document.querySelector('.second-sub'));
  };
  function firstIntro() {
    if (!roomRef.current) return;
    return new Promise((resolve) => {
      const firstTimeLine = gsap.timeline();

      firstTimeLine.set('.animatedis', { y: 0, yPercent: 100 });
      firstTimeLine.to('.preloader', {
        opacity: 0,
        delay: 1,
        onComplete: () => {
          document.querySelector('.preloader').classList.add('hidden');
        },
      });
      if (sizes.device === 'desktop') {
        firstTimeLine
          .to(roomRef.current.children.find((el) => el.name === 'Cube').scale, {
            x: 0.5,
            y: 0.5,
            z: 0.5,
            ease: 'back.out(2.5)',
            duration: 0.7,
          })
          .to(roomRef.current.position, {
            x: -1,
            ease: 'power1.out',
            duration: 0.7,
          });
      } else {
        firstTimeLine
          .to(roomRef.current.children.find((el) => el.name === 'Cube').scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: 'back.out(2.5)',
            duration: 0.7,
          })
          .to(roomRef.current.position, {
            z: -1,
            ease: 'power1.out',
            duration: 0.7,
          });
      }
      firstTimeLine
        .to('.intro-text .animatedis', {
          yPercent: 0,
          stagger: 0.05,
          ease: 'back.out(1.7)',
        })
        .to(
          '.arrow-svg-wrapper',
          {
            opacity: 1,
          },
          'same',
        )
        .to(
          '.toggle-bar',
          {
            opacity: 1,
            onComplete: resolve,
          },
          'same',
        );
    });
  }
  function secondIntro() {
    if (!roomRef.current) return;
    return new Promise((resolve) => {
      const secondTimeLine = gsap.timeline();
      secondTimeLine
        .to(
          '.intro-text .animatedis',
          {
            yPercent: 100,
            stagger: 0.05,
            ease: 'back.in(1.7)',
          },
          'fadeout',
        )
        .to(
          '.arrow-svg-wrapper',
          {
            opacity: 0,
          },
          'fadeout',
        )
        .to(
          roomRef.current.position,
          {
            x: 0,
            y: 0,
            z: 0,
            ease: 'power1.out',
          },
          'same',
        )
        .to(
          roomRef.current.children.find((el) => el.name === 'Cube').rotation,
          {
            y: 2 * Math.PI + Math.PI / 4,
          },
          'same',
        )
        .to(
          roomRef.current.children.find((el) => el.name === 'Cube').scale,
          {
            x: 2,
            y: 2,
            z: 2,
          },
          'same',
        )
        .to(
          orthographicCameraRef.current.position,
          {
            y: 6.5,
          },
          'same',
        )
        .to(
          roomRef.current.children.find((el) => el.name === 'Cube').position,
          {
            x: 0,
            y: 3.45,
            z: 0,
          },
          'same',
        )
        .to(roomRef.current.children.find((el) => el.name === 'Body').scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: 0.5,
        })
        .to(
          roomRef.current.children.find((el) => el.name === 'Cube').scale,
          {
            x: 0,
            y: 0,
            z: 0,
          },
          'introtext',
        )
        .to(
          '.hero-main-title .animatedis',
          {
            yPercent: 0,
            stagger: 0.07,
            ease: 'back.out(1.7)',
          },
          'introtext',
        )
        .to(
          '.hero-main-description .animatedis',
          {
            yPercent: 0,
            stagger: 0.07,
            ease: 'back.out(1.7)',
          },
          'introtext',
        )
        .to(
          '.first-sub .animatedis',
          {
            yPercent: 0,
            stagger: 0.07,
            ease: 'back.out(1.7)',
          },
          'introtext',
        )
        .to(
          '.second-sub .animatedis',
          {
            yPercent: 0,
            stagger: 0.07,
            ease: 'back.out(1.7)',
          },
          'introtext',
        )
        .to(
          roomRef.current.children.find((el) => el.name === 'Furniture').scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: 'back.out(2.2)',
            duration: 0.5,
          },
          '>-0.5',
        )
        .to(
          roomRef.current.children.find((el) => el.name === 'Shelves').scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: 'back.out(2.2)',
            duration: 0.5,
          },
          '>-0.3',
        )
        .to(
          roomRef.current.children.find((el) => el.name === 'Floor_Items').scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: 'back.out(2.2)',
            duration: 0.5,
          },
          '>-0.2',
        )
        .to(
          roomRef.current.children.find((el) => el.name === 'Desks').scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: 'back.out(2.2)',
            duration: 0.5,
          },
          '>-0.1',
        )
        .to(
          roomRef.current.children.find((el) => el.name === 'Table_Stuff').scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: 'back.out(2.2)',
            duration: 0.5,
          },
          '>-0.1',
        )
        .to(roomRef.current.children.find((el) => el.name === 'Computer').scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: 'back.out(2.2)',
          duration: 0.5,
        })
        .set(roomRef.current.children.find((el) => el.name === 'Mini_Floor').scale, {
          x: 1,
          y: 1,
          z: 1,
        })
        .to('.arrow-svg-wrapper', {
          opacity: 1,
          onComplete: resolve,
        });
    });
  }

  function removeEventListeners() {
    window.removeEventListener('wheel', onScroll);
    window.removeEventListener('touchstart', onTouch);
    window.removeEventListener('touchmove', onTouchMove);
  }
  function onScroll(e) {
    if (e.deltaY > 0) {
      removeEventListeners();
      playSecondIntro();
    }
  }
  let t = null;
  function onTouch(e) {
    initialY = e.touches[0].clientY;
  }
  function onTouchMove(e) {
    let currentY = e.touches[0].clientY;
    let difference = initialY - currentY;

    if (difference > 0) {
      removeEventListeners();
      playSecondIntro();
    }
    initialY = null;
  }
  async function playIntro() {
    setScaleFlag(true);
    await firstIntro();
    setMoveFlag(true);
    window.addEventListener('wheel', onScroll);
    window.addEventListener('touchstart', onTouch);
    window.addEventListener('touchmove', onTouchMove);
  }
  async function playSecondIntro() {
    setMoveFlag(false);
    await secondIntro();
    setScaleFlag(false);
    enableControls();
  }
  function move() {
    if (sizes.device === 'desktop') {
      roomRef.current.position.set(-1, 0, 0);
    } else {
      roomRef.current.position.set(0, 0, -1);
    }
  }
  function scale() {
    if (!roomRef.current) return;
    roomRef.current.children.find((el) => el.type === 'PointLight').intensity = 0;
    roomRef.current.children.find((el) => el.type === 'PointLight').decay = 0;

    if (sizes.device === 'desktop') {
      roomRef.current.scale.set(0.35, 0.35, 0.35);
    } else {
      roomRef.current.scale.set(0.2, 0.2, 0.2);
    }
  }
};

export default Preloader;
