// @ts-nocheck
"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import * as THREE from "three";
import SimplexNoise from "simplex-noise";
import { Icons } from "@/app/components/icons";

//import chroma from "./chroma.min.js";   // Only needed for GUI

/* 
AUTHOR: https://codepen.io/soju22/pen/PLeLwo?editors=1010
import "https://cdnjs.cloudflare.com/ajax/libs/three.js/100/three.min.js";
import "https://cdnjs.cloudflare.com/ajax/libs/simplex-noise/2.4.0/simplex-noise.min.js";
import "https://cdnjs.cloudflare.com/ajax/libs/chroma-js/2.0.3/chroma.min.js"; 
Performance Issues: https://stackoverflow.com/questions/11285065/limiting-framerate-in-three-js-to-increase-performance-requestanimationframe
*/

function App(conf: any) {
  conf = {
    fov: 75,
    cameraZ: 75,
    xyCoef: 50,
    zCoef: 10,
    lightIntensity: 0.9,
    ambientColor: 0x000000,
    light1Color: 0x0e09dc,
    light2Color: 0x1cd1e1,
    light3Color: 0x18c02c,
    light4Color: 0xee3bcf,
    ...conf,
  };

  // @ts-ignore:next-line
  let renderer, scene, camera, cameraCtrl, light1, light2, light3, light4;
  // @ts-ignore:next-line
  let width, height, cx, cy, wWidth, wHeight, plane, gArray;

  const TMath = THREE.Math;

  const simplex = new SimplexNoise();

  const mouse = new THREE.Vector2();
  const mousePlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  const mousePosition = new THREE.Vector3();
  const raycaster = new THREE.Raycaster();

  const noiseInput = document.getElementById("noiseInput");
  const heightInput = document.getElementById("heightInput");

  init();

  function init() {
    renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById(conf.el),
      antialias: true,
      alpha: true,
    });
    camera = new THREE.PerspectiveCamera(conf.fov);
    camera.position.z = conf.cameraZ;

    updateSize();
    window.addEventListener("resize", updateSize, false);

    /* 
    // Changes canvas based on mouse movement
    document.addEventListener("mousemove", (e) => {
      const v = new THREE.Vector3();
      camera.getWorldDirection(v);
      v.normalize();
      mousePlane.normal = v;
      mouse.x = (e.clientX / width) * 2 - 1;
      mouse.y = -(e.clientY / height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      raycaster.ray.intersectPlane(mousePlane, mousePosition);
    }); */

    initScene();
    // initGui();   // Enable this to enable GUI
    animate();
  }

  function initGui() {
    noiseInput.value = 101 - conf.xyCoef;
    heightInput.value = (conf.zCoef * 100) / 25;

    noiseInput.addEventListener("input", (e) => {
      conf.xyCoef = 101 - noiseInput.value;
    });
    heightInput.addEventListener("input", (e) => {
      conf.zCoef = (heightInput.value * 25) / 100;
    });

    document.getElementById("trigger").addEventListener("click", (e) => {
      updateLightsColors();
    });
  }

  function initScene() {
    scene = new THREE.Scene();
    initLights();

    let mat = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
    });

    let geo = new THREE.PlaneBufferGeometry(
      wWidth,
      wHeight,
      wWidth / 2,
      wHeight / 2
    );
    plane = new THREE.Mesh(geo, mat);
    scene.add(plane);

    plane.rotation.x = -Math.PI / 2 - 0.2;
    plane.position.y = -25;
    camera.position.z = 60;
  }

  function initLights() {
    const r = 30;
    const y = 10;
    const lightDistance = 500;

    // light = new THREE.AmbientLight(conf.ambientColor);
    // scene.add(light);

    light1 = new THREE.PointLight(
      conf.light1Color,
      conf.lightIntensity,
      lightDistance
    );
    light1.position.set(0, y, r);
    scene.add(light1);
    light2 = new THREE.PointLight(
      conf.light2Color,
      conf.lightIntensity,
      lightDistance
    );
    light2.position.set(0, -y, -r);
    scene.add(light2);
    light3 = new THREE.PointLight(
      conf.light3Color,
      conf.lightIntensity,
      lightDistance
    );
    light3.position.set(r, y, 0);
    scene.add(light3);
    light4 = new THREE.PointLight(
      conf.light4Color,
      conf.lightIntensity,
      lightDistance
    );
    light4.position.set(-r, y, 0);
    scene.add(light4);
  }

  /*   
  // Uses timeout to slow down cpu usage
  function animate() {
    setTimeout(function () {
      requestAnimationFrame(animate);
    }, 250);
    animatePlane();
    animateLights();
    renderer.render(scene, camera);
  } */

  /*   
  // uses alternative method to slow down cpu usage
  let clock = new THREE.Clock();
  let delta = 0;
  // 30 fps
  let interval = 1 / 30;

  function animate() {
    requestAnimationFrame(animate);
    delta += clock.getDelta();

    if (delta > interval) {
      // The draw or time dependent code are here
      animatePlane();
      animateLights();
      renderer.render(scene, camera);

      delta = delta % interval;
    }
  }*/

  // Best way to reduce CPU usage while animating
  var stop = false;
  var frameCount = 0;
  var fps, fpsInterval, startTime, now, then, elapsed;

  fpsInterval = 1000 / 5;
  then = Date.now();
  startTime = then;

  function animate() {
    if (stop) {
      return;
    }
    // request another frame
    requestAnimationFrame(animate);
    // calc elapsed time since last loop
    now = Date.now();
    elapsed = now - then;
    // if enough time has elapsed, draw the next frame
    if (elapsed > fpsInterval) {
      // Get ready for next frame by setting then=now, but...
      // Also, adjust for fpsInterval not being multiple of 16.67
      then = now - (elapsed % fpsInterval);
      // draw stuff here
      animatePlane();
      animateLights();
      renderer.render(scene, camera);
    }
  }

  function animatePlane() {
    gArray = plane.geometry.attributes.position.array;
    const time = Date.now() * 0.0002;
    for (let i = 0; i < gArray.length; i += 3) {
      gArray[i + 2] =
        simplex.noise4D(
          gArray[i] / conf.xyCoef,
          gArray[i + 1] / conf.xyCoef,
          time,
          mouse.x + mouse.y
        ) * conf.zCoef;
    }
    plane.geometry.attributes.position.needsUpdate = true;
    //plane.geometry.computeBoundingSphere();
  }

  function animateLights() {
    const time = Date.now() * 0.001;
    const d = 50;
    light1.position.x = Math.sin(time * 0.1) * d;
    light1.position.z = Math.cos(time * 0.2) * d;
    light2.position.x = Math.cos(time * 0.3) * d;
    light2.position.z = Math.sin(time * 0.4) * d;
    light3.position.x = Math.sin(time * 0.5) * d;
    light3.position.z = Math.sin(time * 0.6) * d;
    light4.position.x = Math.sin(time * 0.7) * d;
    light4.position.z = Math.cos(time * 0.8) * d;
  }

  function updateLightsColors() {
    conf.light1Color = chroma.random().hex();
    conf.light2Color = chroma.random().hex();
    conf.light3Color = chroma.random().hex();
    conf.light4Color = chroma.random().hex();
    light1.color = new THREE.Color(conf.light1Color);
    light2.color = new THREE.Color(conf.light2Color);
    light3.color = new THREE.Color(conf.light3Color);
    light4.color = new THREE.Color(conf.light4Color);
    // console.log(conf);
  }

  function updateSize() {
    width = window.innerWidth - 15;
    cx = width / 2;
    height = window.innerHeight > 200 ? 200 : window.innerHeight; // Edit this to change height of canvas
    cy = height / 2;
    if (renderer && camera) {
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      const wsize = getRendererSize();
      wWidth = wsize[0];
      wHeight = wsize[1];
    }
  }

  function getRendererSize() {
    const cam = new THREE.PerspectiveCamera(camera.fov, camera.aspect);
    const vFOV = (cam.fov * Math.PI) / 180;
    const height = 2 * Math.tan(vFOV / 2) * Math.abs(conf.cameraZ);
    const width = height * cam.aspect;
    return [width, height];
  }
}
function HeroCanvas() {
  const showGUI = false;
  useEffect(() => {
    App({ el: "background" });
  });
  return (
    <div>
      {showGUI && (
        <form>
          <input type="range" min="1" max="100" id="noiseInput" />
          <input type="range" min="1" max="100" id="heightInput" />
          <a href="#" id="trigger">
            Random Colors
          </a>
        </form>
      )}
      <div className="px-4 pt-20  flex flex-col items-center">
        <Icons.logo />
        <p className="mx-auto mt-4 max-w-3xl text-base">
          The latest ai and prompt engineering info
        </p>
      </div>
      <canvas id="background" className="relative z-[-1]"></canvas>
    </div>
  );
}

export default HeroCanvas;
