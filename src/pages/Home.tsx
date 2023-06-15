import { Text, Box } from "grommet";
import { WorldTableLinks } from "../components/WorldTableLinks";
import { Link, useNavigate } from "react-router-dom";
import { useAuthInfo } from "../hooks/auth";
import { useWorlds } from "../hooks/worlds";
import { useCallback } from "react";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { authInfo } = useAuthInfo();
  const { worlds } = useWorlds();

  const newWorldClicked = useCallback(() => navigate("/new-world"), [navigate]);

  const welcomeText = authInfo
    ? `Welcome ${authInfo.email}`
    : "Welcome to the Minecraft coordinate saver!";

  console.log("Home");

  return (
    <Box align="center" fill>
      <Text>{welcomeText}</Text>
      {!authInfo && <Link to="/sign-in-or-up">Sign in to use the app</Link>}
      <WorldTableLinks newWorldClicked={newWorldClicked} worlds={worlds} />
    </Box>
  );
};
