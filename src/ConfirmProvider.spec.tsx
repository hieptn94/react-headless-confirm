import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { ConfirmDialogProps } from './types';
import ConfirmContext from './ConfirmContext';
import ConfirmProvider from './ConfirmProvider';

const ConfirmDialog = ({ isVisible, onConfirm }: ConfirmDialogProps) => (
  <>
    ConfirmDialog-{isVisible ? 'visible' : 'invisible'}
    <button onClick={onConfirm} data-testid="btn-confirm" />
  </>
);

it('should render invisible confirm dialog', () => {
  render(<ConfirmProvider dialog={ConfirmDialog} />);

  expect(screen.queryByText(/ConfirmDialog-invisible/)).toBeInTheDocument();
});

const TestComponent = () => {
  const { confirm } = React.useContext(ConfirmContext);
  const [isConfirmed, setConfirmed] = React.useState(false);
  const handleConfirm = async () => {
    const result = await confirm();
    setConfirmed(result);
  };
  return (
    <>
      Test-{isConfirmed ? 'confirmed' : 'notConfirmed'}
      <button onClick={handleConfirm} data-testid="btn-open-confirm" />
    </>
  );
};

it('should get user confirmation', async () => {
  render(
    <ConfirmProvider dialog={ConfirmDialog}>
      <TestComponent />
    </ConfirmProvider>
  );

  expect(screen.queryByText(/Test-notConfirmed/)).toBeInTheDocument();

  fireEvent.click(screen.getByTestId('btn-open-confirm'));

  expect(screen.queryByText(/ConfirmDialog-visible/)).toBeInTheDocument();

  fireEvent.click(screen.getByTestId('btn-confirm'));

  expect(screen.queryByText(/ConfirmDialog-invisible/)).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.queryByText(/Test-confirmed/)).toBeInTheDocument();
  });
});
