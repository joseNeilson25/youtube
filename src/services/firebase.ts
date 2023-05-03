import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBKkbHBMbx_wJyurMDvk5N-v2npqVkI0O8",
  authDomain: "auth-yt-8fc28.firebaseapp.com",
  projectId: "auth-yt-8fc28",
  storageBucket: "auth-yt-8fc28.appspot.com",
  messagingSenderId: "237371527298",
  appId: "1:237371527298:web:0a1813753cefb16727e49b",
  measurementId: "G-GSN50DX8BT"
};

export const app = initializeApp(firebaseConfig);
export default firebaseConfig;
export const storage = getStorage(app);