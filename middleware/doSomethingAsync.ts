/**
 *
 */
export default defineNuxtRouteMiddleware(async (to, from) => {
    await new Promise(function(resolve) {
      setTimeout(resolve, 500);
    });

    console.log("Completed")
});
