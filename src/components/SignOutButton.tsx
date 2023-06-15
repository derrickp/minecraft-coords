import { Logout } from "grommet-icons";
import { Box, Button } from "grommet";
import { useSignOut } from "../hooks/auth";
import { FC } from "react";

export const SignOutButton: FC = () => {
  const signOut = useSignOut();

  return (
    <Box pad="small">
      <Button
        gap="medium"
        alignSelf="start"
        plain
        icon={<Logout />}
        label="Sign Out"
        onClick={signOut}
      />
    </Box>
  );
};
