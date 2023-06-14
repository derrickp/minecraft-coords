import React from "react";
import { VillagerTrade } from "../minecraft/VillagerTrade";
import { Text, Box, Button } from "grommet";
import { Edit } from "grommet-icons";

export interface VillagerTradesProps {
  villagerTrades: VillagerTrade[];
  editVillageClicked: (index: number) => void;
}

export const VillagerTrades: React.FC<VillagerTradesProps> = ({
  villagerTrades,
  editVillageClicked,
}): JSX.Element => (
  <>
    {villagerTrades.map((villager, index) => {
      return (
        <SingleVillager
          key={index}
          villager={villager}
          editClicked={() => editVillageClicked(index)}
        ></SingleVillager>
      );
    })}
  </>
);

interface SingleVillagerProps {
  villager: VillagerTrade;
  editClicked: () => void;
}

const SingleVillager: React.FC<SingleVillagerProps> = ({
  villager,
  editClicked,
}) => (
  <Box direction="row-responsive" align="center" gap="small" pad="small">
    <Text size="medium">{`${villager.name}`}</Text>
    <Button icon={<Edit />} onClick={editClicked}></Button>
  </Box>
);
