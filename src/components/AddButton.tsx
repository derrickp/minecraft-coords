import { Button, Box, Text } from "grommet";
import { Add } from "grommet-icons";
import { FC } from "react";

export interface AddButtonProps {
  text: string;
  onClick: () => void;
}

export const AddButton: FC<AddButtonProps> = (props) => (
  <Button hoverIndicator="dark-1" {...props}>
    <Box pad="small" direction="row" align="center" gap="small">
      <Add />
      <Text>{props.text}</Text>
    </Box>
  </Button>
);
