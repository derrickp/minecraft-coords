import React, { useState } from "react";
import { buildWorld } from "~minecraft/World";
import { Box } from "grommet";
import { User } from "~User";
import { NewWorldForm, NewWorldDetails } from "~components/NewWorldForm";
import { useHistory } from "react-router-dom";
import { saveNewWorld } from "~firebase_data/worlds";

export interface NewWorldProps {
  user: User;
}

export const NewWorld = (props: NewWorldProps): JSX.Element => {
  const history = useHistory();
  const [isSavingNewWorld, setSavingNewWorld] = useState(false);

  const onCancel = () => {
    history.goBack();
  };

  const onWorldSubmitted = async (details: NewWorldDetails) => {
    const world = buildWorld({
      idUniqueifier: props.user.id,
      id: details.id,
      seed: details.seed,
      name: details.name,
    });
    setSavingNewWorld(true);
    const result = await saveNewWorld(world, props.user);
    console.log(result);
    history.push("/");
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
          ></NewWorldForm>
        )}
      </Box>
    </Box>
  );
};
