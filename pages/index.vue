<template>
  <div style="background-color: red">
    <div class="min-h-[8rem] w-full max-w-md mx-auto">
        <h1>Getting ready...</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStateMachineStore } from '~/stores/state';

definePageMeta({
  middleware: ['check-allowed-state', 'do-something-async'],
  allowedStates: ['idle'],
});

// Sent the init event to the state machine...
const { send } = useStateMachineStore();

send('INIT', { });
</script>
