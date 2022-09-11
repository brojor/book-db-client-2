<script setup lang="ts">
defineProps<{
  title: string
  subtitle: string | number
  icon: 'author' | 'book'
}>()
</script>

<template>
  <div ml4 mb2 flex items-center gap3>
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

<style scoped></style>
