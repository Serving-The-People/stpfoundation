import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";

import { DirectoryRow } from "../../types";
export const UserContext = createContext<{profile? : DirectoryRow, userId?: string, loggedIn?: boolean, initialized: boolean, refresh : ()=>any, purchase?: {id: number, expiryDate: string}}>({initialized: false, refresh: ()=>{}})

export const UserProvider = (props: {children: ReactNode})=>{
    const [profile, setProfile] = useState<DirectoryRow>()
    const [purchase,setPurchase] = useState<{id: number, expiryDate: string}>()
    const [userId, setUserId] = useState<string>()
    const [loggedIn, setLoggedIn] = useState<boolean>()
    const [initialized, setInitialized] = useState(false)
    const auth = useAuth()

    const loadData = ()=> axios.get("/api/directory/meta").then(({data})=>{
        console.log(data.contactInfo)
        
       
            setUserId(data.user)
            setProfile(data.contactInfo)
            setPurchase(data.purchase)
            setLoggedIn(!!data.user)
     
        
      }).catch(()=>{
        setUserId(undefined)
        setProfile(undefined)
        setLoggedIn(false)
        setPurchase(undefined)
        
      }).then(()=>{
        setInitialized(true)
      })
    useEffect(()=>{
        setInitialized(false)
        setLoggedIn(false)
        setUserId(undefined)
        setProfile(undefined)
        setPurchase(undefined)
       loadData()
       
    }, [auth.isSignedIn])
    useEffect(()=>{
       
    }, [])
    const refresh = ()=>{
       return  loadData()
    }
    return <UserContext.Provider value={{initialized, profile, userId, purchase, loggedIn, refresh}}>
        {props.children}
    </UserContext.Provider>
}