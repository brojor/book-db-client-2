<script setup lang="ts">
defineProps<{
  title: string
  subtitle: string | number
  icon: 'author' | 'book'
}>()

const longPressTimer = ref<NodeJS.Timeout>()
const el = ref<HTMLElement | null>(null)

const handleLongPress = () => {
  console.log('long press')

  el.value?.classList.remove('pressed')
  el.value?.classList.toggle('selected')
}
const isSelected = ref(false)

const touchHandler = {
  touchstart: (event: TouchEvent) => {
    el.value?.classList.add('pressed')
    longPressTimer.value = setTimeout(() => {
      handleLongPress()
    }, 500)
  },
  touchmove: (event: TouchEvent) => {
    clearTimeout(longPressTimer.value)
    el.value?.classList.remove('pressed')
  },
  touchend: (event: TouchEvent) => {
    clearTimeout(longPressTimer.value)
    el.value?.classList.remove('pressed')
  },
}
</script>

<template>
  <div ref="el" px3 py1 mx1 mb2px flex items-center gap3 relative rounded-lg overflow-hidden v-on="touchHandler ">
    <div class="press-marker" />
    <div
      rounded-full
      bg-base
      h="48px"
      w="48px"
      flex
      items-center
      justify-center
      text-2xl
      text-teal
    >
      <BookIcon v-if="icon === 'book'" />
      <PersonIcon v-if="icon === 'author'" />
    </div>
    <div>
      <h3 text-sm font-bold>
        {{ title }}
      </h3>
      <p text-xs>
        {{ subtitle }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.press-marker {
  width: 30%;
  height: 30%;
  position: absolute;
  background: #FFFFFF00;
  left: 0;
  right: 0;
  margin: auto;
  transition: all 0.25s;
  transition-delay: 0.1s;
}
.selected {
  background: #14b8a534;
}
.pressed > .press-marker {
  width: 100%;
  height: 100%;
  background: #ffffff10;

}
</style>
