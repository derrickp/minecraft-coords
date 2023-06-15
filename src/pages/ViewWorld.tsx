import { Link, useParams } from "react-router-dom";
import { Box } from "grommet";
import { CoordinateList } from "../components/CoordinateList";
import { ViewWorldHeading } from "../components/ViewWorldHeading";
import { useAuthInfo } from "../hooks/auth";
import { useWorld } from "../hooks/worlds";

export const ViewWorld: React.FC = () => {
  const { worldId } = useParams();
  const { authInfo } = useAuthInfo();
  const { world } = useWorld(worldId);

  if (!authInfo) {
    return <div>You must be logged in to see worlds.</div>;
  }

  if (!world) {
    return <div>No world with that ID.</div>;
  }

  return (
    <Box margin="small" justify="start">
      <Box>
        <ViewWorldHeading world={world} />
        <CoordinateList coordinates={world.coordinates} worldId={world.id} />
        <Link to={`/worlds/${worldId}/add_coordinate`}>Add New Coordinate</Link>
      </Box>
    </Box>
  );
};
