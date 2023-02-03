/**
 *
 */
export default defineNuxtRouteMiddleware(async (to, from) => {
    await new Promise(function(resolve) {
      setTimeout(resolve, 1000);
    });

    console.log("Completed")
});
