<template>
  <div style="background-color: red">
    <div class="min-h-[8rem] w-full max-w-md mx-auto">
      <h1>Getting ready...</h1>

      <label>
        <input type="checkbox" v-model="delayMiddleware">
        Add delay to middleware
      </label>

      <button @click="startPaymentFlow">Start</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStateMachineStore } from '~/stores/state';

definePageMeta({
  middleware: ['check-allowed-state', 'do-something-async'],
  allowedStates: ['idle'],
});

const delayMiddleware = ref(false)

function startPaymentFlow() {
  // Sent the init event to the state machine...
  const { send } = useStateMachineStore();

  send('START', {delayMiddleware: delayMiddleware.value});
}
</script>
