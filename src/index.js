import * as THREE from "three";
import { FontLoader, OrbitControls, TextGeometry } from "three/examples/jsm/Addons.js";
/**
 * @type {HTMLCanvasElement}
 */
const canvas = document.getElementById("canvas");

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(50, width / height);

camera.position.set(0, 0, 5);

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

window.addEventListener("dblclick", () => {
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;
    if (fullscreenElement) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
        return;
    }
    if (canvas.requestFullscreen) {
        canvas.requestFullscreen();
    } else if (canvas.webkitRequestFullscreen) {
        canvas.webkitRequestFullscreen();
    }
});


new OrbitControls(camera, canvas);
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load("/8.png");

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

    const donutMaterial = textMaterial;
    const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
    for (let i = 0; i < 300; i++) {
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

});


function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}
render();

