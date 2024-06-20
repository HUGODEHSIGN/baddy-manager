import Radix from '@/client/providers/Radix';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <Radix>{children}</Radix>;
}
