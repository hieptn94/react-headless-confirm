import React from 'react';

import { ConfirmProviderProps } from './types';
import ConfirmContext from './ConfirmContext';

export default function ConfirmProvider({
  dialog: DialogComponent,
  children,
}: ConfirmProviderProps) {
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

  const contextValue = React.useMemo(() => ({ confirm }), []);
  return (
    <>
      <DialogComponent isVisible={isVisible} onConfirm={handleConfirm} />
      <ConfirmContext.Provider value={contextValue}>
        {children}
      </ConfirmContext.Provider>
    </>
  );
}
