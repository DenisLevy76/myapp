import { useEffect, useState } from 'react'
import { IconButton } from '../IconButton'

export interface IDiceButtonProps {
  sides: number
  image: string
  value?: number
  onChange: (sides: number, amount: number) => void
}

export const DiceButton: React.FC<IDiceButtonProps> = ({
  image,
  sides,
  value = 0,
  onChange,
}) => {
  const [amount, setAmount] = useState<number>(value)

  useEffect(() => {
    onChange(sides, amount)
  }, [amount, sides])

  useEffect(() => {
    setAmount(value)
  }, [value])
  
  return (
    <IconButton
      className='relative'
      ariaLabel={`Adicionar 1d${sides} na rolagem`}
      onClick={() => setAmount(amount + 1)}
    >
      <img
        src={image}
        className='w-12'
        alt=''
      />
      {amount > 0 && (
        <p className='absolute right-0 bottom-0 bg-white rounded-full px-2 bg-opacity-40'>
          {amount}
        </p>
      )}
    </IconButton>
  )
}
