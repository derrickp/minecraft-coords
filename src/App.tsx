import { MaybeUser, buildUser } from "./User";
import React, { useState, useEffect } from "react";
import {
  Grommet,
  ThemeType,
  Heading,
  Button,
  Box,
  Sidebar,
  Main,
} from "grommet";
import { Menu } from "grommet-icons";
import { SignUp } from "./pages/SignUp";
import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { SignIn } from "./pages/SignIn";
import { SignInOrSignUp } from "./pages/SignInOrSignUp";
import { AppBar } from "./components/AppBar";
import { SidebarNav } from "./components/SidebarNav";
import { AuthInfo } from "./security/AuthInfo";
import {
  subscribeToUserChanges,
  signOut,
  signIn,
  signUp,
} from "./security/authentication";
import {
  persistCurrentUserIfNotPersisted,
  getCurrentPersistedInfo,
} from "./firebase_data/users";
import { NewWorld } from "./pages/NewWorld";
import { subscribeToWorldChanges } from "./firebase_data/worlds";
import { Handle } from "./Handle";
import { World } from "./minecraft/World";
import { PersistedInfo } from "./firebase_data/PersistedInfo";
import { ViewWorld } from "./pages/ViewWorld";
import { ViewCoordinate } from "./pages/ViewCoordinate";

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

export const App = (props: AppProps): JSX.Element => {
  const [showSideBar, setShowSideBar] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    setShowSideBar(false);
    signOut();
  };

  const [currentUser, setUser] = useState<MaybeUser>(undefined);
  useEffect(() => {
    console.log("effect called");
    let worldsHandle: Handle;

    async function handleUserChange(authInfo?: AuthInfo) {
      let persistedInfo: PersistedInfo;

      // Our function for handling when world changes happen.
      async function handleWorldsChanged(worlds: World[]) {
        console.log("worlds changed?!");
        if (persistedInfo) {
          const user = buildUser(persistedInfo, worlds);
          setUser(user);
        }
      }

      // If we have a previous subscription. Remove it.
      if (worldsHandle) {
        worldsHandle.remove();
      }

      if (authInfo) {
        await persistCurrentUserIfNotPersisted();
        persistedInfo = await getCurrentPersistedInfo();
        const user = buildUser(persistedInfo);
        worldsHandle = subscribeToWorldChanges(user.id, handleWorldsChanged);
        setUser(user);
      } else {
        setUser(undefined);
      }
    }

    const handle = subscribeToUserChanges(handleUserChange);

    return function cleanup() {
      handle.remove();
    };
  }, []);

  return (
    <Grommet theme={theme} themeMode="dark">
      <Box fill>
        <AppBar>
          <Heading level="2" margin="none">
            <Link to="/">{props.name}</Link>
          </Heading>
          {!!currentUser && (
            <Button
              icon={<Menu />}
              onClick={() => {
                setShowSideBar(!showSideBar);
              }}
            />
          )}
        </AppBar>
        <Box direction="row" flex overflow={{ horizontal: "hidden" }}>
          <Box flex align="center" justify="evenly">
            <Main>
              <Routes>
                <Route path="/" element={<Home user={currentUser} />} />
                <Route
                  path="/sign-in-or-up"
                  element={<SignInOrSignUp user={currentUser} />}
                />
                <Route
                  path="/sign-up"
                  element={
                    <SignUp signUpComplete={signUp} user={currentUser} />
                  }
                />
                <Route
                  path="/sign-in"
                  element={
                    <SignIn signInComplete={signIn} user={currentUser} />
                  }
                />
                <Route
                  path="/new-world"
                  element={<NewWorld user={currentUser} />}
                />
                <Route
                  path="/worlds/:worldId"
                  element={<ViewWorld user={currentUser} />}
                />
                <Route
                  path="/worlds/:worldId/coordinates/:coordinateId"
                  element={<ViewCoordinate user={currentUser} />}
                />
              </Routes>
            </Main>
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
