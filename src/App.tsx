import { useAuth0 } from '@auth0/auth0-react'
import CommonLayout from './components/CommonLayout.js'
import Dashboard from './features/weather/components/Dashboard.js'

export default function App() {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0()

  return (
    <CommonLayout>
      {isLoading ? (
        <p className="py-24 text-center font-mono text-xs text-[#82928a]">Checking session...</p>
      ) : isAuthenticated ? (
        <Dashboard />
      ) : (
        <section className="mx-auto max-w-md py-72 text-center">
          <h1 className="text-3xl font-semibold">Weather Dashboard</h1>
          <p className="mt-3 text-gray-600">Sign in with Auth0 to continue.</p>
          <button
            type="button"
            onClick={() => void loginWithRedirect()}
            className="mt-6 rounded-md bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800 hover:cursor-pointer"
          >
            Sign in
          </button>
        </section>
      )}
    </CommonLayout>
  )
}