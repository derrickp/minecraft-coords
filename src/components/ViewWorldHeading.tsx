import React from "react";
import { World } from "../minecraft/World";
import { Box, Heading, Text } from "grommet";

export interface ViewWorldHeadingProps {
  world: World;
}

export const ViewWorldHeading: React.FC<ViewWorldHeadingProps> = ({
  world,
}) => (
  <>
    <Box margin="small" justify="start">
      <Heading level={4}>World Name</Heading>
      <Text>{world.name}</Text>
    </Box>
    <Box margin="small" justify="start">
      <Heading level={4}>World Seed</Heading>
      <Text>{world.seed}</Text>
    </Box>
  </>
);
