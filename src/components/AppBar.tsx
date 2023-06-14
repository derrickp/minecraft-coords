import { Box, BoxProps } from "grommet";

type AppBarProps = BoxProps & React.ComponentProps<"div">;

export const AppBar: React.FC<AppBarProps> = (props) => (
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
