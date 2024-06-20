import { Theme, ThemeProps } from '@radix-ui/themes';

const themeConfig: ThemeProps = {
  // --- Colors ---
  accentColor: 'jade',
  grayColor: 'sage',
  panelBackground: 'translucent',

  // --- Others ---
  scaling: '110%',
  radius: 'full',
};

export default function Radix({ children }: { children: React.ReactNode }) {
  return <Theme {...themeConfig}>{children}</Theme>;
}
