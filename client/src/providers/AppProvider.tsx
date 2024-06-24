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
          xata_id: string;
          action: string;
        };
        params: Record<'locationId', string>;
        query: unknown;
        headers: unknown;
        response: {
          xata_id: string;
          action: string;
        };
      }>
    | undefined
  >(undefined);

  const connected = socket.current?.ws.readyState === socket.current?.ws.OPEN;
  const [isConnected, setIsConnected] = useState(connected);
  const [appState, setAppState] = useState(initialState);

  type actionLookupType = Record<string, (xata_id: string) => void>;

  // ---place update context logic here ---
  const actionLookup: actionLookupType = {
    end_court_session: function (xata_id: string) {
      const courtIndex = appState.courts.findIndex(
        (court) => court.xata_id === xata_id
      );
      setAppState((prev) => {
        return {
          ...prev,
          courts: prev.courts.map((court, index) => {
            if (index === courtIndex) {
              return {
                ...court,
                parties: court.parties.slice(1),
              };
            }
            return court;
          }),
        };
      });
    },
  };

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

    function onEvent({ data }: { data: { xata_id: string; action: string } }) {
      const { xata_id, action } = data;
      actionLookup[action](xata_id);
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
    const action = 'end_court_session';
    actionLookup[action](xata_id);
    socket.current?.send({ xata_id, action });
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
