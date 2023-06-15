import { FC } from "react";
import { Grommet, ThemeType, Box, Main } from "grommet";
import { SignUp } from "./pages/SignUp";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { SignIn } from "./pages/SignIn";
import { SignInOrSignUp } from "./pages/SignInOrSignUp";
import { AppBar } from "./components/AppBar";
import { NewWorld } from "./pages/NewWorld";
import { ViewWorld } from "./pages/ViewWorld";
import { ViewCoordinate } from "./pages/ViewCoordinate";
import { AddCoordinate } from "./pages/AddCoordinate";

export interface AppProps {
  name: string;
}

const theme: ThemeType = {
  global: {
    font: {
      family: "Roboto",
      size: "14px",
      height: "20px",
    },
  },
};

export const App: FC<AppProps> = (props) => (
  <Grommet theme={theme} themeMode="dark">
    <Box fill>
      <AppBar name={props.name} />
      <Box direction="row" flex overflow={{ horizontal: "hidden" }}>
        <Box flex align="center" justify="evenly">
          <Main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sign-in-or-up" element={<SignInOrSignUp />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/new-world" element={<NewWorld />} />
              <Route path="/worlds/:worldId" element={<ViewWorld />} />
              <Route
                path="/worlds/:worldId/add_coordinate"
                element={<AddCoordinate />}
              />
              <Route
                path="/worlds/:worldId/coordinates/:coordinateId"
                element={<ViewCoordinate />}
              />
            </Routes>
          </Main>
        </Box>
      </Box>
    </Box>
  </Grommet>
);
