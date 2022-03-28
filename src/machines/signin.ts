import { signin } from '@/services/user';
import { assign, createMachine } from 'xstate';
import router from '@/router';

type FormValue = {
  username: string;
  password: string;
};

const initialContext: FormValue = {
  username: '',
  password: '',
};

const signinMachine = createMachine<FormValue>(
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
        localStorage.setItem('token', e.data.token);
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
