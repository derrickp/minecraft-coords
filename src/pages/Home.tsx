import { User } from "../User";
import { Text, Box } from "grommet";
import { WorldTableLinks } from "../components/WorldTableLinks";
import { World } from "../minecraft/World";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export interface HomeProps {
  user?: User;
}

export const Home: React.FC<HomeProps> = ({ user }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/sign-in-or-up");
    }
  }, [user]);

  if (!user) {
    return <></>;
  }

  const newWorldClicked = () => navigate("/new-world");

  return (
    <Box align="center" fill>
      <Text>{`Welcome ${user.email}`}</Text>
      <WorldTableLinks newWorldClicked={newWorldClicked} worlds={user.worlds} />
    </Box>
  );
};
