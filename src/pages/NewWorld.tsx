import { useCallback, useState } from "react";
import { buildWorld } from "../minecraft/World";
import { Box } from "grommet";
import { NewWorldForm, NewWorldDetails } from "../components/NewWorldForm";
import { useNavigate } from "react-router-dom";
import { useAuthInfo } from "../hooks/auth";
import { useSaveNewWorld } from "../hooks/worlds";

export const NewWorld: React.FC = () => {
  const navigate = useNavigate();
  const { authInfo } = useAuthInfo();
  const [isSavingNewWorld, setSavingNewWorld] = useState(false);
  const saveNewWorld = useSaveNewWorld();

  const onCancel = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const onWorldSubmitted = useCallback(
    async (details: NewWorldDetails) => {
      if (!authInfo) {
        return;
      }

      const world = buildWorld({
        idUniqueifier: authInfo!.id,
        id: details.id,
        seed: details.seed,
        name: details.name,
      });
      setSavingNewWorld(true);
      await saveNewWorld(world, authInfo!);
      navigate("/");
    },
    [navigate, saveNewWorld, setSavingNewWorld, authInfo]
  );

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
