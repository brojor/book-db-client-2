<script setup lang="ts">
defineEmits(['stopScan'])
</script>

<template>
  <div h-screen flex flex-col justify-center items-center font-sans tracking-wide text-white relative>
    <h1 mb8 text-lg>
      {{ $t('ScannerUI.title') }}
    </h1>
    <div>
      <div class="anim-box">
        <div class="scanner-bar" />
      </div>
    </div>
    <div flex justify-center items-center gap2 my8>
      <span class="red-dot">&#11044;</span>
      <span text="lg center" mr3>
        {{ $t('ScannerUI.scanning') }}
      </span>
    </div>
    <div absolute bottom-8 flex w-full justify-center>
      <button w="1/2" text-2xl bg-white text-black border-none rounded px5 py2 @click="$emit('stopScan')">
        Stop
      </button>
    </div>
  </div>
</template>

<style scoped>
.anim-box{
  width: 75vw;
  height: 20vh;
  padding: 20px;

  background:
    linear-gradient(to right, white 4px, transparent 4px) 0 0,
    linear-gradient(to right, white 4px, transparent 4px) 0 100%,
    linear-gradient(to left, white 4px, transparent 4px) 100% 0,
    linear-gradient(to left, white 4px, transparent 4px) 100% 100%,
    linear-gradient(to bottom, white 4px, transparent 4px) 0 0,
    linear-gradient(to bottom, white 4px, transparent 4px) 100% 0,
    linear-gradient(to top, white 4px, transparent 4px) 0 100%,
    linear-gradient(to top, white 4px, transparent 4px) 100% 100%;

  background-repeat: no-repeat;
  background-size: 20px 20px;
}

.scanner-bar {
    width: 100%;
    height: 1px;
    background-color: red;
    opacity: 0.8;
    position: relative;
    box-shadow: 0px 0px 8px 5px #ff02174d;
    top: 50%;
    animation-name: scan;
    animation-duration: 1.8s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;

}

.red-dot {
    font-size: 0.75rem;
    color: #ff0000;
    animation: blinker 1s ease-in-out infinite;
}

@keyframes scan {
    0% {
        box-shadow: 0px 0px 8px 5px rgba(255, 2, 23, 0.3);
        top: 50%;
    }

    25% {
        box-shadow: 0px 3px 8px 5px rgba(255, 2, 23, 0.3);
        top: 5px;
    }

    75% {
        box-shadow: 0px -3px 8px 5px rgba(255, 2, 23, 0.3);
        top: 98%;
    }
}

@keyframes blinker {
50% { opacity: 0; }
}
</style>

