import { QueryDocumentSnapshot } from "firebase/firestore";

export function idSet(snapshot: QueryDocumentSnapshot) {
  return { id: snapshot.id, ...snapshot.data() };
}
