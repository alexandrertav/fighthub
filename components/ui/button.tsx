import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "font-display inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-bold uppercase tracking-wide transition-colors disabled:pointer-events-none disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none",
  {
    variants: {
      variant: {
        default: 'bg-[#E11D48] text-[#F2F2F2] hover:bg-[#C01638] active:bg-[#A01230] disabled:bg-[#4A1A24] disabled:text-[#F2F2F2] focus:ring-2 focus:ring-[#E11D48] focus:ring-offset-2 focus:ring-offset-[#141418] rounded-lg',
        destructive:
          'bg-[#E11D48] text-[#F2F2F2] hover:bg-[#C01638] active:bg-[#A01230] disabled:bg-[#4A1A24] disabled:text-[#F2F2F2] focus:ring-2 focus:ring-[#E11D48] rounded-lg',
        outline:
          'border border-[#1C1C20] bg-transparent text-[#F2F2F2] hover:bg-[#141418] hover:border-[#2C2C30] active:bg-[#1C1C20] disabled:border-[#1C1C20] disabled:text-[#4A4A52] focus:ring-2 focus:ring-[#E11D48] rounded-lg',
        secondary:
          'bg-[#141418] text-[#F2F2F2] border border-[#1C1C20] hover:bg-[#1C1C20] hover:border-[#2C2C30] disabled:bg-[#141418] disabled:text-[#4A4A52] focus:ring-2 focus:ring-[#1C1C20] rounded-lg',
        ghost:
          'bg-transparent text-[#808088] hover:bg-[#141418] hover:text-[#F2F2F2] disabled:text-[#4A4A52] rounded-lg',
        link: 'font-ui normal-case tracking-normal text-[#E11D48] hover:text-[#C01638] underline-offset-4 hover:underline disabled:text-[#4A4A52]',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 text-xs px-3',
        lg: 'h-14 px-6 text-base',
        xl: 'h-16 px-8 text-lg',
        icon: 'size-10',
        'icon-sm': 'size-8',
        'icon-lg': 'size-14',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
