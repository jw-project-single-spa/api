import { QueryDocumentSnapshot } from "firebase/firestore";

export function idSet<T>(snapshot: QueryDocumentSnapshot) {
  return { ...snapshot.data(), id: snapshot.id } as T;
}
