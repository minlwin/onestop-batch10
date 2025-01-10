import './globals.css'

export default function Layout({children}:{children: Readonly<React.ReactNode>}) {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  )
}