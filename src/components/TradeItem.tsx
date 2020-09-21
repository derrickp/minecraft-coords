import React from "react";
import { Text } from "grommet";

import { Trade } from "../minecraft/Trade";

export interface TradeItemProps {
  trade: Trade;
}

export const TradeItem = (props: TradeItemProps): JSX.Element => {
  return (
    <Text size="medium">{`${props.trade.given} -> ${props.trade.received}`}</Text>
  );
};
