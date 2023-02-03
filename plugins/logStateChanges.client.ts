import { useStateMachineStore } from '~/stores/state';

/**
 * Log state machine transition changes.
 */
export default defineNuxtPlugin((nuxtApp) => {
  const { service } = useStateMachineStore();

  // Register state machine transition listener...
  service.onTransition(async (state, event) => {
    console.info(`Transition: ${event.type}`, event);

    if (state.changed) {
      console.info(`State has changed: ${state.value}`, state);
    }
  });
});
