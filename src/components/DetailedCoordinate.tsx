import { Coordinate } from "../minecraft/Coordinate";
import { Box, Text } from "grommet";

export interface DetailedCoordinateProps {
  coordinate: Coordinate;
}

export const DetailedCoordinate: React.FC<DetailedCoordinateProps> = ({
  coordinate,
}) => (
  <Box direction="column" gap="small">
    <Box direction="row-responsive" justify="start" gap="small" pad="small">
      <Text size="large">{coordinatesLabel(coordinate)}</Text>
    </Box>
    {coordinate.biome && coordinate.biome !== "" && (
      <Box direction="row-responsive" justify="start" gap="small" pad="small">
        <Text size="large">{biomeLabel(coordinate)}</Text>
      </Box>
    )}
  </Box>
);

function coordinatesLabel(coordinate: Coordinate): string {
  return `X: ${coordinate.x} Y: ${coordinate.y} Z: ${coordinate.y}`;
}

function biomeLabel(coordinate: Coordinate): string {
  return `Biome: ${coordinate.biome}`;
}
