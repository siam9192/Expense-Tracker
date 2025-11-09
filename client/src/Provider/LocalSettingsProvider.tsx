import React, { createContext, useContext, useState } from 'react'
import { AppLanguage, AppTheme, type AppSettings } from '../types/settings.type'

export const LocalSettingsProviderContext =  createContext<LocalSettingsProviderContextType|null>(null) 
export type LocalSettingsProviderContextType  =  {
   appSettings:AppSettings,
   setAppSettings:React.Dispatch<React.SetStateAction<AppSettings>>
} 

interface Props {
    children:React.ReactNode
}
function LocalSettingsProvider({children}:Props) {
  const [settings,setSettings] = useState<AppSettings>({
    theme:AppTheme.DARK,
    language:AppLanguage.English
  })
    
   return (
    <LocalSettingsProviderContext value={{appSettings:settings,setAppSettings:setSettings}}>
      {
        children
      }
    </LocalSettingsProviderContext>
   )
}

export default LocalSettingsProvider


export function useLocalSettingsProviderContext () {
    const context =  useContext(LocalSettingsProviderContext)
    if(!context) throw new Error("")
    return  context
}
