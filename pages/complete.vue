<template>
  <div style="background-color: blue">
    <h1>Completed!</h1>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['check-allowed-state', 'do-something-async'],
  allowedStates: ['paymentCompleted'],
});
</script>
