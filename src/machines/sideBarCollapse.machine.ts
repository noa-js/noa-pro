import { createMachine } from 'xstate';
import { useActor, useInterpret } from '@xstate/vue';

const initialContext = {
  collapse: false,
};

const KEY = 'collapsed';
const STORAGE = localStorage;

const sidebarCollapseMachine = createMachine<typeof initialContext>(
  {
    id: 'routeMenuCollapse',
    context: initialContext,
    initial: 'none',
    states: {
      none: {
        always: [{ target: 'isCollapsed', cond: 'isCollapsed' }, { target: 'notCollapsed' }],
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

const interpreter = useInterpret(sidebarCollapseMachine);

export const useSideBarCollapse = () => useActor(interpreter);

export default sidebarCollapseMachine;
