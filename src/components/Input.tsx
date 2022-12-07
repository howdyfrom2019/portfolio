import React, {useCallback, useState} from "react";

interface Props {
  className?: string;
  legend?: string;
  onChange?: (e?: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
}

const Input: React.FC<Props> = ({ className, legend, onChange, placeholder}) => {
  const [value, setValue] = useState("");
  
  const onChangeListener = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    setValue(e.target.value);
    onChange && onChange(e);
  }, [onChange]);

  return (
    <div className={"flex flex-col"}>
      {legend && <legend className={"font-genshin"}>{legend}</legend>}
      <input className={"pt-4 p-5"} onChange={onChangeListener} value={value} placeholder={placeholder} />
    </div>
  )
}

export default Input;