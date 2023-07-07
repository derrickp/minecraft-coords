import {
  CollectionReference,
  DocumentData,
  addDoc,
  doc,
  getDocs,
  // onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useWorldCollection } from "./firebase";
import { useAuthInfo } from "./auth";
// import { useEffect, useState } from "react";
import { World } from "../minecraft/World";
import { AuthInfo } from "../security/AuthInfo";
import { useQuery } from "@tanstack/react-query";

const getUserQuery = (userId: string, collection: CollectionReference) => {
  const whereFilter = where("collaborators", "array-contains", userId);
  return query(collection, whereFilter);
};

export const useWorld = (id?: string) => {
  const { worlds } = useWorlds();
  const world = worlds?.find((w) => w.id === id);

  return { world };
};

// TODO: Lets use react-query instead? Maybe that will help here.
export const useWorlds = () => {
  const collection = useWorldCollection();
  const { authInfo } = useAuthInfo();
  // const queryClient = useQueryClient();

  const { data, isLoading } = useQuery(["worlds"], async () => {
    const userQuery = getUserQuery(authInfo!.id, collection);
    const snapshot = await getDocs(userQuery);
    const worlds: World[] = [];
    snapshot.forEach((doc) => {
      const world = doc.data() as World;
      world.storageId = doc.id;
      worlds.push(world);
    });

    return worlds;
  }, {
    enabled: !!authInfo,
  });

  // const [worlds, setWorlds] = useState<World[]>([]);

  // useEffect(() => {
  //   if (!authInfo) {
  //     return;
  //   }

  //   const userQuery = getUserQuery(authInfo.id, collection);

  //   const handle = onSnapshot(userQuery, {
  //     next: (snapshot) => {
  //       const worlds: World[] = [];
  //       snapshot.forEach((doc) => {
  //         const world = doc.data() as World;
  //         world.storageId = doc.id;
  //         worlds.push(world);
  //       });

  //       setWorlds((currentWorlds) => {
  //         if (currentWorlds.length !== worlds.length) {
  //           console.log("Updating worlds");
  //           return worlds;
  //         }

  //         return currentWorlds;
  //       });
  //     },
  //     error: console.error,
  //   });

  //   return handle;
  // }, [authInfo]);

  return { worlds: data, isLoading };
};

export const useUpdateWorld = () => {
  const collection = useWorldCollection();

  return async (world: World) => {
    if (!world.storageId) {
      throw new Error("World needs to be saved first");
    }

    const document = doc<DocumentData>(collection, world.storageId);
    await setDoc(document, world).catch(console.error);
  };
};

export const useSaveNewWorld = () => {
  const collection = useWorldCollection();

  return async (world: World, authInfo: AuthInfo) => {
    const persistedWorld: World = {
      ...world,
      owner: authInfo.id,
      collaborators: [authInfo.id],
    };

    const result = await addDoc(collection, persistedWorld);
    persistedWorld.storageId = result.id;
    console.log(persistedWorld);
  };
};
