import { signin } from '@/services/user';
import { assign, createMachine } from 'xstate';
import router from '@/router';
import { setToken } from '@/utils/token';

const initialContext = {
  username: '',
  password: '',
};

type Context = typeof initialContext;

const signinMachine = createMachine<Context>(
  {
    id: 'signin',
    initial: 'loggedOut',
    context: initialContext,
    states: {
      loggedOut: {
        on: {
          signin: [
            {
              target: 'pending',
              actions: 'saveData',
            },
          ],
        },
      },
      pending: {
        invoke: {
          id: 'signin',
          src: 'signin',
          onDone: {
            target: 'loggedIn',
            actions: 'saveToken',
          },
          onError: {
            target: 'loggedOut',
          },
        },
      },
      loggedIn: {},
    },
  },
  {
    actions: {
      saveData: assign({
        username: (_, e) => e.username,
        password: (_, e) => e.password,
      }),
      saveToken: (_, e) => {
        setToken(e.data.token);
        router.push('/');
      },
    },
    services: {
      signin: (ctx) => {
        const { username, password } = ctx;
        return signin({ username, password });
      },
    },
  },
);

export default signinMachine;
