import { getApp } from "firebase/app";
import {
  doc,
  collection,
  addDoc,
  updateDoc,
  getFirestore,
  getDocs,
  onSnapshot,
  query,
  QuerySnapshot,
  FirestoreError,
  Unsubscribe,
} from "firebase/firestore";
import { getCongregationByLoggedUser } from "../congregation";
import {
  CONGREGATIONS_COLLETION_KEY,
  GROUPS_COLLETION_KEY,
} from "../utils/firebase-documents-keys";
import { idSet } from "../utils/id-set";
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
    ).withConverter({
      toFirestore: null,
      fromFirestore: (e) => idSet<Group>(e),
    })
  );

  return groupsSnap;
}

export let unsubscribe: Unsubscribe;
export async function snapshotGroup(
  onNext: (snapshot: QuerySnapshot<Group>) => void,
  onError?: (error: FirestoreError) => void
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
      ).withConverter({
        toFirestore: null,
        fromFirestore: (e) => idSet<Group>(e),
      })
    ),
    onNext,
    onError
  );
}

export async function saveGroup(groupData: Omit<Group, "id">, id?: string) {
  debugger;
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
