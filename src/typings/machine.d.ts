declare namespace Machine {
  type State = Ref<StateFrom<AnyStateMachine>>;
  type Send = Prop<AnyInterpreter, 'send'>;
}
