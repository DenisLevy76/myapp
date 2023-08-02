import DiceBox from '@3d-dice/dice-box'
import { DisplayResults } from '@3d-dice/dice-ui'
import { useEffect, useState } from 'react'

export const useDice = (targetId: string) => {
  const [Dice, setDice] = useState(null)
  const [Display, setDisplay] = useState(null)

  useEffect(() => {
    if (targetId) setDice(
      new DiceBox(`#${targetId}`, {
        assetPath: '/assets/',
        id: 'dice-canvas',
        theme: 'smooth',
        scale: 5.5,
      })
    )

    setDisplay(new DisplayResults('#results'))
  }, [targetId])

  useEffect(() => {
    if (Dice) Dice.init()
  }, [Dice])

  return { Dice, Display }
}
