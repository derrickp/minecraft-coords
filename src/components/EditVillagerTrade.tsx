import { useState } from "react";
import { VillagerTrade } from "../minecraft/VillagerTrade";
import { Form, FormField, Text, TextInput, Box, Button } from "grommet";
import { Close } from "grommet-icons";
import { Trade } from "../minecraft/Trade";
import { TradeItem } from "./TradeItem";

export interface EditVillagerTradeProps {
  villagerTrade: VillagerTrade;
  villagerTradeUpdated: (trade: VillagerTrade) => void;
  onCancel: () => void;
}

export const EditVillagerTrade: React.FC<EditVillagerTradeProps> = ({
  villagerTrade,
  villagerTradeUpdated,
  onCancel,
}) => {
  const [villagerType, setVillagerType] = useState(villagerTrade.villagerType);
  const [name, setName] = useState(villagerTrade.name);
  const [trades, setTrades] = useState(villagerTrade.availableTrades);

  const [newGiven, setNewGiven] = useState("");
  const [newReceived, setNewReceived] = useState("");

  const onSubmit = () => {
    const trade: VillagerTrade = {
      name,
      villagerType,
      availableTrades: trades,
    };
    villagerTradeUpdated(trade);
  };

  const addNewTrade = () => {
    const trade: Trade = {
      given: newGiven,
      received: newReceived,
    };
    setTrades(trades.concat(trade));
    setNewGiven("");
    setNewReceived("");
  };

  const removeTrade = (index: number) => {
    const confirmed = confirm("Are you sure you want to remove the trade?");
    if (confirmed) {
      const newTrades = trades.filter((_, i) => index !== i);
      setTrades(newTrades);
    }
  };

  const tradeItems = trades.map((trade, index) => {
    return (
      <Box key={index} direction="row-responsive" gap="small">
        <TradeItem trade={trade}></TradeItem>
        <Button
          plain
          icon={<Close />}
          onClick={() => removeTrade(index)}
          size="small"
        ></Button>
      </Box>
    );
  });

  return (
    <Form
      onReset={() => {
        setVillagerType(villagerTrade.villagerType);
        setName(villagerTrade.name);
        setNewGiven("");
        setNewReceived("");
      }}
      onSubmit={onSubmit}
    >
      <FormField label="Villager Name" name="villager-name">
        <TextInput
          name="villager-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </FormField>
      <FormField label="Villager Type" name="villager-type">
        <TextInput
          name="villager-type"
          value={villagerType}
          onChange={(event) => setVillagerType(event.target.value)}
        />
      </FormField>
      <Box direction="column" pad="small">
        <Text size="large">Trades</Text>
        {tradeItems}
      </Box>
      <Box direction="row-responsive" pad="small" gap="small">
        <TextInput
          name="given"
          value={newGiven}
          placeholder="Given items"
          onChange={(event) => setNewGiven(event.target.value)}
        />
        <TextInput
          name="received"
          value={newReceived}
          placeholder="Received items"
          onChange={(event) => setNewReceived(event.target.value)}
        />
        <Button onClick={addNewTrade}>Add</Button>
      </Box>
      <Box direction="row" justify="between" margin={{ top: "medium" }}>
        <Button label="Cancel" onClick={onCancel} />
        <Button type="reset" label="Reset Form" />
        <Button type="submit" label="Save Villager Trade" primary />
      </Box>
    </Form>
  );
};
