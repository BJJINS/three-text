import * as THREE from "three";
import { FontLoader, OrbitControls, RGBELoader, TextGeometry } from "three/examples/jsm/Addons.js";
import gsap from "gsap";
import GUI from "lil-gui";
/**
 * @type {HTMLCanvasElement}
 */
const canvas = document.getElementById("canvas");

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(50, width / height);

camera.position.set(0, 0, 10);

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(width, height);

// 画布跟随窗口变化
window.onresize = function () {
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
};

// window.addEventListener("dblclick", () => {
//     const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;
//     if (fullscreenElement) {
//         if (document.exitFullscreen) {
//             document.exitFullscreen();
//         } else if (document.webkitExitFullscreen) {
//             document.webkitExitFullscreen();
//         }
//         return;
//     }
//     if (canvas.requestFullscreen) {
//         canvas.requestFullscreen();
//     } else if (canvas.webkitRequestFullscreen) {
//         canvas.webkitRequestFullscreen();
//     }
// });

const gui = new GUI();
gui.close();

const axes = new THREE.AxesHelper(10);
scene.add(axes);

new OrbitControls(camera, canvas);


const textureLoader = new THREE.TextureLoader();
const colorTexture = textureLoader.load("/textures/door/color.jpg");
const alphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const ambientOcclusionTexture = textureLoader.load("/textures/door/ambientOcclusion.jpg");
const heightTexture = textureLoader.load("/textures/door/height.jpg");
const normalTexture = textureLoader.load("/textures/door/normal.jpg");
const metalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const roughnessTexture = textureLoader.load("/textures/door/roughness.jpg");


const matcapTexture = textureLoader.load("/textures/matcaps/8.png");
// const gradientTexture = textureLoader.load("/textures/gradients/3.jpg");


// colorTexture.colorSpace = THREE.SRGBColorSpace;
// matcapTexture.colorSpace = THREE.SRGBColorSpace;



// const rgbelLoader = new RGBELoader();
// rgbelLoader.load("/textures/environmentMap/2k.hdr", (data) => {
//     data.mapping = THREE.EquirectangularReflectionMapping;
//     scene.background = data;
//     scene.environment = data;
// });


const fontLoader = new FontLoader();
fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
    const textGeometry = new TextGeometry("hello world", {
        font,
        size: 0.5,
        depth: 0.2,
        curveSegments: 5,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 4
    });

    textGeometry.center();
    const textMaterial = new THREE.MeshMatcapMaterial({
        matcap: matcapTexture
    });

    const text = new THREE.Mesh(textGeometry, textMaterial);
    scene.add(text);

    console.time("donuts");
    const donutMaterial = textMaterial;
    const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
    for (let i = 0; i < 300; i++) {

        // const donutMaterial = new THREE.MeshMatcapMaterial({
        //     matcap: matcapTexture
        // });
        const donut = new THREE.Mesh(donutGeometry, donutMaterial);
        donut.position.x = (Math.random() - 0.5) * 20;
        donut.position.y = (Math.random() - 0.5) * 20;
        donut.position.z = (Math.random() - 0.5) * 20;
        donut.rotation.x = Math.random() * Math.PI;
        donut.rotation.y = Math.random() * Math.PI;
        const scale = Math.random();
        donut.scale.set(scale, scale, scale);
        scene.add(donut);
    }

    console.timeEnd("donuts");
});


// const material = new THREE.MeshMatcapMaterial({
//     matcap: matcapTexture,
//     alphaMap: alphaTexture
// });

// const sphere = new THREE.Mesh(
//     new THREE.SphereGeometry(0.5, 16, 16),
//     material
// );

// sphere.position.x = -1.5;

// const plane = new THREE.Mesh(
//     new THREE.PlaneGeometry(1, 1),
//     material
// );

// const torus = new THREE.Mesh(
//     new THREE.TorusGeometry(0.3, 0.2, 16, 32),
//     material
// );
// torus.position.x = 1.5;
// scene.add(sphere, plane, torus);

const clock = new THREE.Clock();

function render() {
    const elapsedTime = clock.getElapsedTime();
    // sphere.rotation.y = 0.1 * elapsedTime;
    // plane.rotation.y = 0.1 * elapsedTime;
    // torus.rotation.y = 0.1 * elapsedTime;

    // sphere.rotation.z = -0.15 * elapsedTime;
    // plane.rotation.z = -0.15 * elapsedTime;
    // torus.rotation.z = -0.15 * elapsedTime;


    renderer.render(scene, camera);
    requestAnimationFrame(render);
}
render();

