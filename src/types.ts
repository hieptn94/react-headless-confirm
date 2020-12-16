import React from 'react';

export type DialogProps<CustomDialogProps> = CustomDialogProps & {
  isVisible?: boolean;
  onConfirm: VoidFunction;
  onCancel: VoidFunction;
};

export type ConfirmProviderProps<T> = React.PropsWithChildren<{
  dialog: React.ComponentType<DialogProps<T>>;
}>;

export interface ConfirmContextValue {
  confirm: () => Promise<boolean>;
}
