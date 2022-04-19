import { createMachine } from 'xstate';

const initialContext = {
  collapse: false,
};

type Context = typeof initialContext;

const KEY = 'collapsed';
const STORAGE = localStorage;

const initialStateMachine = createMachine<Context>(
  {
    id: 'initialState',
    context: initialContext,
    initial: 'none',
    states: {
      none: {
        on: {
          '': [{ target: 'isCollapsed', cond: 'isCollapsed' }, { target: 'notCollapsed' }],
        },
      },
      isCollapsed: {
        on: {
          CLICK: {
            target: 'notCollapsed',
            actions: () => {
              STORAGE.setItem(KEY, 'false');
            },
          },
        },
      },
      notCollapsed: {
        on: {
          CLICK: {
            target: 'isCollapsed',
            actions: () => {
              STORAGE.setItem(KEY, 'true');
            },
          },
        },
      },
    },
  },
  {
    guards: {
      isCollapsed: () => STORAGE.getItem(KEY) === 'true',
    },
  },
);

export default initialStateMachine;
