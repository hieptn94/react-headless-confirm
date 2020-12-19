import React from 'react';

import { ConfirmFunction } from './types';

export type ConfirmContextValue = {
  confirm: ConfirmFunction;
};

const ConfirmContext: React.Context<ConfirmContextValue> = React.createContext({
  confirm: (_: any) => Promise.resolve<boolean>(false),
});

export default ConfirmContext;
