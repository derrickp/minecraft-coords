import { Text } from "grommet";

import { Trade } from "../minecraft/Trade";

export interface TradeItemProps {
  trade: Trade;
}

export const TradeItem: React.FC<TradeItemProps> = ({ trade }) => (
  <Text size="medium">{`${trade.given} -> ${trade.received}`}</Text>
);
