import React from 'react';

import {
  ConfirmProviderProps,
  DialogProps,
  ConfirmFunctionArgs,
  ConfirmFunction,
} from './types';
import ConfirmContext from './ConfirmContext';

export default function ConfirmProvider({
  dialog,
  children,
}: ConfirmProviderProps) {
  const promiseRef = React.useRef<
    [(value: boolean) => void, (value: boolean) => void]
  >();
  const [dialogProps, setDialogProps] = React.useState({
    isOpen: false,
  });
  const confirm = React.useCallback<ConfirmFunction>(
    (args?: ConfirmFunctionArgs) => {
      setDialogProps(dialogProps => ({
        ...dialogProps,
        ...args,
        isOpen: true,
      }));
      return new Promise<boolean>((...args) => {
        promiseRef.current = args;
      });
    },
    []
  );

  const handleConfirm = () => {
    setDialogProps({ isOpen: false });
    if (!promiseRef.current) {
      return;
    }
    promiseRef.current[0](true);
  };

  const handleCancel = () => {
    setDialogProps({ isOpen: false });
    if (!promiseRef.current) {
      return;
    }
    promiseRef.current[0](false);
  };

  const contextValue = React.useMemo(() => ({ confirm }), [confirm]);

  const DialogComponent = dialog as React.ComponentType<DialogProps>;

  const { isOpen } = dialogProps;

  return (
    <>
      <DialogComponent
        {...dialogProps}
        isOpen={isOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
      <ConfirmContext.Provider value={contextValue}>
        {children}
      </ConfirmContext.Provider>
    </>
  );
}
