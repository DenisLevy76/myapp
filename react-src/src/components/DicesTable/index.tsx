import { useDice } from '@/hooks/useDice'
import { DiceButton } from '../DiceButton'
import { useEffect, useState } from 'react'
import { IconButton } from '../IconButton'
import { Play, RotateCcw } from 'lucide-react'
import { Button } from '../ui/button'

const initialDices = {
  4: 0,
  6: 0,
  8: 0,
  10: 0,
  12: 0,
  20: 0,
  100: 0,
}

export const DicesTable: React.FC = () => {
  const { Dice } = useDice('dice-container')

  const [allDices, setAllDices] = useState(initialDices)

  const diceText = Array.from(Object.entries(allDices))
    .filter(([, amount]) => amount > 0)
    .map(([sides, amount]) => `${amount}d${sides}`)

  useEffect(() => {
    if (Dice) {
      Dice.init()
    }
  }, [Dice])

  return (
    <div className='flex flex-col items-center justify-center'>
      

      <div className='relative'>
        <img
          src='/render.png'
          alt='dice tray'
          className='w-[400px]'
        />
        <div
          id='dice-container'
          className='absolute top-0 left-0 w-full h-full p-8'
        ></div>
      </div>

      <div className='flex'>
        {Array.from(Object.entries(allDices)).map(([sides]) => (
          <DiceButton
            key={sides}
            image={`/dices/d${sides}.png`}
            sides={Number(sides)}
            value={allDices[sides]}
            onChange={(sides, amount) =>
              setAllDices({ ...allDices, [sides]: amount })
            }
          />
        ))}
      </div>

      <div className='grid grid-cols-2 gap-4 w-full mt-4'>
        <button className='p-4 m-w-full bg-slate-700 rounded flex items-center justify-center hover:bg-green-500 hover:bg-opacity-40 transition-colors' onClick={() => Dice.roll(diceText)}>Rolar</button>
        <button className='p-4 m-w-full bg-slate-700 rounded flex items-center justify-center hover:bg-red-500 hover:bg-opacity-40 transition-colors' onClick={() => setAllDices(initialDices)}>Limpar</button>
      </div>
    </div>
  )
}
