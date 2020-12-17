# react-confirmation

Promise based confirmation API for React.

## Example

Build the library:
> yarn install && yarn build

Run example:
> cd example && yarn install && yarn start

## Usage

```js
import { ConfirmProvider, useConfirm } from '@reactvn/react-confirmation';

// ConfirmProvider must be placed on top of your components.
function App() {
  return (
    <ConfirmProvider dialog={YourConfirmDialog}>
      <Example />
    </ConfirmProvider>
  );
}

function Example() {
  const { confirm } = useConfirm();
  const handleConfirm = async () => {
    const isConfirmed = await confirm({
      title: 'Your Title',
      content: 'Your Content',
      confirmText: 'Your Confirm Text',
      cancelText: 'Your Cancel Text',
    });

    // Do something when the user confirm or cancel.
    console.log(isConfirmed);
  }
  return (
    <button onClick={handleConfirm}>Open Confirm</button>
  );
}
```

## License

[MIT](LICENSE)
