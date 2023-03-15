import { Canvas } from '@react-three/fiber';
import React from 'react';
import * as THREE from 'three';
import Experience from './experience/Experience.jsx';
import useSizes from './experience/utils/useSizes.jsx';

const App = () => {
  const sizes = useSizes();
  return (
    <>
      <div className='experience'>
        <Canvas
          shadows
          style={{ width: '100vw', height: '100vh' }}
          gl={{ antialias: true }}
          onCreated={({ gl }) => {
            gl.physicallyCorrectLights = THREE.sRGBEncoding;
            gl.toneMapping = THREE.CineonToneMapping;
            gl.toneMappingExposure = 1.75;
            gl.setSize(sizes.width, sizes.height);
            gl.setPixelRatio(window.devicePixelRatio / 2);
          }}
        >
          <Experience />
        </Canvas>
      </div>

      <div className='preloader'>
        <div className='preloader-wrapper'>
          <div className='loading'>
            <div className='circle'></div>
            <div className='circle'></div>
            <div className='circle'></div>
          </div>
        </div>
      </div>
      <div className='page' asscroll-container={'true'}>
        <div className='toggle-bar'>
          <div className='sun-wrapper'>
            <svg xmlns='http://www.w3.org/2000/svg' height='24' width='24'>
              <path
                fill='currentColor'
                d='M12 5Q11.575 5 11.288 4.712Q11 4.425 11 4V2Q11 1.575 11.288 1.287Q11.575 1 12 1Q12.425 1 12.713 1.287Q13 1.575 13 2V4Q13 4.425 12.713 4.712Q12.425 5 12 5ZM16.95 7.05Q16.675 6.775 16.675 6.362Q16.675 5.95 16.95 5.65L18.35 4.225Q18.65 3.925 19.062 3.925Q19.475 3.925 19.775 4.225Q20.05 4.5 20.05 4.925Q20.05 5.35 19.775 5.625L18.35 7.05Q18.075 7.325 17.65 7.325Q17.225 7.325 16.95 7.05ZM20 13Q19.575 13 19.288 12.712Q19 12.425 19 12Q19 11.575 19.288 11.287Q19.575 11 20 11H22Q22.425 11 22.712 11.287Q23 11.575 23 12Q23 12.425 22.712 12.712Q22.425 13 22 13ZM12 23Q11.575 23 11.288 22.712Q11 22.425 11 22V20Q11 19.575 11.288 19.288Q11.575 19 12 19Q12.425 19 12.713 19.288Q13 19.575 13 20V22Q13 22.425 12.713 22.712Q12.425 23 12 23ZM5.65 7.05 4.225 5.65Q3.925 5.35 3.925 4.925Q3.925 4.5 4.225 4.225Q4.5 3.95 4.925 3.95Q5.35 3.95 5.625 4.225L7.05 5.65Q7.325 5.925 7.325 6.35Q7.325 6.775 7.05 7.05Q6.75 7.325 6.35 7.325Q5.95 7.325 5.65 7.05ZM18.35 19.775 16.95 18.35Q16.675 18.05 16.675 17.638Q16.675 17.225 16.95 16.95Q17.225 16.675 17.638 16.675Q18.05 16.675 18.35 16.95L19.775 18.35Q20.075 18.625 20.062 19.05Q20.05 19.475 19.775 19.775Q19.475 20.075 19.05 20.075Q18.625 20.075 18.35 19.775ZM2 13Q1.575 13 1.288 12.712Q1 12.425 1 12Q1 11.575 1.288 11.287Q1.575 11 2 11H4Q4.425 11 4.713 11.287Q5 11.575 5 12Q5 12.425 4.713 12.712Q4.425 13 4 13ZM4.225 19.775Q3.95 19.5 3.95 19.075Q3.95 18.65 4.225 18.375L5.65 16.95Q5.925 16.675 6.338 16.675Q6.75 16.675 7.05 16.95Q7.35 17.25 7.35 17.663Q7.35 18.075 7.05 18.375L5.65 19.775Q5.35 20.075 4.925 20.075Q4.5 20.075 4.225 19.775ZM12 18Q9.5 18 7.75 16.25Q6 14.5 6 12Q6 9.5 7.75 7.75Q9.5 6 12 6Q14.5 6 16.25 7.75Q18 9.5 18 12Q18 14.5 16.25 16.25Q14.5 18 12 18ZM12 16Q13.65 16 14.825 14.825Q16 13.65 16 12Q16 10.35 14.825 9.175Q13.65 8 12 8Q10.35 8 9.175 9.175Q8 10.35 8 12Q8 13.65 9.175 14.825Q10.35 16 12 16Z'
              />
            </svg>
          </div>
          <button className='toggle-button'>
            <div className='toggle-circle'></div>
          </button>
          <div className='moon-wrapper'>
            <svg xmlns='http://www.w3.org/2000/svg' height='24' width='24'>
              <path
                fill='currentColor'
                d='M12 21Q8.25 21 5.625 18.375Q3 15.75 3 12Q3 8.25 5.625 5.625Q8.25 3 12 3Q12.35 3 12.688 3.025Q13.025 3.05 13.35 3.1Q12.325 3.825 11.713 4.987Q11.1 6.15 11.1 7.5Q11.1 9.75 12.675 11.325Q14.25 12.9 16.5 12.9Q17.875 12.9 19.025 12.287Q20.175 11.675 20.9 10.65Q20.95 10.975 20.975 11.312Q21 11.65 21 12Q21 15.75 18.375 18.375Q15.75 21 12 21ZM12 19Q14.2 19 15.95 17.788Q17.7 16.575 18.5 14.625Q18 14.75 17.5 14.825Q17 14.9 16.5 14.9Q13.425 14.9 11.262 12.738Q9.1 10.575 9.1 7.5Q9.1 7 9.175 6.5Q9.25 6 9.375 5.5Q7.425 6.3 6.213 8.05Q5 9.8 5 12Q5 14.9 7.05 16.95Q9.1 19 12 19ZM11.75 12.25Q11.75 12.25 11.75 12.25Q11.75 12.25 11.75 12.25Q11.75 12.25 11.75 12.25Q11.75 12.25 11.75 12.25Q11.75 12.25 11.75 12.25Q11.75 12.25 11.75 12.25Q11.75 12.25 11.75 12.25Q11.75 12.25 11.75 12.25Q11.75 12.25 11.75 12.25Q11.75 12.25 11.75 12.25Q11.75 12.25 11.75 12.25Q11.75 12.25 11.75 12.25Z'
              />
            </svg>
          </div>
        </div>

        <div className='page-wrapper' asscroll={'true'}>
          <section className='hero'>
            <div className='hero-wrapper'>
              <div className='intro-text'>Welcome to this portfolio project!</div>
              <div className='arrow-svg-wrapper'>
                <p style={{ marginBottom: 10 }}>Scroll down</p>
                <svg xmlns='http://www.w3.org/2000/svg' height='24' width='24'>
                  <path
                    fill='currentColor'
                    d='M12 14.95q-.2 0-.375-.063-.175-.062-.325-.212L6.675 10.05q-.275-.275-.262-.688.012-.412.287-.687.275-.275.7-.275.425 0 .7.275l3.9 3.9 3.925-3.925q.275-.275.688-.263.412.013.687.288.275.275.275.7 0 .425-.275.7l-4.6 4.6q-.15.15-.325.212-.175.063-.375.063Z'
                  />
                </svg>
              </div>

              <div className='hero-main'>
                <h1 className='hero-main-title'>Daniel Kremer</h1>
                <p className='hero-main-description'>Software Engineer</p>
              </div>

              <div className='hero-second'>
                <p className='hero-second-subheading first-sub'>Fullstack</p>
                <p className='hero-second-subheading second-sub'>Developer</p>
              </div>
            </div>
          </section>

          <div className='first-move section-margin'></div>

          <section className='first-section section left'>
            <div className='progress-wrapper progress-bar-wrapper-left'>
              <div className='progress-bar'></div>
            </div>

            <div className='section-intro-wrapper'>
              <h1 className='section-title'>
                <span className='section-title-text'>First introduction</span>
                <div className='section-title-decoration firstStyle'></div>
                <div className='section-title-decoration secondStyle'></div>
                <div className='section-title-decoration thirdStyle'></div>
              </h1>
              <span className='section-number'>01</span>
            </div>

            <div className='section-detail-wrapper'>
              <p className='section-text'>
                Hey everyone👋! I'm Daniel, a software engineer from Germany. I specialize in
                building mobile and web apps.
              </p>
              <p className='section-text'>
                To further my learning of Three.js, Blender, and React Fiber, I decided to recreate
                Bokoko's award-winning website to showcase my progress.
              </p>
              <p className='section-text'>
                In the following sections, you'll find a brief summary of the project workflow and
                some other projects you can check out.
              </p>
              <p className='section-text'> I hope it leaves an impression!</p>
            </div>
          </section>

          <div className='second-move section-margin'></div>

          <section className='second-section section right'>
            <div className='progress-wrapper progress-bar-wrapper-right'>
              <div className='progress-bar blue-background'></div>
            </div>

            <div className='section-intro-wrapper blue-text blue-border'>
              <h1 className='section-title blue-text blue-border'>
                <span className='section-title-text blue-text'>Project Workflow</span>
                <div className='section-title-decoration firstStyle blue-border'></div>
                <div className='section-title-decoration secondStyle blue-border'></div>
                <div className='section-title-decoration thirdStyle blue-background blue-border'></div>
              </h1>
              <span className='section-number blue-text'>02</span>
            </div>

            <div className='section-detail-wrapper'>
              <h3 className='section-heading'>Workflow description</h3>
              <p className='section-text'>
                To get the project off the ground, the 3D model had to be created in Blender first.
                Each shape was created, colored, and then exported as a whole .glb file.
              </p>
              <p className='section-text'>
                Moving on, a React project was created, and the model was imported using the
                react-fiber package. The application was then split into different, logically
                meaningful components. This way, changes can be easily implemented. For animations,
                gsap was used.
              </p>
              <p className='section-text'>
                Moreover, the spatial positions, sizes, scaling, the scroll behavior, and lights had
                to be set individually, based on the 3D model (in this case, the room). Once this
                was done, the project was ready for release.
              </p>
            </div>
          </section>

          <div className='third-move section-margin'></div>

          <section className='third-section section left'>
            <div className='progress-wrapper progress-bar-wrapper-left'>
              <div className='progress-bar green-background'></div>
            </div>

            <div className='section-intro-wrapper green-text green-border'>
              <h1 className='section-title green-text green-border'>
                <span className='section-title-text green-text'>Other Projects</span>
                <div className='section-title-decoration firstStyle green-border'></div>
                <div className='section-title-decoration secondStyle green-border'></div>
                <div className='section-title-decoration thirdStyle green-background green-border'></div>
              </h1>
              <span className='section-number green-text'>03</span>
            </div>

            <div className='section-detail-wrapper'>
              <h3 className='section-heading'>Invoice manager</h3>
              <p className='section-text'>
                An invoice manager React app, that lets you manage your clients and invoices.
              </p>
              <p className='section-text link'>
                <a href='https://invoice-manager-pi.vercel.app/invoices' target='_blank'>
                  Show project
                </a>
              </p>
              <h3 className='section-heading'>Christmas gifts generator with chatGPT</h3>
              <p className='section-text'>
                This is an example christmas gifts generator app which is based on the OpenAI API
                quickstart tutorial. It uses the Next.js framework with React.
              </p>
              <p className='section-text link'>
                <a href='https://github.com/danielkremer/christmas-gifts-gpt' target='_blank'>
                  Show project
                </a>
              </p>
              <h3 className='section-heading'>React Chat App</h3>
              <p className='section-text'>
                This is a chat app, that enables registration and chatting with other registered
                users. It's made with React and Firebase.
              </p>
              <p className='section-text link'>
                <a href='https://github.com/danielkremer/react-chat-app' target='_blank'>
                  Show project
                </a>
              </p>
              <h3 className='section-heading'>React Tetris Game</h3>
              <p className='section-text'>
                This is simple Tetris game, made with react. Can you beat the high score?
              </p>
              <p className='section-text link'>
                <a href='https://github.com/danielkremer/Tetris' target='_blank'>
                  Show project
                </a>
              </p>
              <div className='divider green-text green-border'></div>
              <h3 className='section-heading'>Github</h3>
              <p className='section-text'>Check out my github page to see more projects.</p>
              <p className='section-text link'>
                <a href='https://github.com/danielkremer' target='_blank'>
                  Go to github
                </a>
              </p>
              <div className='divider green-text green-border'></div>
              <h3 className='section-heading'>Get in touch:</h3>
              <p className='section-text link'>
                <a href='mailto:daniel@danielkremer.com'>daniel@danielkremer.com</a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default App;
