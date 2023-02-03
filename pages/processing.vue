<template>
  <div style="background-color: greenyellow">
    <h1>Processing your payment...</h1>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['check-allowed-state', 'do-something-async'],
  allowedStates: ['processingPayment'],
});
</script>
