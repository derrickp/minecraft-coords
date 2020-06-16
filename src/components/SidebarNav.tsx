import React from "react";
import { Logout } from "grommet-icons";
import { Nav, Box, Button } from "grommet";

export interface SideBarNavProps {
  signOut: () => void;
}

export const SidebarNav = (props: SideBarNavProps): JSX.Element => {
  return (
    <Nav gap="medium">
      <SignOutButton signOut={props.signOut}></SignOutButton>
    </Nav>
  );
};

const SignOutButton = ({
  signOut,
  ...rest
}: {
  signOut: () => void;
}): JSX.Element => {
  return (
    <Box pad="small">
      <Button
        gap="medium"
        alignSelf="start"
        plain
        icon={<Logout />}
        label="Sign Out"
        onClick={signOut}
        {...rest}
      />
    </Box>
  );
};
