import { Metadata } from 'next'
import Nutria from './Nutria'
import Script from 'next/script'


export const metadata: Metadata = {
}

export default function Home() {

  return (
    <div className="main">
      <div id="container"></div>
      <Script
        src="https://cdn.jsdelivr.net/npm/@nutriadoc/nutriadoc@0.0.4/dist/nutria.umd.js"
        // src="http://localhost:5173/dist/nutria.umd.js"
        onLoad={Nutria}  
      />
    </div>
  )
}
