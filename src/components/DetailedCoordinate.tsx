import React, { useState } from "react";
import { Coordinate } from "../minecraft/Coordinate";
import { VillagerTrade } from "../minecraft/VillagerTrade";
import { Box, Text } from "grommet";
import { VillagerTrades } from "./VillagerTrades";
import { AddButton } from "./AddButton";
import { EditVillagerTrade } from "./EditVillagerTrade";

export interface DetailedCoordinateProps {
  coordinate: Coordinate;
  villagerTradeAdded: (villagerTrade: VillagerTrade) => void;
  villageTradeEdited: (index: number, newTrade: VillagerTrade) => void;
}

export const DetailedCoordinate = (
  props: DetailedCoordinateProps
): JSX.Element => {
  const { coordinate } = props;
  const [showAddNewVillagerTrade, setShowAddNewVillagerTrade] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const villageText = coordinate.hasVillageNearby
    ? "Has a nearby village"
    : "Does not have a nearby village";

  if (showAddNewVillagerTrade) {
    const emptyTrade: VillagerTrade = {
      name: "",
      villagerType: "",
      availableTrades: [],
    };
    return (
      <EditVillagerTrade
        villagerTrade={emptyTrade}
        villagerTradeUpdated={(trade) => props.villagerTradeAdded(trade)}
        onCancel={() => setShowAddNewVillagerTrade(false)}
      ></EditVillagerTrade>
    );
  }

  if (selectedIndex >= 0) {
    const villagerTrade = props.coordinate.villagerTrades[selectedIndex];
    return (
      <EditVillagerTrade
        villagerTrade={villagerTrade}
        onCancel={() => setSelectedIndex(-1)}
        villagerTradeUpdated={(newTrade) => {
          props.villageTradeEdited(selectedIndex, newTrade);
        }}
      ></EditVillagerTrade>
    );
  }

  return (
    <Box direction="column" gap="small">
      <Box direction="row-responsive" justify="start" gap="small" pad="small">
        <Text size="large">{coordinatesLabel(coordinate)}</Text>
      </Box>
      {coordinate.biome && coordinate.biome !== "" && (
        <Box direction="row-responsive" justify="start" gap="small" pad="small">
          <Text size="large">{biomeLabel(coordinate)}</Text>
        </Box>
      )}
      <Box direction="row-responsive" justify="start" gap="small" pad="small">
        <Text size="large">{villageText}</Text>
      </Box>
      <Box direction="column" justify="start" gap="small" pad="small">
        <Text size="large">Villager Trades</Text>
        <VillagerTrades
          editVillageClicked={(index) => setSelectedIndex(index)}
          villagerTrades={coordinate.villagerTrades}
        ></VillagerTrades>
        <AddButton
          text="Add New Villager Trade"
          onClick={() => setShowAddNewVillagerTrade(true)}
        ></AddButton>
      </Box>
    </Box>
  );
};

function coordinatesLabel(coordinate: Coordinate): string {
  return `X: ${coordinate.x} Y: ${coordinate.y} Z: ${coordinate.y}`;
}

function biomeLabel(coordinate: Coordinate): string {
  return `Biome: ${coordinate.biome}`;
}
