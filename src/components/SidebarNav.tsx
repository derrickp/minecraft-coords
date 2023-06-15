import { Logout } from "grommet-icons";
import { Nav, Box, Button } from "grommet";

export interface SideBarNavProps {
  signOut: () => void;
}

export const SidebarNav: React.FC<SideBarNavProps> = ({ signOut }) => (
  <Nav gap="medium">
    <SignOutButton signOut={signOut}></SignOutButton>
  </Nav>
);

const SignOutButton: React.FC<SideBarNavProps> = ({ signOut, ...rest }) => (
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
