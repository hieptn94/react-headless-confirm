import React from 'react';

import ConfirmContext, { ConfirmContextValue } from './ConfirmContext';

export default function useConfirm(): ConfirmContextValue {
  return React.useContext(ConfirmContext);
}
