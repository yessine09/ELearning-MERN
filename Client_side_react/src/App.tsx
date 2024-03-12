import { FC, ReactNode, Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { LayoutProvider } from './helpers/LayoutProvider'
import { LayoutSplashScreen } from './helpers/splashScreen'
import StackProvider, { useStack } from './contexts/Stack'

type StackMapProps = {
  renderItem: (item: ReactNode, index: number) => ReactNode;
};

export const StackMap: FC<StackMapProps> = ({ renderItem }) => {
  const { items } = useStack();
  return <>{items.map(renderItem)}</>;
};

function App() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <LayoutProvider>
        <StackProvider>
          <StackMap renderItem={(item, index) => <div key={index}>{item}</div>} />
          <Outlet />
        </StackProvider>
      </LayoutProvider>
    </Suspense>
  )
}

export default App
