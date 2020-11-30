import * as THREE from 'three'

export default class Artwork {
  constructor() {
    this.clock = new THREE.Clock()
    this.canvas = document.getElementById('canvas')
    this.init()
  }

  init() {
    this.clock.start()
    this.setSize()
    this.initRenderer()
    this.initScene()
    this.initCamera()
    window.addEventListener('resize', this.resize.bind(this))
    this.loop()
  }

  initScene() {
    this.scene = new THREE.Scene()
    // FIXME 消すとundifinedになる...
    this.scene.autoUpdate = true
  }

  initCamera() {
    this.camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / this.size.windowH,
        1,
        1000
      )
    this.camera.position.set(0, 0, 0)
    this.camera.lookAt(new THREE.Vector3(1, 0, 0))
    this.camera.aspect = this.size.windowW / this.size.windowH
    this.camera.updateProjectionMatrix()
  }

  setSize() {
    this.size = {
      windowW: window.innerWidth,
      windowH: window.innerHeight,
    }
  }

  initRenderer() {
    // this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    })
    this.renderer.setPixelRatio(1)

    this.renderer.setClearColor(0x000000)
    this.renderer.setSize(this.size.windowW, this.size.windowH)
  }

  resize() {
    this.setSize()
    this.camera.aspect = this.size.windowW / this.size.windowH
    this.renderer.setSize(this.size.windowW, this.size.windowH)
    this.camera.updateProjectionMatrix()
  }

  loop() {
    this.render()
    requestAnimationFrame(this.loop.bind(this))
  }

  render() {
    this.renderer.render(this.scene, this.camera)
  }
}

const init = () => {
  new Artwork()
}

if (document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
  init()
} else {
  document.addEventListener('DOMContentLoaded', init)
}