/*
 * @Author: hvvvvvv- 1264178545@qq.com
 * @Date: 2023-07-08 17:59:34
 * @LastEditors: hvvvvvv- 1264178545@qq.com
 * @LastEditTime: 2023-07-08 23:56:46
 * @FilePath: \exercise\src\script.js
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import typefaceFont from 'three/examples/fonts/helvetiker_regular.typeface.json'
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

THREE.ColorManagement.enabled = false

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


/**
 * AxesHelper
 */
// const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('/textures/matcaps/8.png')

/**
 * FontLoader
 */
const fontLoader = new FontLoader()


fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) => {
        const textGeometry = new TextGeometry(
            'zong',
            {
                font: font,
                size: 0.8,
                height: 0.2,
                curveSegments: 4,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 3
            }
        
        )
        const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture})
        // textMaterial.wireframe = true
        const text = new THREE.Mesh(textGeometry, material)
        scene.add(text)

        textGeometry.computeBoundingBox()

        // textGeometry.translate(
        //     - (textGeometry.boundingBox.max.x -0.02) * 0.5,
        //     - (textGeometry.boundingBox.max.y - 0.02) * 0.5,
        //     - (textGeometry.boundingBox.max.z - 0.03) * 0.5
        // )

        textGeometry.center()


        console.time('donuts')

        const dountGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
        // const dountMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })
        
        for (let i = 0; i < 200; i++){
            const dount = new THREE.Mesh(dountGeometry, material)
            scene.add(dount)

            dount.position.x = (Math.random() - 0.5) * 10
            dount.position.y = (Math.random() - 0.5) * 10
            dount.position.z = (Math.random() - 0.5) * 10

            dount.rotation.y = Math.random() * Math.PI
            dount.rotation.z = Math.random() * Math.PI

            const scale = Math.random()
            dount.scale.set(scale, scale, scale)
        }
        console.timeEnd('donuts')

    }
)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.outputColorSpace = THREE.LinearSRGBColorSpace
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()