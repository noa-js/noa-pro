import { getCurrentUser } from '@/services/user';
import { logout } from '@/utils/user';
import { assign, createMachine } from 'xstate';
import { useActor } from '@xstate/vue';
import { useInterpret } from '@xstate/vue';

const initialContext = {
  currentUser: {
    username: '',
  },
};

const initialStateMachine = createMachine<typeof initialContext>(
  {
    id: 'initialState',
    context: initialContext,
    initial: 'none',
    states: {
      none: {
        on: {
          GET: 'getInitialState',
        },
      },
      getInitialState: {
        invoke: {
          id: 'getInitialState',
          src: 'getInitialState',
          onDone: {
            target: 'authenticated',
            actions: 'saveData',
          },
          onError: {
            target: 'loggedOut',
            actions: 'logout',
          },
        },
      },
      authenticated: {},
      loggedOut: {},
    },
  },
  {
    actions: {
      saveData: assign({
        currentUser: (_, e) => e.data,
      }),
      logout,
    },
    services: {
      getInitialState: async () => {
        return getCurrentUser();
      },
    },
  },
);

const interpreter = useInterpret(initialStateMachine);

export const useInitialStateMachine = () => useActor(interpreter);

export default initialStateMachine;
