import React from 'react';

import { ConfirmContextValue } from './types';

const ConfirmContext: React.Context<ConfirmContextValue> = React.createContext({
  confirm: (_: any) => Promise.resolve<boolean>(false),
});

export default ConfirmContext;
