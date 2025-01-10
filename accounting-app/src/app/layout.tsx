import { LayoutParam } from '@/model/types'
import './globals.css'

export default function Layout({children}:LayoutParam) {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  )
}