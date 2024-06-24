import { client } from '@/client/eden';
import type { AppDataType } from '@/client/routes/$locationId';
import type { EdenWS } from '@elysiajs/eden/treaty';
import { useParams } from '@tanstack/react-router';
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type PropsWithChildren,
} from 'react';

// --- initialize AppContext ---
type AppContextType = {
  appState: AppDataType;
  endGameSession: (xata_id: string) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

// --- useAppContext Custom Hook. Import this outside to use AppContext ---

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within a AppProvider');
  }
  return context;
}

// --- useUpdateCourts Custom Hook ---

function useUpdateCourts(initialState: AppDataType) {
  const { locationId } = useParams({ strict: false });

  const socket = useRef<
    | EdenWS<{
        body: {
          message: string;
        };
        params: Record<'locationId', string>;
        query: unknown;
        headers: unknown;
        response: string;
      }>
    | undefined
  >(undefined);

  const connected = socket.current?.ws.readyState === socket.current?.ws.OPEN;
  const [isConnected, setIsConnected] = useState(connected);
  const [appState, _setAppState] = useState(initialState);

  // ---place update context logic here ---

  useEffect(() => {
    if (locationId) {
      socket.current = client.socket({ locationId }).subscribe();
    }

    function onConnect() {
      console.log('connected');
      setIsConnected(true);
    }

    function onDisconnect() {
      console.log('disconnected');
      setIsConnected(false);
    }

    function onEvent(value) {
      console.log(value);
    }

    socket.current?.on('open', onConnect);
    socket.current?.on('close', onDisconnect);
    socket.current?.on('message', onEvent);

    return () => {
      socket.current?.off('open', onConnect);
      socket.current?.off('close', onDisconnect);
      socket.current?.off('message', onEvent);
    };
  }, []);

  function endGameSession(xata_id: string) {
    console.log(xata_id);
    socket.current?.send({ message: xata_id });
  }

  return { appState, endGameSession };
}

// --- AppProvider Component ---

type AppProviderProps = PropsWithChildren & {
  initialState: AppDataType;
};

export default function AppProvider({
  children,
  initialState,
}: AppProviderProps) {
  const hookReturn = useUpdateCourts(initialState);

  return (
    <AppContext.Provider value={hookReturn}>{children}</AppContext.Provider>
  );
}
