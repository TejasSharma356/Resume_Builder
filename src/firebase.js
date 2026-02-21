import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "Get_Your_API_Key",
  authDomain: "tejaspro-ddd2f.firebaseapp.com",
  projectId: "tejaspro-ddd2f",
  storageBucket: "tejaspro-ddd2f.firebasestorage.app",
  messagingSenderId: "155537466563",
  appId: "1:155537466563:web:bbc6c9ad2c0d3252582e76",
  measurementId: "G-7T9P27GBGJ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
