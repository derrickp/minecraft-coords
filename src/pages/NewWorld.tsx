import { useEffect, useState } from "react";
import { buildWorld } from "../minecraft/World";
import { Box } from "grommet";
import { User } from "../User";
import { NewWorldForm, NewWorldDetails } from "../components/NewWorldForm";
import { useNavigate } from "react-router-dom";
import { saveNewWorld } from "../firebase_data/worlds";

export interface NewWorldProps {
  user?: User;
}

export const NewWorld: React.FC<NewWorldProps> = ({ user }) => {
  const navigate = useNavigate();
  const [isSavingNewWorld, setSavingNewWorld] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/sign-in-or-up");
    }
  }, [user]);

  const onCancel = () => {
    navigate(-1);
  };

  const onWorldSubmitted = async (details: NewWorldDetails) => {
    const world = buildWorld({
      idUniqueifier: user!.id,
      id: details.id,
      seed: details.seed,
      name: details.name,
    });
    setSavingNewWorld(true);
    const result = await saveNewWorld(world, user!);
    console.log(result);
    navigate("/");
  };

  return (
    <Box fill align="center" justify="center">
      <Box width="medium">
        {isSavingNewWorld ? (
          <div>Loading...</div>
        ) : (
          <NewWorldForm
            onCancel={onCancel}
            onWorldSubmitted={onWorldSubmitted}
          />
        )}
      </Box>
    </Box>
  );
};
