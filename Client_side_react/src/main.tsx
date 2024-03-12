import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ToastContainer } from 'react-toastify'
import AuthProvider from './contexts/Auth'
import { I18nProvider } from './features/multilanguages/i18nProvider'
import './index.css'
import { AppRoutes } from './routes/AppRoutes'

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <I18nProvider>
      <AuthProvider>
        <ToastContainer />
        <AppRoutes />
      </AuthProvider >
    </I18nProvider>
  </QueryClientProvider>




)
