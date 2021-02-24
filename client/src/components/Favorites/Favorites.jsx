import React from "react";
import firebase, { db } from "../../firebase";
import { useFirestoreUser } from "../../auth-pages/user-provider";

const Favorites = () => {
  const { fireStoreUser } = useFirestoreUser();

  const addFavorites = async () => {
    const addData = await db
      .collection("favorites")
      .doc(fireStoreUser.uid)
      .set();
  };
  // console.log({ fireStoreUser });

  return <div></div>;
};

export default Favorites;
