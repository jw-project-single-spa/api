import { getApp } from "firebase/app";
import { signInWithRedirect, getAuth, GoogleAuthProvider } from "firebase/auth";

export function loginWithRedirect() {
  signInWithRedirect(getAuth(getApp()), new GoogleAuthProvider());
}
