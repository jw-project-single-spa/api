import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase-config";
import * as auth from "./auth";
import * as congregation from "./congregation";
import * as groups from "./group";
import * as types from "./types";

initializeApp(firebaseConfig);

export { auth, congregation, groups, types };
