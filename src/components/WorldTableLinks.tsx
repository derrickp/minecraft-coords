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
} from "grommet";
import { World, getFriendlyId } from "../minecraft/World";
import { AddButton } from "./AddButton";
import { Link } from "react-router-dom";

export interface WorldTableLinksProps {
  worlds: World[];
  newWorldClicked: () => void;
}

export const WorldTableLinks: React.FC<WorldTableLinksProps> = ({
  worlds,
  newWorldClicked,
}) => (
  <Box align="center" pad="large" fill>
    <Table caption="Minecraft Worlds (click a row to visit)">
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
          <TableCell key="visit" scope="col" align="center" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {worlds.map((world) => (
          <TableRow key={world.id}>
            <TableCell key="world-id" scope="row" align="center">
              <Text>{getFriendlyId(world.id)}</Text>
            </TableCell>
            <TableCell key="world-name" scope="row" align="center">
              <Text>{world.name}</Text>
            </TableCell>
            <TableCell key="world-seed" scope="row" align="center">
              <Text>{world.seed}</Text>
            </TableCell>
            <TableCell key="visit" scope="row" align="center">
              <Link to={`/worlds/${world.id}`}>Visit</Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow key="new-world">
          <TableCell key="new-world" scope="row" align="center">
            <AddButton
              onClick={newWorldClicked}
              text="Add New World"
            ></AddButton>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  </Box>
);
