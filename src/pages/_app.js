import { AuthProvider } from '../context/authContext'
import { Analytics } from '@vercel/analytics/react';
import '@/styles/globals.css'
import 'socket.io-client/dist/socket.io.js'



export default function App({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
      <Analytics />
    </>

  )
}
