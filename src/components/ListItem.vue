<script setup lang="ts">
import { BookState } from '@/types'
const props = defineProps<{
  title: string
  subtitle: string | number
  icon: 'author' | 'book'
  selected: boolean
  bookState?: BookState
  rightTopText?: string
  rightBottomText?: string
}>()

const emit = defineEmits(['select'])

const el = ref<HTMLElement | null>(null)
const touchHandler = useLongPress(el, () => {
  emit('select')
})
</script>

<template>
  <div
    ref="el" px3 py1 mx1 mb2px flex items-center gap3 relative rounded-lg overflow-hidden
    :class="{ selected: props.selected }"
    v-on="touchHandler "
  >
    <div class="press-marker" />
    <ItemAvatar :icon="icon" @click.stop="$emit('select')" />
    <small absolute bottom-0 left-12>
      <div v-if="bookState === BookState.read" i-mdi:checkbox-marked-circle-outline text-white:70 />
      <div v-if="bookState === BookState.reading" i-mdi:progress-clock text-white:70 />
      <div v-if="bookState === BookState.unread" i-mdi:close-circle-outline text-white:70 />
    </small>
    <div grow>
      <div flex justify-between>
        <h3 text-sm font-bold>
          {{ title }}
        </h3>
        <h3 text-sm font-bold>
          {{ rightTopText }}
        </h3>
      </div>
      <div flex justify-between>
        <p text-xs leading-5>
          {{ subtitle }}
        </p>
        <p text-xs>
          {{ rightBottomText }}
        </p>
      </div>
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
  background: rgba(var(--c-accent), 0.1);
}
.pressed > .press-marker {
  width: 100%;
  height: 100%;
  background: #ffffff10;

}
</style>
