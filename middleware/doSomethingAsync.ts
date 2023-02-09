import { useStateMachineStore } from "~~/stores/state";

/**
 *
 */
export default defineNuxtRouteMiddleware(async (to, from) => {
  const { state } = useStateMachineStore()

  if (state.context.delayMiddleware) {
    console.info("Pretending to do something while the page loads...")

    await new Promise(function (resolve) {
      setTimeout(resolve, 1000);
    });
  }
});
