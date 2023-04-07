import axios from "axios"
import { Router, useRouter } from "next/router"
import { useCallback, useEffect, useState } from "react"

export default function usePageLoader(){
    const [loading, setLoading] = useState(false)
    const router= useRouter()
    const onRouteChangeStart = useCallback(() => {
        setLoading(true)
      }, [])
      const onRouteChangeStop = useCallback(() => {
        setLoading(false)
      }, [])
    useEffect(()=>{
        Router.events.on("routeChangeStart",onRouteChangeStart )
          Router.events.on("routeChangeComplete",onRouteChangeStop)
          Router.events.on("routeChangeError", onRouteChangeStop)
          return ()=>{
            Router.events.off("routeChangeStart", onRouteChangeStart)
            Router.events.off("routeChangeComplete", onRouteChangeStop)
            Router.events.off("routeChangeError", onRouteChangeStop)

          }
    }, [])
  
    useEffect(()=>{
      if(router.asPath=="/contactInfo"){
        return 
      }
      axios.get("/api/directory/meta").then(({data})=>{
        console.log(data.contactInfo)
        if(data.user){
          if(!data.contactInfo){
            console.log("Push ehere")
            router.push("/contactInfo")
          }
        }
      }).catch(()=>{
        
      })
    }, [router.asPath])
    return loading
}