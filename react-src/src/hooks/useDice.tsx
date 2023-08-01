import DiceBox from '@3d-dice/dice-box'
import { useEffect, useState } from 'react'

export const useDice = (targetId: string) => {
  const [Dice, setDice] = useState(null)
  
  useEffect(() => {
    setDice(
      new DiceBox(`#${targetId}`, {
        assetPath: '/assets/',
        id: "dice-canvas",
        theme: 'rock',
      })
    )

  }, [targetId])

  return { Dice }
}
