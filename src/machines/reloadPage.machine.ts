import { useActor, useInterpret } from '@xstate/vue';
import { createMachine } from 'xstate';

const initialContext = {
  toggle: true,
};

const reloadPageMachine = createMachine<typeof initialContext>({
  context: initialContext,
  id: 'reloadPage',
  initial: 'show',
  states: {
    show: {
      on: {
        toggle: 'hide',
      },
    },
    hide: {
      after: {
        0: { target: 'show' },
      },
    },
  },
});

const interpreter = useInterpret(reloadPageMachine);

export const useReloadPage = () => useActor(interpreter);

export default reloadPageMachine;
