<script setup lang="ts">
import { ReadStatus } from '@/types'
const props = defineProps<{
  title: string
  subtitle: string | number
  icon: 'author' | 'book'
  selected: boolean
  readStatus?: ReadStatus
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
    <div grow>
      <h3 text-sm font-bold>
        {{ title }}
      </h3>
      <div flex justify-between>
        <p text-xs leading-5>
          {{ subtitle }}
        </p>
        <div>
          <div v-if="readStatus === ReadStatus.READ" i-mdi:checkbox-marked-circle-outline text-green:90 />
          <div v-if="readStatus === ReadStatus.IN_PROGRESS" i-mdi:progress-clock text-yellow:90 />
          <div v-if="readStatus === ReadStatus.UNREAD" i-mdi:close-circle-outline text-red:50 />
        </div>
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
  background: #14b8a534;
}
.pressed > .press-marker {
  width: 100%;
  height: 100%;
  background: #ffffff10;

}
</style>
