<script setup>
defineProps({
  msg: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div>{{ msg }}</div>
  <!-- rest van jouw navbar -->
</template>
