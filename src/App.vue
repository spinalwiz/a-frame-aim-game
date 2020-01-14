<template>
  <div id="app">
    <a-scene  stats
              light="defaultLightsEnabled: false"
              loading-screen="dotsColor: red; backgroundColor: black"
              renderer="antialias: false; maxCanvasWidth: -1; maxCanvasHeight: -1"

    >
      <a-assets >
        <a-asset-item id="gun-model" src="/models/smg.glb">
        </a-asset-item>
        <a-asset-item id="target-2" src="/models/target2.glb"></a-asset-item>
        <audio id="gunshot" src="/sounds/riffle.mp3" preload="auto"></audio>
      </a-assets>

      <a-camera geometry-merger="preserveOriginal: false"
                camera wasd-controls
                look-controls="pointerLockEnabled: true"
                position="0 2 4.5">

        <!--Gun-->
        <a-gltf-model src="#gun-model"
                      position="0 -0.05 0"

        ></a-gltf-model>
        <a-entity cursor="fuse: false;"
                  position="0 0 -1"
                  geometry="primitive: ring; radiusInner: 0.01; radiusOuter: 0.015"
                  material="color: red; shader: flat"
                  sound="src: #gunshot; on: click; poolSize: 10">
        </a-entity>
      </a-camera>

      <a-gltf-model hide-targets
                    geometry-merger="preserveOriginal: false" src="/models/factory.glb"
                    >
        <a-gltf-model src="/floor.glb"
                      position="0 -5.6 0"></a-gltf-model>
      </a-gltf-model>

      <a-gltf-model src="#target-2" position="0 2 0"></a-gltf-model>

    </a-scene>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
