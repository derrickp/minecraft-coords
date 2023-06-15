import { Link } from "react-router-dom";
import { Coordinate } from "../minecraft/Coordinate";
import { List, Text, Box, Heading } from "grommet";

export interface CoordinateListProps {
  coordinates: Coordinate[];
  worldId: string;
}

export const CoordinateList: React.FC<CoordinateListProps> = ({
  coordinates,
  worldId,
}) => (
  <Box>
    <Heading level={4}>Coordinates</Heading>
    <List
      data={coordinates}
      primaryKey={(coordinate) => (
        <Text key={coordinate.name} size="large" weight="bold">
          <Link to={getCoordinateUrl(worldId, coordinate)}>
            {coordinate.name}
          </Link>
        </Text>
      )}
      secondaryKey={(coordinate) => (
        <Text
          key={`X: ${coordinate.x} Y: ${coordinate.y} Z: ${coordinate.z}`}
          size="small"
          color="dark-4"
        >
          {`X: ${coordinate.x} Y: ${coordinate.y} Z: ${coordinate.z}`}
        </Text>
      )}
      itemKey={(item) => item.id}
    ></List>
  </Box>
);

const getCoordinateUrl = (worldId: string, coordinate: Coordinate): string =>
  `/worlds/${worldId}/coordinates/${coordinate.id}`;
