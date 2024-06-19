import Tamagui from '@/providers/Tamagui';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <Tamagui>{children}</Tamagui>;
}
