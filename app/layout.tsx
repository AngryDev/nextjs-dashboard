import React from 'react'
import '@/app/ui/global.css'
import { inter } from '@/app/ui/fonts'

export default function RootLayout ({ children }: { children: React.ReactNode }) {

  return (
    <html lang='en'>
      <body className={`${inter.className} antialiased`}>
        <div className='relative h-16  bg-slate-400 '>
          <h1 className='text-white font-bold absolute top-1/2 left-1/2 text-center transform -translate-x-1/2 -translate-y-1/2 '>
            Hola Chiquitin!!
          </h1>
        </div>
        {children}
      </body>
    </html>
  )
}
