import { ComponentProps, ReactNode } from 'react'

export interface IconButtonProps extends ComponentProps<'button'> {
  children: ReactNode
  ariaLabel: string
}
