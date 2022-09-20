import { getAuth, getRedirectResult, UserCredential } from "firebase/auth";

export async function verifyIsAuthenticated(
  resultThen: (user: UserCredential) => void,
  resultCatch?: (user: unknown) => void,
  resultFinally?: () => void
) {
  const auth = getAuth();
  await getRedirectResult(auth)
    .then(resultThen)
    .catch(resultCatch)
    .finally(resultFinally);
}
