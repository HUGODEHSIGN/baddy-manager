import { useEffect } from 'react';
import { Button } from 'tamagui';
import './App.css';
import Provider from './Provider';

function App() {
  useEffect(() => {
    console.log('test');
    async function getData() {
      const res = await fetch('/api/users');
      const data = await res.json();
      console.log(data);
    }
    getData();
  }, []);
  return (
    <>
      <Provider>
        <Button>test</Button>
      </Provider>
    </>
  );
}

export default App;
