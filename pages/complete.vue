<template>
  <div style="background-color: blue">
    <h1>Completed!</h1>

    <button @click="backToStart">Restart</button>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['check-allowed-state', 'do-something-async'],
  allowedStates: ['paymentCompleted'],
});

function backToStart() {
  window.location.pathname = ''
}
</script>
