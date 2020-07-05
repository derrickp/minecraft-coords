import React from "react";
import {
  Box,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  Text,
  TableFooter,
  Button,
} from "grommet";
import { Add } from "grommet-icons";
import { World, getFriendlyId } from "~minecraft/World";

export interface WorldTableLinksProps {
  worlds: World[];
  worldClicked: (world: World) => void;
  newWorldClicked: () => void;
}

export const WorldTableLinks = (props: WorldTableLinksProps): JSX.Element => {
  return (
    <Box align="center" pad="large" fill>
      <Table caption="Minecraft Worlds (click to visit)">
        <TableHeader>
          <TableRow>
            <TableCell key="world-id" scope="col" align="center">
              <Text>ID</Text>
            </TableCell>
            <TableCell key="world-name" scope="col" align="center">
              <Text>Name</Text>
            </TableCell>
            <TableCell key="world-seed" scope="col" align="center">
              <Text>Seed</Text>
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.worlds.map((world) => (
            <TableRow key={world.id} onClick={() => props.worldClicked(world)}>
              <TableCell key="world-id" scope="row" align="center">
                <Text>{getFriendlyId(world.id)}</Text>
              </TableCell>
              <TableCell key="world-name" scope="row" align="center">
                <Text>{world.name}</Text>
              </TableCell>
              <TableCell key="world-seed" scope="row" align="center">
                <Text>{world.seed}</Text>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow key="new-world">
            <TableCell key="new-world" scope="row" align="center">
              <Button
                hoverIndicator="dark-1"
                onClick={props.newWorldClicked}
                {...props}
              >
                <Box pad="small" direction="row" align="center" gap="small">
                  <Add />
                  <Text>Add New World</Text>
                </Box>
              </Button>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </Box>
  );
};
