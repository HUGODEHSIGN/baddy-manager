import '@tamagui/core/reset.css';
import { TamaguiProvider, Theme } from 'tamagui'; // or 'tamagui'
import config from './tamagui.config.ts';

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <TamaguiProvider config={config}>
      <Theme name="red">{children}</Theme>
    </TamaguiProvider>
  );
}
