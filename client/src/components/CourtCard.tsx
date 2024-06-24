import { Button } from '@/client/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/client/components/ui/card';
import { useAppContext } from '@/client/providers/AppProvider';
import { type AppDataType } from '@/client/routes/$locationId';
import { createContext, useContext, type PropsWithChildren } from 'react';

// type CourtCardProps = PropsWithChildren & {
//   locationId: string;
//   xata_version: number;
//   name: string | null;
//   xata_createdat: string;
//   xata_updatedat: string;
//   xata_id: string;
//   parties: {
//     courtId: string;
//     xata_version: number;
//     xata_createdat: string;
//     xata_updatedat: string;
//     xata_id: string;
//     users: {
//       partyId: string | null;
//       xata_version: number;
//       name: string | null;
//       xata_createdat: string;
//       xata_updatedat: string;
//       xata_id: string;
//     }[];
//   }[];
// };

type CourtCardProps = PropsWithChildren & AppDataType['courts'][0];

const CourtCardContext = createContext<CourtCardProps | undefined>(undefined);

function useCourtCardContext() {
  const context = useContext(CourtCardContext);
  if (!context) {
    throw new Error('useCourtCardContext must be used within a CourtCard');
  }
  return context;
}

export default function CourtCard(props: CourtCardProps) {
  return (
    <CourtCardContext.Provider value={props}>
      <Card>{props.children}</Card>
    </CourtCardContext.Provider>
  );
}

CourtCard.Heading = function CardHeading() {
  const { name } = useCourtCardContext();
  return (
    <CardHeader>
      <CardTitle>{name}</CardTitle>
    </CardHeader>
  );
};

CourtCard.Parties = function CardParties() {
  const { parties } = useCourtCardContext();

  function renderUsers(
    data: {
      partyId: string | null;
      xata_version: number;
      name: string | null;
      xata_createdat: string;
      xata_updatedat: string;
      xata_id: string;
    }[]
  ) {
    const userArray = data.map(({ xata_id, name }) => (
      <Button
        key={xata_id}
        size="sm">
        {name}
      </Button>
    ));

    for (let i = userArray.length; i < 4; i++) {
      userArray.push(
        <Button
          key={i}
          size="sm"
          disabled>
          Empty
        </Button>
      );
    }

    return userArray;
  }

  return (
    <CardContent className="flex flex-col gap-6">
      {parties.map(({ xata_id, users }, index) => (
        <div
          key={xata_id}
          className="flex flex-col gap-1">
          <Button
            size="sm"
            className="justify-start pointer-events-none">
            {index + 1}
          </Button>
          <div className="grid grid-cols-2 gap-1">{renderUsers(users)}</div>
        </div>
      ))}
    </CardContent>
  );
};

CourtCard.Info = function CardInfo() {
  const { xata_id } = useCourtCardContext();
  const { endGameSession } = useAppContext();
  return (
    <CardFooter className="flex justify-between items-end">
      <div>est: 1 min left</div>
      <Button
        variant="destructive"
        onClick={() => endGameSession(xata_id)}>
        Force End
      </Button>
    </CardFooter>
  );
};
