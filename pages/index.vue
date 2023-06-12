<template>
  <div style="background-color: red">
    <div class="min-h-[8rem] w-full max-w-md mx-auto">
      <h1>Getting ready...</h1>

      <label>
        <input type="checkbox" v-model="useNavigateTo" />
        Use <code>navigateTo()</code>
      </label>

      <label>
        <input type="checkbox" v-model="delayMiddleware" />
        Add delay to middleware
      </label>

      <button @click="startPaymentFlow">Start</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useStateMachineStore } from "~/stores/state";

definePageMeta({
  middleware: ["check-allowed-state", "do-something-async"],
  allowedStates: ["idle"],
});

const store = useStateMachineStore();
const { delayMiddleware, useNavigateTo } = toRefs(store.state.context);

function startPaymentFlow() {
  // Sent the init event to the state machine...
  const { send } = useStateMachineStore();

  send("START", {
    delayMiddleware: delayMiddleware.value,
    useNavigateTo: useNavigateTo.value,
  });
}
</script>
