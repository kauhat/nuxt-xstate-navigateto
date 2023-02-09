import { callWithNuxt, navigateTo } from '#app';
import { RouteLocation } from 'vue-router';
import { useStateMachineStore } from '~/stores/state';

/**
 * Navigate to a different page when the payment flow state machine changes.
 */
export default defineNuxtPlugin((nuxtApp) => {
  const { service } = useStateMachineStore();
  const router = useRouter();

  // Register state machine transition listener...
  service.onTransition(async (state, event) => {
    if (!state.changed) {
      return;
    }

    // Merge all state meta nodes.
    const meta = mergeMeta(state.meta) as {
      defaultRoute?: RouteLocation;
    };

    // Check if new state has a default route.
    const { defaultRoute } = meta;

    if (defaultRoute) {
      console.log('Attempting to navigate to new route...', { defaultRoute });

      // return router.replace(defaultRoute);

      // Avoid calling navigateTo when middleware is running.
      // console.log(await waitForMiddleware());

      // Check if current route is same as intended.
      const route = useRoute();

      console.debug('Checking route.');

      if (route.name != defaultRoute.name) {
        console.warn(
          `Bad route: ${String(route.name)}, expected: ${String(
            defaultRoute.name
          )}`
        );

        console.info('Navigating...');
        return navigateTo(defaultRoute);
      }

      // Here's some various ways I tried to change the route..
      // return await Promise.any([
      //   // Basic navigateTo()
      //   navigateTo(defaultRoute),

      //   // Internal Nuxt helper
      //   callWithNuxt(nuxtApp, navigateTo, [defaultRoute]),

      //   // Vue nextTick()
      //   nextTick(async () => {
      //     return await navigateTo(defaultRoute);
      //   }),

      //   // Short delay (can work sometimes but is not reliable)
      //   new Promise((resolve) =>
      //     setTimeout(
      //       () => {
      //         navigateTo(defaultRoute);
      //         resolve()
      //       }
      //       , 1000)
      //   ),
      // ]);
    }
  });
});

/**
 * @see https://xstate.js.org/docs/guides/states.html#state-meta-data
 */
export function mergeMeta(meta) {
  return Object.keys(meta).reduce((acc, key) => {
    const value = meta[key];

    // Assuming each meta value is an object
    Object.assign(acc, value);

    return acc;
  }, {});
}

/**
 * Copied from internal Nuxt helper.
 *
 * @see https://github.com/nuxt/framework/blob/5ac9d85a497d6003cbe0c5bbf0e16ef6ea69b46a/packages/nuxt/src/app/composables/router.ts#L57
 */
const isProcessingMiddleware = () => {
  try {
    if (useNuxtApp()._processingMiddleware) {
      return true;
    }
  } catch {
    // Within an async middleware
    return true;
  }
  return false;
};

/**
 * Wait for Nuxt middlware to complete.
 */
function waitForMiddleware(delay = 200): Promise<void> {
  return new Promise((resolve, reject) => {
    console.debug('Waiting for middleware...');

    if (!isProcessingMiddleware()) {
      console.debug('Middleware finished.');

      return resolve();
    }

    //
    return new Promise(function (resolve) {
      console.debug('Waiting...');

      setTimeout(resolve, delay);
    }).then(() => waitForMiddleware(delay));
  });
}
