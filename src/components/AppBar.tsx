import React from "react";
import { Box, BoxProps } from "grommet";

export const AppBar = (
  props: BoxProps & React.ComponentProps<"div">
): JSX.Element => (
  <Box
    tag="header"
    direction="row"
    align="center"
    justify="between"
    background="brand"
    pad={{ left: "medium", right: "small", vertical: "small" }}
    elevation="medium"
    style={{ zIndex: 1 }}
    {...props}
  />
);
