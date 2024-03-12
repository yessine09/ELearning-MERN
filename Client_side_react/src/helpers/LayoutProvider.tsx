import { FC, createContext, useContext, useState, useEffect, ReactNode } from 'react'

type WithChildren = {
  children?: ReactNode
}
const LayoutContext = createContext({
  setLayout: () => { },
})
const enableSplashScreen = () => {
  const splashScreen = document.getElementById('splash-screen')
  if (splashScreen) {
    splashScreen.style.setProperty('display', 'flex')
  }
}

const disableSplashScreen = () => {
  const splashScreen = document.getElementById('splash-screen')
  if (splashScreen) {
    splashScreen.style.setProperty('display', 'none')
  }
}

const LayoutProvider: FC<WithChildren> = ({ children }) => {


  const setLayout = () => {
    enableSplashScreen()
    const bodyClasses = Array.from(document.body.classList)
    bodyClasses.forEach((cl) => document.body.classList.remove(cl))


    setTimeout(() => {
      disableSplashScreen()
    }, 500)
  }

  useEffect(() => {
    disableSplashScreen()
  }, [])
  const value = {
    setLayout,
  }
  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
}

export { LayoutContext, LayoutProvider }

export function useLayout() {
  return useContext(LayoutContext)
}
