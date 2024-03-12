import {
    FC,
    createContext,
    useContext,
    useState,
    useEffect,
    SetStateAction,
    Dispatch,
    ReactNode,
} from 'react'

type WithChildren = {
    children?: ReactNode
}

const SplashScreenContext = createContext<Dispatch<SetStateAction<number>> | undefined>(
    undefined
)

const SplashScreenProvider: FC<WithChildren> = ({ children }) => {
    const [count, setCount] = useState(0)
    let visible = count > 0

    useEffect(() => {
        const splashScreen = document.getElementById('splash-screen')

        // Show SplashScreen
        if (splashScreen && visible) {
            splashScreen.classList.remove('hidden')

            return () => {
                splashScreen.classList.add('hidden')
            }
        }

        // Hide SplashScreen
        let timeout: number
        if (splashScreen && !visible) {
            timeout = window.setTimeout(() => {
                splashScreen.classList.add('hidden')
            }, 3000)
        }

        return () => {
            clearTimeout(timeout)
        }
    }, [visible])

    return (
        <SplashScreenContext.Provider value={setCount}>
            {children}
        </SplashScreenContext.Provider>
    )
}

const LayoutSplashScreen: FC<{ visible?: boolean }> = ({ visible = true }) => {
    // Everything are ready - remove splashscreen
    const setCount = useContext(SplashScreenContext)

    useEffect(() => {
        if (!visible) {
            return
        }

        if (setCount) {
            setCount((prev) => {
                return prev + 1
            })
        }

        return () => {
            if (setCount) {
                setCount((prev) => {
                    return prev - 1
                })
            }
        }
    }, [setCount, visible])

    return null
}

export { SplashScreenProvider, LayoutSplashScreen }
