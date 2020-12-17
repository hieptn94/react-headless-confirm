import React from 'react';

import { ConfirmContextValue } from './types';
import ConfirmContext from './ConfirmContext';

export default function useConfirm(): ConfirmContextValue {
  return React.useContext(ConfirmContext);
}
