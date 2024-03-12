import { ReactNode } from 'react';

type SubmitErrorsProps = {
  children: ReactNode;
};

export default function Button({ children }: SubmitErrorsProps) {
  return <span className=" text-fancyBlue text-left mt-1">{children}</span>;
}
