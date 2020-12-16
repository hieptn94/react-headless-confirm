import React from 'react';

import { ConfirmProviderProps, DialogProps } from './types';
import ConfirmContext from './ConfirmContext';

export default function ConfirmProvider<T>({
  dialog,
  children,
}: ConfirmProviderProps<T>) {
  const promiseRef = React.useRef<
    [(value: boolean) => void, (value: boolean) => void]
  >();
  const [isVisible, setIsVisible] = React.useState(false);
  const confirm = React.useCallback(() => {
    setIsVisible(true);
    return new Promise<boolean>((...args) => {
      promiseRef.current = args;
    });
  }, []);

  const handleConfirm = () => {
    setIsVisible(false);
    if (!promiseRef.current) {
      return;
    }
    promiseRef.current[0](true);
  };

  const handleCancel = () => {
    setIsVisible(false);
    if (!promiseRef.current) {
      return;
    }
    promiseRef.current[0](false);
  };

  const contextValue = React.useMemo(() => ({ confirm }), []);

  const DialogComponent = dialog as React.ComponentType<DialogProps<any>>;

  return (
    <>
      <DialogComponent
        isVisible={isVisible}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
      <ConfirmContext.Provider value={contextValue}>
        {children}
      </ConfirmContext.Provider>
    </>
  );
}
