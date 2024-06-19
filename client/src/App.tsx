import Providers from '@/providers/index';
import { Button, H1, Input } from 'tamagui';

import { socket } from '@/eden/socket';
import type { App } from '@/server/index';
import { useEffect, useState } from 'react';

function App() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }
    function onDisconnect() {
      setIsConnected(false);
    }
    function onMessage(message: string) {
      console.log(message);
    }

    socket.on('open', onConnect);
    socket.on('close', onDisconnect);
    socket.on('message', ({ data }) => onMessage(data));

    return () => {
      socket.off('open', onConnect);
      socket.off('close', onDisconnect);
      socket.off('message', ({ data }) => onMessage(data));
    };
  }, []);

  return (
    <>
      <Providers>
        <Input />
        <H1>{isConnected.toString()}</H1>
        <Button onMouseUp={() => socket.send({ message: 'hi!' })}>test</Button>
      </Providers>
    </>
  );
}

export default App;
