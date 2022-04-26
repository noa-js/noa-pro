import { createMachine, assign } from 'xstate';
import { useInterpret, useActor } from '@xstate/vue';
import localeConfig from '~/config/locale';
import locales from '@/locales';

const initialContext = {
  locale: localeConfig.default,
};

const STORE = localStorage;

const localeMachine = createMachine<typeof initialContext>(
  {
    id: 'localeMachine',
    initial: 'idle',
    context: initialContext,
    entry: 'changeLocale',
    states: {
      idle: {
        on: {
          CHANGE_LOCALE: { actions: 'changeLocale', target: 'idle' },
        },
      },
    },
  },
  {
    actions: {
      changeLocale: assign((_, e) => {
        const locale = e.payload ?? localeConfig.default;
        STORE.setItem('locale', locale);
        locales.global.locale.value = locale;

        return {
          locale,
        };
      }),
    },
  },
);

const interpreter = useInterpret(localeMachine);

export const useLocale = () => useActor(interpreter);

export default localeMachine;
