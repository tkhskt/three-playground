import * as THREE from 'three'

export default class Artwork {
    constructor() {
      this.clock = new THREE.Clock()
      this.canvas = document.getElementById('canvas')
      this.init()
    }
  
    init() {
      this.clock.start()
      window.addEventListener('resize', this.resize.bind(this))
      this.setSize()
      this.initRenderer()
      this.initScene()
      this.initCamera()
      this.start()
    }
  
    start() {
      this.loop()
    }

    initScene() {
      this.scene = new THREE.Scene()
    }

    initCamera() {
      this.camera = new THREE.PerspectiveCamera(
          50,
          this.size.windowW / this.size.windowH,
          1,
          1000
        )
      this.camera.position.set(0, 0, 0)
      this.camera.lookAt(new THREE.Vector3(1, 0, 0))
    }
  
    setSize() {
      this.size = {
        windowW: window.innerWidth,
        windowH: window.innerHeight,
      }
      this.camera.aspect = this.size.windowW / this.size.windowH
      this.renderer.setSize(this.size.windowW, this.size.windowH)
      this.camera.updateProjectionMatrix()
    }
  
    initRenderer() {
      // this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        antialias: true,
      })
      this.renderer.setPixelRatio(1)
  
      // eslint-disable-next-line unicorn/number-literal-case
      this.renderer.setClearColor(0x000000)
      this.renderer.setSize(this.size.windowW, this.size.windowH)
    }
  
    resize() {
      this.setSize()
    }
  
    loop() {
      this.render()
      requestAnimationFrame(this.loop.bind(this))
    }
  
    render() {
        this.renderer.render()
    }
  }