import { Button } from '@chakra-ui/react';
import * as React from 'react';
import { useConfirm } from '..';

export default function Demo() {
  const { confirm } = useConfirm();
  const handleConfirm = async () => {
    const isConfirmed = await confirm({
      title: 'Confirm',
      content: 'Content',
      confirmText: 'Confirm',
      cancelText: 'Cancel',
    });
    console.log(isConfirmed);
  };
  return <Button onClick={handleConfirm}>Confirm</Button>;
}
