import React from "react";
import { VillagerTrade } from "~minecraft/VillagerTrade";
import { Text, Box, Button } from "grommet";
import { Edit } from "grommet-icons";

export interface VillagerTradesProps {
  villagerTrades: VillagerTrade[];
  editVillageClicked: (index: number) => void;
}

export const VillagerTrades = (props: VillagerTradesProps): JSX.Element => {
  const villagers = props.villagerTrades.map((villager, index) => {
    return (
      <SingleVillager
        key={index}
        villager={villager}
        editClicked={() => {
          props.editVillageClicked(index);
        }}
      ></SingleVillager>
    );
  });

  return <>{villagers}</>;
};

interface SingleVillagerProps {
  villager: VillagerTrade;
  editClicked: () => void;
}

const SingleVillager = (props: SingleVillagerProps): JSX.Element => {
  return (
    <Box direction="row-responsive" align="center" gap="small" pad="small">
      <Text size="medium">{`${props.villager.name}`}</Text>
      <Button icon={<Edit />} onClick={props.editClicked}></Button>
    </Box>
  );
};
