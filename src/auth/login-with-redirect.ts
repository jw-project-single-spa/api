import { getApp } from "firebase/app";
import { signInWithRedirect, getAuth, GoogleAuthProvider } from "firebase/auth";

export async function loginWithRedirect() {
  signInWithRedirect(getAuth(getApp()), new GoogleAuthProvider());
}
