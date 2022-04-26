import { assign, createMachine } from 'xstate';
import router from '@/router';
import locales from '@/locales';
import { useActor, useInterpret } from '@xstate/vue';

const t = locales.global.t;

type Option = {
  value: string;
  label: string;
};

const initialContext = {
  options: [] as Option[],
  searchSelected: '',
};

const headerSearchMachine = createMachine<typeof initialContext>(
  {
    id: 'headerSearchMachine',
    initial: 'idle',
    context: initialContext,
    states: {
      idle: {
        on: {
          SEARCH: { actions: 'search' },
          GOTO: { actions: 'goto' },
          FOCUS: { actions: 'init' },
        },
      },
    },
  },
  {
    actions: {
      init: assign(() => {
        return {
          options: [],
          searchSelected: '',
        };
      }),
      search: assign((_, e) => {
        const { searchValue } = e.payload;

        if (searchValue) {
          const options = router
            .getRoutes()
            .filter(
              (route) =>
                route.name !== undefined &&
                !t(`page-${route.name as string}`).includes(route.name as string) &&
                t(`page-${route.name as string}`)
                  .toLowerCase()
                  .includes(searchValue.toLocaleLowerCase()),
            )
            .map((route) => ({
              label: t(`page-${route.name as string}`),
              value: route.name as string,
            }));

          return { options };
        } else {
          return { options: [] };
        }
      }),
      goto: (_, e) => {
        const { name } = e.payload;
        router.push({ name });
      },
    },
  },
);

const interpreter = useInterpret(headerSearchMachine);
export const useHeaderSearch = () => useActor(interpreter);
export default headerSearchMachine;
