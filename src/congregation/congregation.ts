import { getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import {
  CONGREGATIONS_COLLETION_KEY,
  PUBLISHERS_COLLETION_KEY,
} from "../utils/firebase-documents-keys";
import { idSet } from "../utils/id-set";
import { Congregation } from "./types";

let congregationByLoggedUser: Congregation;
export const getCongregationByLoggedUser = async () => {
  if (congregationByLoggedUser) {
    return congregationByLoggedUser;
  }

  const auth = getAuth();
  const loggedUser = auth.currentUser;

  const db = getFirestore(getApp());

  const publisherQuery = query(
    collectionGroup(db, PUBLISHERS_COLLETION_KEY),
    where("email", "==", loggedUser.email)
  );
  const querySnapshot = await getDocs(publisherQuery);
  const publisher = querySnapshot.docs[0];

  const congregationId = publisher.ref.parent.parent.id;
  const congregation = await getDoc(
    doc(db, CONGREGATIONS_COLLETION_KEY, congregationId).withConverter({
      toFirestore: null,
      fromFirestore: (e) => idSet<Congregation>(e),
    })
  );
  congregationByLoggedUser = { id: congregationId, ...congregation.data() };

  return congregationByLoggedUser;
};
