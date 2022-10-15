import {
  getAuth,
  getRedirectResult,
  indexedDBLocalPersistence,
  setPersistence,
  User,
  UserCredential,
} from "firebase/auth";

export async function verifyIsAuthenticated(
  resultThen: (userCredential: UserCredential, currentUser: User) => void,
  resultCatch?: (currentUser: User) => void,
  resultFinally?: () => void
) {
  const auth = getAuth();
  await getRedirectResult(auth)
    .then(async (e) => {
      console.log("then");
      await setPersistence(auth, indexedDBLocalPersistence);
      resultThen(e, auth.currentUser);
    })
    .catch(() => {
      console.log("catch");
      resultCatch(auth.currentUser);
    })
    .finally(() => {
      console.log("finally");
      resultFinally();
    });
}
