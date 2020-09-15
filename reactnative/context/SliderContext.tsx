import * as React from 'react';

export type ToggleAble = {
  open: boolean;
};

export type ToggleContext = {
  context: ToggleAble;
  setContext: (context: ToggleAble) => void;
};

const temp: ToggleContext = {
  context: {open: false},
  setContext: (context) => {},
};

const SliderContext = React.createContext<ToggleContext>(temp);

export default SliderContext;
