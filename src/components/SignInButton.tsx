import { Login } from "grommet-icons";
import { Box, Button } from "grommet";
import { useNavigate } from "react-router-dom";
import { FC } from "react";

export const SignInButton: FC = () => {
  const navigate = useNavigate();

  return (
    <Box pad="small">
      <Button
        gap="medium"
        alignSelf="start"
        plain
        icon={<Login />}
        label="Sign In"
        onClick={() => navigate("/sign-in")}
      />
    </Box>
  );
};
