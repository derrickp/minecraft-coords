import { User } from "~User";
import React, { useState } from "react";
import { Grommet, ThemeType, Heading, Button, Box, Sidebar } from "grommet";
import { Menu } from "grommet-icons";
import { SignUp } from "~pages/SignUp";
import { Switch, Route, Redirect } from "react-router-dom";
import { Home } from "~pages/Home";
import { SignIn } from "~pages/SignIn";
import { SignInOrSignUp } from "~pages/SignInOrSignUp";
import { AppBar } from "~components/AppBar";
import { SidebarNav } from "~components/SidebarNav";

export interface AppProps {
  user?: User;
  signUpComplete: (email: string, password: string) => void;
  signInComplete: (email: string, password: string) => void;
  signOut: () => void;
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

export const App = (props: AppProps): JSX.Element => {
  const [showSideBar, setShowSideBar] = useState(false);
  const { user } = props;

  const handleSignOut = () => {
    setShowSideBar(false);
    props.signOut();
  };

  return (
    <Grommet theme={theme} themeMode="dark">
      <Box fill>
        <AppBar>
          <Heading level="3" margin="none">
            Minecraft Coordinate Keeper
          </Heading>
          {!!user && (
            <Button
              icon={<Menu />}
              onClick={() => {
                setShowSideBar(!showSideBar);
              }}
            />
          )}
        </AppBar>
        <Box direction="row" flex overflow={{ horizontal: "hidden" }}>
          <Box flex align="center" justify="center">
            <Switch>
              <Route exact path="/">
                {user ? <Home user={user} /> : <Redirect to="/sign-in-or-up" />}
              </Route>
              <Route path="/sign-in-or-up">
                {user ? <Redirect to="/" /> : <SignInOrSignUp />}
              </Route>
              <Route path="/sign-up">
                {user ? (
                  <Redirect to="/" />
                ) : (
                  <SignUp signUpComplete={props.signUpComplete} />
                )}
              </Route>
              <Route path="/sign-in">
                {user ? (
                  <Redirect to="/" />
                ) : (
                  <SignIn signInComplete={props.signInComplete} />
                )}
              </Route>
            </Switch>
          </Box>
          {showSideBar && (
            <Box direction="row">
              <Sidebar background="accent-1">
                <SidebarNav signOut={handleSignOut}></SidebarNav>
              </Sidebar>
            </Box>
          )}
        </Box>
      </Box>
    </Grommet>
  );
};
