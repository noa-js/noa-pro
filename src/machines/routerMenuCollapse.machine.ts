import { createMachine } from 'xstate';

const initialContext = {
  collapse: false,
};

type Context = typeof initialContext;

const initialStateMachine = createMachine<Context>(
  {
    id: 'initialState',
    context: initialContext,
    initial: 'notCollapsed',
    states: {
      isCollapsed: {
        on: {
          CLICK: 'notCollapsed',
        },
      },
      notCollapsed: {
        on: {
          CLICK: 'isCollapsed',
        },
      },
    },
  },
  {},
);

export default initialStateMachine;
