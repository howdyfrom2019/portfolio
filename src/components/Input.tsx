import React, {useCallback, useState} from "react";

interface Props {
  className?: string;
  legend?: string;
  onChange?: (e?: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
}

export const Input: React.FC<Props> = ({ className, legend, onChange, placeholder}) => {
  const [value, setValue] = useState("");
  
  const onChangeListener = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    setValue(e.target.value);
    onChange && onChange(e);
  }, [onChange]);

  return (
    <div className={`${className && className} flex flex-col`}>
      {legend && <legend className={"font-genshin"}>{legend}</legend>}
      <input className={"mt-2 pt-4 p-5 font-regular placeholder-blackTint rounded-md border-emailBg border-1 focus:outline-focus"} onChange={onChangeListener} value={value} placeholder={placeholder} />
    </div>
  )
}

export const TextArea: React.FC<Props> = ({ className, legend, onChange, placeholder}) => {
  const [value, setValue] = useState("");

  const onChangeListener = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    setValue(e.target.value);
    onChange && onChange(e);
  }, [onChange]);

  return (
    <div className={`${className && className} flex flex-col`}>
      {legend && <legend className={"font-genshin"}>{legend}</legend>}
      <textarea className={"mt-2 pt-4 p-5 h-[50vh] font-regular placeholder-blackTint rounded-md border-emailBg border-1 focus:outline-focus resize-none"} onChange={onChangeListener} value={value} placeholder={placeholder} />
    </div>
  )
}