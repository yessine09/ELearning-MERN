import './index.css';

type CustomInputProps = {
  placeholder?: string;
  type: 'email' | 'string' | 'password' | 'text' | 'checkbox' | 'date';
  isPasswordShown?: boolean;
  className?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

};

export default function CustomInput({ placeholder, isPasswordShown = false, className, type,onChange, ...props }: CustomInputProps) {
  return (
    <input type={isPasswordShown ? "text" : type} placeholder={placeholder} className={className} autoComplete="off" {...props} onChange={onChange} />
  );
}
