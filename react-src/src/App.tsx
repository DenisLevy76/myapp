import { useEffect } from 'react'
import { Initiative } from './Pages/Initiative'
import { DicesTable } from './components/DicesTable'
import { storage } from "@neutralinojs/lib"

function App() {
  useEffect(() => {
    storage.getData('dicecolor').then((data) => console.log('kkkk', data)).catch(e => console.error('merad', e))
  }, [])
  
  return <div className='flex h-screen items-center justify-center gap-8'>
    <Initiative />
    <DicesTable  />
  </div>
}

export default App
