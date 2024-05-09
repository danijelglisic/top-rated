interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}
const Input = ({ value, onChange, placeholder }: InputProps) => {
  return (
    <input
      className="input"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
};

export default Input;
