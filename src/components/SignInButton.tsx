import { Login } from "grommet-icons";
import { Box, Button } from "grommet";
import { useNavigate } from "react-router-dom";

export const SignInButton: React.FC = () => {
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
