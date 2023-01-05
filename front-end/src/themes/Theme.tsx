import { ReactNode } from "react";
import { ThemeProvider } from "styled-components";

interface themeProps {
  children: ReactNode;
}

const fontSizes: any = [14, 18, 20, 96];
fontSizes.body = fontSizes[0];
fontSizes.bodyLarge = fontSizes[1];
fontSizes.bodyExtraLarge = fontSizes[2];
fontSizes.displayExtraLarge = fontSizes[3];

const theme = {
  fontSizes,
  colors: {
    primary: "#256784",
    secondary: "#f98531",
  },
};

export type ThemeType = typeof theme;

export const Theme = ({ children }: themeProps) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
