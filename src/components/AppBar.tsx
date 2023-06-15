import { Box, Heading } from "grommet";
import { useNavigate } from "react-router-dom";
import { useAuthInfo } from "../hooks/auth";
import { SignOutButton } from "./SignOutButton";
import { SignInButton } from "./SignInButton";

export const AppBar: React.FC<{ name: string }> = ({ name }) => {
  const { authInfo } = useAuthInfo();
  const navigate = useNavigate();

  return (
    <Box
      tag="header"
      direction="row"
      align="center"
      justify="between"
      background="brand"
      pad={{ left: "medium", right: "small", vertical: "small" }}
      elevation="medium"
      style={{ zIndex: 1 }}
    >
      <Heading level="2" margin="none" onClick={() => navigate("/")}>
        {name}
      </Heading>
      {authInfo ? <SignOutButton /> : <SignInButton />}
    </Box>
  );
};
