import React from 'react';
import { renderHook } from '@testing-library/react-hooks';

import ConfirmContext from './ConfirmContext';
import useConfirm from './useConfirm';

it('should get context value', () => {
  const contextValue = {
    confirm: () => Promise.resolve<boolean>(false),
  };
  const { result } = renderHook(useConfirm, {
    wrapper: ({ children }) => (
      <ConfirmContext.Provider value={contextValue}>
        {children}
      </ConfirmContext.Provider>
    ),
  });

  expect(result.current).toBe(contextValue);
});
