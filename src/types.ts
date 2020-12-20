export interface ConfirmFunctionArgs {
  title?: string;
  content?: string;
  confirmText?: string;
  cancelText?: string;
  [prop: string]: any;
}
export interface DialogProps extends ConfirmFunctionArgs {
  isOpen?: boolean;
  onConfirm: VoidFunction;
  onCancel: VoidFunction;
}

export interface ConfirmFunction {
  (args?: ConfirmFunctionArgs): Promise<boolean>;
}
