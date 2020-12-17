import React from 'react';

export type DialogProps = any & {
  isOpen?: boolean;
  onConfirm: VoidFunction;
  onCancel: VoidFunction;
};

export type ConfirmProviderProps = React.PropsWithChildren<{
  dialog: React.ComponentType<DialogProps>;
}>;

export interface ConfirmFunctionArgs {
  title?: string;
  content?: string;
  confirmText?: string;
  cancelText?: string;
}

export type ConfirmFunction = (args?: ConfirmFunctionArgs) => Promise<boolean>;
export interface ConfirmContextValue {
  confirm: ConfirmFunction;
}
