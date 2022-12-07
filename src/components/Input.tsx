import React, {useCallback} from "react";

interface Props<T> {
  className?: string;
  legend?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  readonly?: boolean
  value: T;
  border?: boolean;
  fixHeight?: string;
}

export const Input: React.FC<Props<unknown>> = ({ className, legend, readonly, border, onChange, placeholder, value}) => {
  const onChangeListener = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    onChange && onChange(e);
  }, [onChange]);

  return (
    <div className={`${className && className} flex flex-col font-notoRegular`}>
      {legend && <legend className={"font-genshin"}>{legend}</legend>}
      <input className={`mt-2 pt-4 pd-4 p-5 placeholder-blackTint rounded-md ${border && "border-emailBg border-1" } ${border ? "focus:outline-focus" : "focus:outline-none"}`} readOnly={readonly} onChange={onChangeListener} value={String(value)} placeholder={placeholder} />
    </div>
  )
}

export const TextArea: React.FC<Props<unknown>> = ({ className, legend, readonly, border, onChange, placeholder, value, fixHeight }) => {
  const onChangeListener = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    onChange && onChange(e);
  }, [onChange]);

  return (
    <div className={`${className && className} flex flex-col font-notoRegular`}>
      {legend && <legend className={"font-genshin"}>{legend}</legend>}
      <textarea className={`mt-2 pt-4 pd-4 p-5 ${fixHeight ? `h-full` : "h-40vh" } placeholder-blackTint resize-none rounded-md ${border && "border-emailBg border-1" } ${border ? "focus:outline-focus" : "focus:outline-none"}`} readOnly={readonly} onChange={onChangeListener} value={String(value)} placeholder={placeholder} />
    </div>
  )
}