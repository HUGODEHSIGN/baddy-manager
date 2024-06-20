import { socket } from '@/eden/socket';
import { Button } from '@radix-ui/themes';
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
    socket.on('message', ({ data }: { data: string }) => onMessage(data));

    return () => {
      socket.off('open', onConnect);
      socket.off('close', onDisconnect);
      socket.off('message', ({ data }: { data: string }) => onMessage(data));
    };
  }, []);

  return (
    <>
      <h1>{isConnected.toString()}</h1>
      <Button onClick={() => socket.send({ message: 'hi!' })}>test</Button>
      <Outlet />
    </>
  );
}
