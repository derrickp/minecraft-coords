import React from "react";
import { Button, Box, Text } from "grommet";
import { Add } from "grommet-icons";

export interface AddButtonProps {
  text: string;
  onClick: () => void;
}

export const AddButton = (props: AddButtonProps): JSX.Element => {
  return (
    <Button hoverIndicator="dark-1" {...props}>
      <Box pad="small" direction="row" align="center" gap="small">
        <Add />
        <Text>{props.text}</Text>
      </Box>
    </Button>
  );
};
