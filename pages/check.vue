<template>
  <div style="background-color: orange">
    <div class="w-full max-w-md mx-auto">
        <h1>Checking your details...</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['check-allowed-state', 'do-something-async'],
  allowedStates: ['checkingInitialDetails'],
});
</script>
