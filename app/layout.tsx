import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'Spin Accelerator',
  description: 'Spin Accelerator',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>

<script type="text/javascript">
var sc_project=13162893; 
var sc_invisible=1; 
var sc_security="b9cda7c5"; 
</script>
<script type="text/javascript"
src="https://www.statcounter.com/counter/counter.js"
async></script> 
        
      </head>

      <body>
        {children}

      </body>
    </html>
  )
}
