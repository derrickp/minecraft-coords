import { Coordinate } from "../minecraft/Coordinate";
import { List, Text, Box, Heading } from "grommet";

export interface CoordinateListProps {
  coordinates: Coordinate[];
  coordinateClicked: (coordinate: Coordinate) => void;
}

type ClickEvent = React.MouseEvent & { item?: Coordinate; index?: number };

export const CoordinateList: React.FC<CoordinateListProps> = ({
  coordinateClicked,
  coordinates,
}) => {
  const onItemClicked = (event: ClickEvent) => {
    if (event.item) {
      coordinateClicked(event.item);
    }
  };

  return (
    <Box>
      <Heading level={4}>Coordinates</Heading>
      <List
        data={coordinates}
        onClickItem={onItemClicked}
        primaryKey={(coordinate) => (
          <Text key={coordinate.name} size="large" weight="bold">
            {coordinate.name}
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
};
