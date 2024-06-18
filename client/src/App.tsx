import { Button } from 'tamagui';
import './App.css';
import Provider from './Provider';

function App() {
  return (
    <>
      <Provider>
        <Button>test</Button>
      </Provider>
    </>
  );
}

export default App;
