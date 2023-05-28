import AppNavigation from './src/navigations/AppNavigation';
import AppSignNavigation from './src/navigations/AppSignNavigation';
import { auth } from "./src/firebase/config";
import { onAuthStateChanged } from 'firebase/auth';
import { useState } from 'react';
import { AccountProvider } from './src/contexts/accountContext';
import { useFonts } from 'expo-font';

export default function App() {

  const [user, setUser] = useState(auth.currentUser);
 
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User logged in...");
      setUser(user);
    } else {
      console.log("User not logged in...");
      setUser(null);
    }
  });

  if (user) {
    return (
      <AccountProvider>
            <AppNavigation></AppNavigation>
      </AccountProvider>
    );
  } else {
    return (
      <AppSignNavigation></AppSignNavigation>
    );
  }
}