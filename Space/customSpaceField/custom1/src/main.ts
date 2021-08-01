import * as THREE from "three";
import "./style.css";

window.addEventListener("DOMContentLoaded", async () => {
  let renderer: THREE.WebGLRenderer;
  let scene: THREE.Scene;
  let camera: THREE.PerspectiveCamera;
  let width = 0;
  let height = 0;
  let frameCount = 0;
  let particle_points: THREE.Points;
  const init = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    // レンダラーの設定
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.toneMapping = THREE.ReinhardToneMapping;
    document.body.appendChild(renderer.domElement);

    // 画面サイズ
    width = window.innerWidth;
    height = window.innerHeight;

    /// シーン
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    scene.fog = new THREE.Fog(0xd8d8d8, 2000, 3500);

    camera = new THREE.PerspectiveCamera(
      27,
      window.innerWidth / window.innerHeight,
      5,
      3500
    );
    camera.position.z = 1750;
    scene.add(camera);

    // particleの初期化
    initParticle();

    const windowResize = () => {
      // 画面サイズ
      width = window.innerWidth;
      height = window.innerHeight;
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);

      // カメラのアスペクト比を正す。
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("keydown", (event) => {
      if (event.key === "f" || event.key === "F") {
        console.log("push f or F!!");
        const element = document.body;
        element.requestFullscreen();
      }
    });

    windowResize();
    window.addEventListener("resize", windowResize);
  };

  const initParticle = () => {
    const particleMax = 200000;
    const particleGeometry = new THREE.BufferGeometry();
    // attributeに格納する
    const particleLocation: number[] = [];
    const particleColors: number[] = [];

    const n = 300,
      nX2 = n / 2.0,
      nY2 = n / 1.0,
      nZ2 = n / 0.5;

    [...Array(particleMax).keys()].forEach((count) => {
      const radian = THREE.MathUtils.degToRad(count);
      const x = Math.random() * Math.cos(radian) * nX2;
      const y = Math.random() * Math.sin(radian) * nY2;
      const z = Math.random() * Math.tan(radian) * nZ2;

      particleLocation.push(x, y, z);

      // colors
      const colorR = x / n + 0.5;
      const colorG = y / n + 0.5;
      const colorB = z / n + 0.5;

      const particleColor: THREE.Color = new THREE.Color();
      particleColor.setRGB(colorR, colorG, colorB);

      particleColors.push(particleColor.r, particleColor.g, particleColor.b);
    });

    particleGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(particleLocation, 3)
    );

    particleGeometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(particleColors, 3)
    );

    particleGeometry.computeBoundingSphere();

    const particleMaterial = new THREE.PointsMaterial({
      size: 15,
      vertexColors: true,
    });

    particle_points = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particle_points);
  };

  const draw = () => {
    frameCount = frameCount + 1.0;

    particle_points.rotation.x = Math.cos(THREE.MathUtils.degToRad(frameCount));
    particle_points.rotation.y = Math.sin(THREE.MathUtils.degToRad(frameCount));

    renderer.render(scene, camera);

    requestAnimationFrame(draw);
  };

  init();
  draw();
});
