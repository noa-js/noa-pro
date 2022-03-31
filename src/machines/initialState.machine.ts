import { getCurrentUser } from '@/services/user';
import { logout } from '@/utils/user';
import { assign, createMachine } from 'xstate';

const initialContext = {
  currentUser: {
    username: '',
  },
};

type Context = typeof initialContext;

const initialStateMachine = createMachine<Context>(
  {
    id: 'initialState',
    context: initialContext,
    initial: 'getInitialState',
    states: {
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
      logout: logout,
    },
    services: {
      getInitialState: async () => {
        return getCurrentUser();
      },
    },
  },
);

export default initialStateMachine;
