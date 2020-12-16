import React from 'react';

import { ConfirmContextValue } from './types';

const ConfirmContext: React.Context<ConfirmContextValue> = React.createContext({
  confirm: () => Promise.resolve<boolean>(true),
});

export default ConfirmContext;
