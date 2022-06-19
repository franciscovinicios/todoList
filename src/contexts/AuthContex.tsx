import {  GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, database, signOut } from "../services/firebase";
import { ref, update } from "firebase/database";
import { useNavigate } from "react-router-dom";

type User = {
  id: string
  name: string
  avatar: string
}

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
  SignOut: () => Promise<void>;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>()
  const navigate = useNavigate()


  

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, photoURL, uid } = user

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account.')
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    const RedirectLogin = async () => {
      if (user) {
        return 
      } else if(!user) {
        navigate('/')
      }
    }
      RedirectLogin();
  }, [user, navigate])

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)

    if (result?.user) {
      const { displayName, photoURL, uid } = result.user

      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google Account.')
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })

      async function getdate() { 
        try {
          const db = database
           await update(ref(db, `users/${result.user.uid}`), {
            name: result.user.displayName,
            id: result.user.uid, 
            
          });
        } catch (e) {
          new Error()
        }
      }

      getdate()
    }
  }

  async function SignOut() {
    if(user) {
      setUser(undefined)
      await signOut(auth)
    }
  }



  

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, SignOut }} >
       {props.children}
    </AuthContext.Provider>
  )
}