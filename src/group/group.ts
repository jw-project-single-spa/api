import { getApp } from "firebase/app";
import {
  doc,
  collection,
  addDoc,
  updateDoc,
  getFirestore,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  QuerySnapshot,
  DocumentSnapshot,
  FirestoreError,
  Unsubscribe,
} from "firebase/firestore";
import { getCongregationByLoggedUser } from "../congregation";
import { assignTypes } from "../utils/assign-types";
import {
  CONGREGATIONS_COLLETION_KEY,
  GROUPS_COLLETION_KEY,
} from "../utils/firebase-documents-keys";
import { Group } from "./types";

export async function getGroups() {
  const db = getFirestore(getApp());
  const congregation = await getCongregationByLoggedUser();
  console.log(congregation);

  const groupsSnap = await getDocs(
    collection(
      db,
      CONGREGATIONS_COLLETION_KEY,
      congregation.id,
      GROUPS_COLLETION_KEY
    ).withConverter(assignTypes<Omit<Group, "id">>())
  );

  return groupsSnap.docs;
}

export let unsubscribe: Unsubscribe;
export async function snapshotGroup(
  onNext: (snapshot: QuerySnapshot<Omit<Group, "id">>) => void
) {
  const db = getFirestore(getApp());
  const congregation = await getCongregationByLoggedUser();

  unsubscribe = onSnapshot(
    query(
      collection(
        db,
        CONGREGATIONS_COLLETION_KEY,
        congregation.id,
        GROUPS_COLLETION_KEY
      ).withConverter(assignTypes<Omit<Group, "id">>())
    ),
    onNext
  );
}

export async function saveGroup(groupData: Group, id?: string) {
  debugger
  const db = getFirestore(getApp());
  const congregation = await getCongregationByLoggedUser();

  if (id) {
    const groupRef = doc(
      db,
      CONGREGATIONS_COLLETION_KEY,
      congregation.id,
      GROUPS_COLLETION_KEY,
      id
    );

    return updateDoc(groupRef, groupData);
  }

  const groupRef = collection(
    db,
    CONGREGATIONS_COLLETION_KEY,
    congregation.id,
    GROUPS_COLLETION_KEY
  );

  return addDoc(groupRef, groupData);
}
