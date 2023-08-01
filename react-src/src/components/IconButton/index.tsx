import { TooltipComponent } from '../TooltipComponent'
import { IconButtonProps } from './types'

export const IconButton: React.FC<IconButtonProps> = ({
  ariaLabel,
  children,
  className,
  ...others
}) => {
  return (
    <TooltipComponent content={ariaLabel}>
      <button
        aria-label={ariaLabel}
        className={`border-none bg-transparent text-center outline-none ${className}`}
        {...others}
      >
        {children}
      </button>
    </TooltipComponent>
  )
}
