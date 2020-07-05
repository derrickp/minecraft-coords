import React from "react";
import { Coordinate } from "~minecraft/Coordinate";
import { List, Text } from "grommet";

export interface CoordinateListProps {
  coordinates: Coordinate[];
  coordinateClicked: (coordinate: Coordinate) => void;
}

type ClickEvent = React.MouseEvent & { item?: Coordinate; index?: number };

export const CoordinateList = (props: CoordinateListProps): JSX.Element => {
  const onItemClicked = (event: ClickEvent) => {
    if (event.item) {
      props.coordinateClicked(event.item);
    }
  };

  return (
    <List
      data={props.coordinates}
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
    ></List>
  );
};
