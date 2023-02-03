import { assign, createMachine } from 'xstate';

function delay(millis = 1000) {
  return new Promise(function(resolve) {
    setTimeout(resolve, millis);
  });
}


/**
 * An Xstate state machine describing the customer facing payment flow.
 *
 * @see https://stately.ai/viz
 */
export const demoMachine = createMachine<Context>(
  {
    id: 'payment',
    initial: 'idle',
    predictableActionArguments: true,

    states: {
      idle: {
        on: {
          INIT: {
            target: 'checkingInitialDetails',
          },
        },
      },

      checkingInitialDetails: {
        invoke: {
          src: (context, event) => {
            return delay(1000)
          },
          onDone: [
            {
              target: 'customerEnteringDetails',
            },
          ],
          onError: [
            {
              target: 'validationFailure',
            },
          ],
        },
        meta: {
          defaultRoute: {
            name: 'check',
            replace: true,
          },
        },
      },

      customerEnteringDetails: {
        on: {
          SUBMITTED_PAYMENT_DETAILS: {
            target: 'processingPayment',
          },
        },
        meta: {
          defaultRoute: {
            name: 'payment',
            replace: true,
          },
        },
      },

      processingPayment: {
        invoke: {
          src: (context, event) => {
            return delay(1000)
          },
          onDone: {
            target: 'paymentCompleted',
            actions: assign({
              paymentIntent: (context, event) => {
                return event.data.paymentIntent;
              },
            }),
          },
          onError: [
            {
              target: 'paymentFailure',
            },
          ],
        },
        meta: {
          defaultRoute: {
            name: 'processing',
            replace: true,
          },
        },
      },

      // Payment details extracted from URL are not valid.
      validationFailure: {
        type: 'final',
        meta: {
          defaultRoute: {
            name: 'error',
            replace: true,
          },
        },
      },

      // An error occured when attempting to process the payment.
      paymentFailure: {
        type: 'final',
        meta: {
          defaultRoute: {
            name: 'error',
            replace: true,
          },
        },
      },

      // The payment was captured.
      paymentCompleted: {
        type: 'final',
        meta: {
          defaultRoute: {
            name: 'complete',
            replace: true,
          },
        },
      },
    },
  },
);
