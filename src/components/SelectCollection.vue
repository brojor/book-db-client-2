<script setup lang="ts">
const bookStates = [
  { label: 'Seznam přání', value: 'wishlist', icon: 'i-mdi:gift-outline' },
  { label: 'Přečtené', value: 'read', icon: 'i-mdi:checkbox-marked-circle-outline' },
  { label: 'Rozečtené', value: 'reading', icon: 'i-mdi:progress-clock' },
  { label: 'Nepřečtené', value: 'unread', icon: 'i-mdi:close-circle-outline' },
]
const selected = ref(bookStates[0])
</script>

<template>
  <div>
    <ASelect
      v-slot="{ attrs }"
      v-model="selected"
      :prepend-inner-icon="selected.icon"
    >
      <li
        v-for="bookState in bookStates"
        v-bind="attrs"
        :key="bookState"
        class="flex items-center gap-x-3"
        @click="selected = bookState"
      >
        <div :class="bookState.icon" :style="{ color: `hsl(var(--c-${bookState.value}))` }" />
        <span>{{ bookState.label }}</span>
      </li>
    </ASelect>
  </div>
</template>

<style scoped>

</style>
