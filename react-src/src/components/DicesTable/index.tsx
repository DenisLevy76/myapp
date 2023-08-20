import { useDice } from '@/hooks/useDice'
import { DiceButton } from '../DiceButton'
import { useEffect, useState } from 'react'
import { storage } from '@neutralinojs/lib'
import { Checkbox } from '../ui/checkbox'
import { Input } from '../ui/input'
import { TooltipComponent } from '../TooltipComponent'

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
  const { Dice, Display, DP } = useDice('dice')

  const [allDices, setAllDices] = useState(initialDices)
  const [color, setColor] = useState<string>('#410056')
  const [shouldSum, setShouldSum] = useState<boolean>(false)
  const [disadvantage, setDisadvantage] = useState<boolean>(false)
  const [bonus, setBonus] = useState<string>('')

  const diceText = Array.from(Object.entries(allDices))
    .filter(([, amount]) => amount > 0)
    .map(
      ([sides, amount]) =>
        `${amount}d${sides}${!shouldSum ? (disadvantage ? 'kl1' : 'kh1') : ''}`
    )

  if (Dice) {
    Dice.onRollComplete = (results) => {
      const rerolls = DP.handleRerolls(results)
      if (rerolls.length) {
        rerolls.forEach((roll) => Dice.add(roll, roll.groupId))
        return rerolls
      }
      const finalResults = DP.parseFinalResults(results)

      Display.showResults(finalResults)
    }
  }

  const getColors = async () => {
    try {
      const storageDiceColor = await storage.getData('dicecolor')

      if (storageDiceColor) {
        setColor(storageDiceColor)
      }
    } catch (error) {
      console.error('este errror aqui',error)
    }
  }

  useEffect(() => {
    getColors()
  }, [])

  return (
    <div className='relative flex flex-col items-center justify-center'>
      <div className='relative'>
        <img
          src='/render.png'
          alt='dice tray'
          className='w-[400px]'
        />
        <div
          id='results'
          className='absolute w-full bottom-16 left-0 text-black text-sm leading-relaxed'
        ></div>
        <div id='dice' />
      </div>

      <div className='flex items-center justify-center py-4'>
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
        <input
          type='color'
          className='w-4 border-none bg-transparent'
          value={color}
          onChange={async (event) => {
            setColor(event.target.value)
            await storage.setData('dicecolor', event.target.value)
          }}
        />
      </div>
      <div className='grid grid-cols-2 gap-4 w-full'>
        <button
          className='p-4 m-w-full bg-slate-700 rounded flex items-center justify-center hover:bg-green-500 hover:bg-opacity-40 transition-colors'
          onClick={() => {
            Dice.show().roll(DP.parseNotation(`${diceText.join()}${bonus}`), {
              themeColor: color,
            })
            Display.clear()
          }}
        >
          Rolar
        </button>
        <button
          className='p-4 m-w-full bg-slate-700 rounded flex items-center justify-center hover:bg-red-500 hover:bg-opacity-40 transition-colors'
          onClick={() => {
            setAllDices(initialDices)
            Display.clear()
          }}
        >
          Limpar
        </button>
      </div>
      <div className='flex justify-center items-center gap-4 my-4'>
        <div className='flex flex-col gap-2'>
          <div className='flex gap-2'>
            <Checkbox
              id='shouldSum'
              checked={shouldSum}
              onCheckedChange={(value) => setShouldSum(Boolean(value))}
            />
            <label
              htmlFor='shouldSum'
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              Somar valores
            </label>
          </div>
          <div className='flex gap-2'>
            <Checkbox
              id='shouldSum'
              checked={disadvantage}
              onCheckedChange={(value) => setDisadvantage(Boolean(value))}
            />
            <label
              htmlFor='shouldSum'
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              Desvantagem
            </label>
          </div>
        </div>

        <div className='flex items-center'>
          <TooltipComponent
            content={
              <p>
                Ex.: Escreva <i className='italic'>"+15"</i>, sem as aspas, para somar 15 no resultado dos dados. Acesse{' '}
                <a
                  href='https://help.roll20.net/hc/en-us/articles/360037773133-Dice-Reference#DiceReference-DiceMatchingmt'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-400'
                >help.roll20.net</a> para saber mais.
              </p>
            }
          >
            <Input
              placeholder='Query ex.: +15'
              prefix={diceText.join()}
              id='bonus'
              value={bonus}
              onChange={(event) => setBonus(event.target.value)}
            />
          </TooltipComponent>
        </div>
      </div>
    </div>
  )
}
