<script setup lang="ts">
import { ASelect } from 'anu-vue';
import { ref } from 'vue';

const selected = ref();
const fruits = ['banana', 'apple', 'watermelon', 'orange'];
</script>

<template>
  <h1>hello</h1>
  <ASelect v-model="selected" placeholder="Select Fruit" :options="fruits" />
</template>
