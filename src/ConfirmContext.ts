import React from 'react';

import { ConfirmFunction } from './types';

export type ConfirmContextValue = {
  confirm: ConfirmFunction;
  close: VoidFunction;
};

const ConfirmContext: React.Context<ConfirmContextValue> = React.createContext({
  confirm: (_: any) => Promise.resolve<boolean>(false),
  close: () => {},
});

export default ConfirmContext;
