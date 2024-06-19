import config from '@/tamagui.config.ts';
import '@tamagui/core/reset.css';
import { TamaguiProvider, Theme } from 'tamagui'; // or 'tamagui'

export default function Tamagui({ children }: { children: React.ReactNode }) {
  return (
    <TamaguiProvider config={config}>
      <Theme name="red">{children}</Theme>
    </TamaguiProvider>
  );
}
