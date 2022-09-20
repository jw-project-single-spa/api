import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase-config";

initializeApp(firebaseConfig);

export * from "./auth";
