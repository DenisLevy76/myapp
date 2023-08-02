import { Initiative } from './Pages/Initiative'
import { DicesTable } from './components/DicesTable'

function App() {
  return <div className='flex h-screen items-center justify-center gap-8'>
    <Initiative />
    <DicesTable  />
  </div>
}

export default App
