import { mergeMeta } from '~/plugins/navigateOnTransition.client';
import { useStateMachineStore } from '~/stores/state';

/**
 *
 */
export default defineNuxtRouteMiddleware((to, from) => {
  const payment = useStateMachineStore();

  if (to.meta.allowedStates) {
    const allowed = to.meta.allowedStates as string[];
    const currentState = payment.state;

    if (!allowed.includes(currentState.value)) {
      // Merge all state meta nodes.
      const { defaultRoute } = mergeMeta(currentState.meta) as {
        defaultRoute?: RouteLocation;
      };

      if (defaultRoute) {
        return navigateTo(defaultRoute);
      }

      throw new Error(`State "${currentState.value}" is not expected`);
    }
  }
});
