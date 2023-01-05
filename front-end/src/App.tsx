import { Router } from "routes";
import { GlobalStyles, Theme } from "themes";

export const App = () => {
  return (
    <Theme>
      <GlobalStyles/>
      <Router />
    </Theme>
  );
};
