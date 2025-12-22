import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

  const googleProvider = new GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const registerUserwithPass = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      }
      return () => unsubscribe(); //cleanup function
    });
  }, []);

  useEffect(() => {
    if (!user) return;
    axios.get(`https://blood-link-six-kappa.vercel.app/users/role/${user.email}`).then((res) => {
      setRole(res.data.role);
      setRoleLoading(false);
      setStatus(res.data.status);
    });
  }, [user]);

  // console.log(role, roleLoading, status);

  const authData = {
    registerUserwithPass,
    user,
    setUser,
    handleGoogleSignIn,
    loading,
    role,
    roleLoading,
    status,
  };
  return <AuthContext value={authData}>{children}</AuthContext>;
};

export default AuthProvider;
