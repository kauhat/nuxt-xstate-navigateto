<template>
  <div style="background-color: yellow">
    <p>
      Please submit your payment to continue. <i>Imagine some form inputs here!</i>
    </p>


    <button @click="submitPayment">Submit</button>
  </div>
</template>

<script setup lang="ts">
import { useStateMachineStore } from '~/stores/state';

definePageMeta({
  middleware: ['check-allowed-state', 'do-something-async'],
  allowedStates: ['customerEnteringDetails'],
});

function submitPayment() {
  // Sent the init event to the state machine...
  const { send } = useStateMachineStore();

  send('SUBMITTED_PAYMENT_DETAILS', {});
}
</script>
