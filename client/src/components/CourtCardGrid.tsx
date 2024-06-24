import CourtCard from '@/client/components/CourtCard';
import { useAppContext } from '@/client/providers/AppProvider';

export default function CourtCardGrid() {
  const { appState } = useAppContext();

  return (
    <div className="grid grid-cols-1">
      {appState?.courts.map((data) => (
        <CourtCard
          key={data.xata_id}
          {...data}>
          <CourtCard.Heading />
          <CourtCard.Parties />
          <CourtCard.Info />
        </CourtCard>
      ))}
    </div>
  );
}
