import { Button, H1, Input } from 'tamagui';

import { socket } from '@/eden/socket';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

export default function Root() {
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
      <Input />
      <H1>{isConnected.toString()}</H1>
      <Button onMouseUp={() => socket.send({ message: 'hi!' })}>test</Button>
      <Outlet />
    </>
  );
}
