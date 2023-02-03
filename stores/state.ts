import { acceptHMRUpdate, defineStore } from 'pinia';
import useMachineStore from 'pinia-xstate';

import { demoMachine } from '../demoMachine';

/**
 * Pinia store...
 */
export const useStateMachineStore = defineStore(
  'payment',
  useMachineStore(demoMachine)
);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStateMachineStore, import.meta.hot));
}
