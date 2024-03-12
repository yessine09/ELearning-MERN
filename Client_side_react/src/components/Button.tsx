import { ReactNode } from 'react'

type SubmitButtonProps = {
  children: ReactNode
  type: 'submit' | 'button'
  clickHandler?: () => void
}

export default function Button({ children, type, clickHandler }: SubmitButtonProps) {
  return (
    <button
      type={type}
      onClick={clickHandler}
      className="flex w-full items-center justify-center rounded-lg bg-purple-800 px-8 py-2 hover:bg-purple-700"
    >
      {children}
    </button>
  )
}
