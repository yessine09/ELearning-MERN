import { FC, createContext, useContext, ReactNode } from 'react'
const I18N_CONFIG_KEY = import.meta.env.VITE_I18N_CONFIG_KEY || 'i18nConfig'

type WithChildren = {
  children?: ReactNode
}

type Props = {
  selectedLang: 'en' | 'fr' | 'ar'
}
const initialState: Props = {
  selectedLang: 'en',
}

function getConfig(): Props {
  const ls = localStorage.getItem(I18N_CONFIG_KEY)
  if (ls) {
    try {
      return JSON.parse(ls) as Props
    } catch (er) {
      console.error(er)
    }
  }
  return initialState
}

// Side effect
export function setLanguage(lang: string) {
  localStorage.setItem(I18N_CONFIG_KEY, JSON.stringify({ selectedLang: lang }))
  window.location.reload()
}

const I18nContext = createContext<Props>(initialState)

const useLang = () => {
  return useContext(I18nContext).selectedLang
}

const I18nProvider: FC<WithChildren> = ({ children }) => {
  const lang = getConfig()
  return <I18nContext.Provider value={lang}>{children}</I18nContext.Provider>
}

export { I18nProvider, useLang }
