import './globals.css'
import { ReactNode } from 'react'
import RootLayout from './RootLayout' // تأكد من المسار الصحيح



export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  )
}
