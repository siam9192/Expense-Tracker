import React, { createContext, useContext, useState } from 'react'


export const CurrentUserProviderContext =  createContext<CurrentUserProviderContextType|null>(null) 
export type CurrentUserProviderContextType  =  {
   user:null,
   settings:null,
   isLoading:boolean
   setUser:React.Dispatch<React.SetStateAction<null>>
   setSettings:React.Dispatch<React.SetStateAction<null>>,
   setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
} 

interface Props {
    children:React.ReactNode
}
function CurrentUserProvider({children}:Props) {
  const [user,setUser] = useState<null>(null)
  const [settings,setSettings] = useState(null)
  const [isLoading,setIsLoading] = useState(true)

   return (
    <CurrentUserProviderContext value={{
        user,
        settings,
        isLoading,
        setUser,
        setSettings,
        setIsLoading
    }}>
      {
        children
      }
    </CurrentUserProviderContext>
   )
}

export default CurrentUserProvider


export function useCurrentUserProviderContext () {
    const context =  useContext(CurrentUserProviderContext)
    if(!context) throw new Error("")
    return  context
}
