import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { DialogProps } from './types';
import ConfirmContext from './ConfirmContext';
import ConfirmProvider from './ConfirmProvider';

const ConfirmDialog = ({
  isVisible,
  onConfirm,
  onCancel,
}: DialogProps<any>) => (
  <>
    ConfirmDialog-{isVisible ? 'visible' : 'invisible'}
    <button onClick={onConfirm} data-testid="btn-confirm" />
    <button onClick={onCancel} data-testid="btn-cancel" />
  </>
);

it('should render invisible confirm dialog', () => {
  render(<ConfirmProvider dialog={ConfirmDialog} />);

  expect(screen.queryByText(/ConfirmDialog-invisible/)).toBeInTheDocument();
});

it('should get user confirmation', async () => {
  const TestComponent = () => {
    const { confirm } = React.useContext(ConfirmContext);
    const [isConfirmed, setConfirmed] = React.useState(false);
    const handleConfirm = async () => {
      const result = await confirm();
      setConfirmed(result);
    };
    return (
      <>
        Test-{isConfirmed ? 'isConfirmed' : 'isNotConfirmed'}
        <button onClick={handleConfirm} data-testid="btn-open-confirm" />
      </>
    );
  };

  render(
    <ConfirmProvider dialog={ConfirmDialog}>
      <TestComponent />
    </ConfirmProvider>
  );

  expect(screen.queryByText(/Test-isNotConfirmed/)).toBeInTheDocument();

  fireEvent.click(screen.getByTestId('btn-open-confirm'));

  expect(screen.queryByText(/ConfirmDialog-visible/)).toBeInTheDocument();

  fireEvent.click(screen.getByTestId('btn-confirm'));

  expect(screen.queryByText(/ConfirmDialog-invisible/)).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.queryByText(/Test-isConfirmed/)).toBeInTheDocument();
  });
});

it('should get user cancellation', async () => {
  const TestComponent = () => {
    const { confirm } = React.useContext(ConfirmContext);
    const [isCancelled, setIsCancelled] = React.useState(false);
    const handleConfirm = async () => {
      const result = await confirm();
      setIsCancelled(!result);
    };
    return (
      <>
        Test-{isCancelled ? 'isCancelled' : 'isNotCancelled'}
        <button onClick={handleConfirm} data-testid="btn-open-confirm" />
      </>
    );
  };

  render(
    <ConfirmProvider dialog={ConfirmDialog}>
      <TestComponent />
    </ConfirmProvider>
  );

  expect(screen.queryByText(/Test-isNotCancelled/)).toBeInTheDocument();

  fireEvent.click(screen.getByTestId('btn-open-confirm'));

  expect(screen.queryByText(/ConfirmDialog-visible/)).toBeInTheDocument();

  fireEvent.click(screen.getByTestId('btn-cancel'));

  expect(screen.queryByText(/ConfirmDialog-invisible/)).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.queryByText(/Test-isCancelled/)).toBeInTheDocument();
  });
});
