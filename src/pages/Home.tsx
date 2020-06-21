import React from "react";
import { User } from "~User";
import { useHistory } from "react-router-dom";
import { Text, Box } from "grommet";
import { WorldTableLinks } from "~components/WorldTableLinks";
import { World } from "~minecraft/World";

export interface HomeProps {
  user: User;
}

export const Home = (props: HomeProps): JSX.Element => {
  const history = useHistory();

  const worldClicked = (world: World) => {
    history.push(`/worlds/${world.id}`);
  };

  const newWorldClicked = () => {
    history.push("/new-world");
  };

  return (
    <Box align="center" fill>
      <Text>{`Welcome ${props.user.email}`}</Text>
      <WorldTableLinks
        newWorldClicked={newWorldClicked}
        worldClicked={worldClicked}
        worlds={props.user.worlds}
      ></WorldTableLinks>
    </Box>
  );
};
