import GSAP from 'gsap';
import * as THREE from 'three';
import Experience from '../Experience.js';

export default class Room {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.room = this.resources.items.room;
    this.actualRoom = this.room.scene;
    this.roomChildren = {};
    // console.log(this.actualRoom, 'actualRoom');

    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1,
    };

    this.setModel();
    this.onMouseMove();
  }

  setModel() {
    this.actualRoom.children.forEach((child) => {
      child.castShadow = true;
      child.receiveShadow = true;

      if (child instanceof THREE.Group) {
        child.children.forEach((groupChild) => {
          groupChild.castShadow = true;
          groupChild.receiveShadow = true;
        });
      }

      // console.log(child);

      if (child.name === 'Computer') {
        child.children[1].material = new THREE.MeshBasicMaterial({
          map: this.resources.items.screen,
        });
      }

      if (child.name === 'Mini_Floor') {
        child.position.x = 0.225066; //-0.225066 m
        child.position.z = -3.21285; // -3.21285 m
      }

      child.scale.set(0, 0, 0);
      if (child.name === 'Cube') {
        child.position.set(0, 0, 0);
        child.rotation.y = Math.PI / 4;
      }

      this.roomChildren[child.name.toLowerCase()] = child;
    });

    // const width = 0.2;
    // const height = 0.4;
    // const intensity = 1;
    // const rectLight = new THREE.RectAreaLight(
    //   0xffffff,
    //   intensity,
    //   width,
    //   height
    // );
    // rectLight.position.set(-1.5, 2.5, -2); //x:0.898677 m, y:-1.73697 m, z:0.337833 m
    // rectLight.rotation.x = -Math.PI / 2;
    // rectLight.rotation.z = Math.PI / 4;
    // this.actualRoom.add(rectLight);

    const intensity = 0.5;
    const decay = 100;
    const pointLight = new THREE.PointLight(0xffffff, intensity, decay);
    pointLight.position.set(-2.2, 2.3, -1.95);

    this.actualRoom.add(pointLight);

    // console.log(this.roomChildren, 'this.roomChildren');
    this.roomChildren['pointLight'] = pointLight;

    // const sphereSize = 1;
    // const pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
    // pointLight.add(pointLightHelper);

    // const rectLightHelper = new RectAreaLightHelper(rectLight);
    // rectLight.add(rectLightHelper);
    // console.log(this.room);

    this.scene.add(this.actualRoom);
    // this.actualRoom.scale.set(10, 10, 10);
    // console.log(this.actualRoom, 'actualRoom');
  }

  onMouseMove() {
    window.addEventListener('mousemove', (e) => {
      this.rotation =
        ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
      this.lerp.target = this.rotation * 0.05;
    });
  }

  resize() {}

  update() {
    this.lerp.current = GSAP.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease
    );

    this.actualRoom.rotation.y = this.lerp.current;
  }
}
