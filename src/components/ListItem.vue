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
  <div ref="el" px3 py1 mx1 mb2px flex items-center gap3 relative rounded-lg overflow-hidden
    :class="{ selected: props.selected }" v-on="touchHandler ">
    <div class="press-marker" />
    <ItemAvatar :icon="icon" @click.stop="$emit('select')" />
    <div grow>
      <div flex justify-between>
        <h3 text-sm font-bold flex gap1 items-center>
          {{ title }}
          <span opacity-50 text-xs>
            <div v-if="bookState === BookState.read" i-mdi:checkbox-marked-circle-outline />
            <div v-if="bookState === BookState.reading" i-mdi:progress-clock />
            <div v-if="bookState === BookState.unread" i-mdi:close-circle-outline />
          </span>
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
  background: hsla(var(--a-primary), 0.1);
}

.pressed>.press-marker {
  width: 100%;
  height: 100%;
  background: #ffffff10;

}
</style>
