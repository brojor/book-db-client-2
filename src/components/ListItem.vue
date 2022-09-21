<script setup lang="ts">
const props = defineProps<{
  title: string
  subtitle: string | number
  icon: 'author' | 'book'
  selected: boolean
  isRead?: boolean
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
        <p text-xs>
          {{ subtitle }}
        </p><div i-mdi:checkbox-marked-outline :class="isRead ? 'text-[#0BB842]' : 'text-[#404040]' " />
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
