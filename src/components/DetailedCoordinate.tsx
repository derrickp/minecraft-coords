import { FC } from "react";
import { Coordinate } from "../minecraft/Coordinate";
import { Box, Text } from "grommet";

export interface DetailedCoordinateProps {
  coordinate: Coordinate;
}

export const DetailedCoordinate: FC<DetailedCoordinateProps> = ({
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

const coordinatesLabel = (coordinate: Coordinate): string =>
  `X: ${coordinate.x} Y: ${coordinate.y} Z: ${coordinate.y}`;

const biomeLabel = (coordinate: Coordinate): string =>
  `Biome: ${coordinate.biome}`;
