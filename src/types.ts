import React from 'react';

export type ConfirmDialogProps<T = any> = T & {
  isVisible?: boolean;
  onConfirm: VoidFunction;
};

export type ConfirmProviderProps<T = any> = React.PropsWithChildren<{
  dialog: React.ComponentType<ConfirmDialogProps<T>>;
}>;

export interface ConfirmContextValue {
  confirm: () => Promise<boolean>;
}
