import React, {useCallback, useEffect, useRef} from "react";

interface Props<T> {
  className?: string;
  legend?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  readonly?: boolean
  value: T;
  border?: boolean;
  type?: string;
  name?: string;
  autoHeight?: boolean;
}

export const Input: React.FC<Props<unknown>> = (
  {
    className,
    legend,
    readonly,
    border,
    onChange,
    placeholder,
    type,
    name,
    value
  }) => {
  const onChangeListener = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    onChange && onChange(e);
  }, [onChange]);

  return (
    <div className={`${className && className} flex flex-col font-notoRegular`}>
      {legend && <legend className={"font-genshin"}>{legend}</legend>}
      <input
        className={`mt-2 pt-4 pd-4 p-5 placeholder-blackTint rounded-md ${border && "border-emailBg border-1" } ${border ? "focus:outline-focus" : "focus:outline-none"}`}
        readOnly={readonly}
        onChange={onChangeListener}
        value={String(value)}
        placeholder={placeholder}
        type={type}
        name={name} />
    </div>
  )
}

export const TextArea: React.FC<Props<unknown>> = (
  {
    className,
    legend,
    readonly,
    border,
    onChange,
    placeholder,
    value,
    name,
    type,
    autoHeight
  }) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  
  const autoSizeHandler = useCallback(() => {
    if (textAreaRef.current && autoHeight) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight + 8}px`;
      console.log("excuted");
    }
  }, [autoHeight]);

  const onChangeListener = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    onChange && onChange(e);
  }, [onChange]);

  useEffect(() => {
    autoSizeHandler();
  }, [value]);

  return (
    <div className={`${className && className} flex flex-col font-notoRegular`}>
      {legend && <legend className={"font-genshin"}>{legend}</legend>}
      <textarea
        className={`mt-2 pt-4 pd-4 p-5 h-40vh placeholder-blackTint resize-none rounded-md ${border ? "border-emailBg border-1" : "" } ${border ? "focus:outline-focus" : "focus:outline-none"}`}
        readOnly={readonly}
        onChange={onChangeListener}
        value={String(value)}
        placeholder={placeholder}
        rows={1}
        name={name}
        ref={textAreaRef} />
    </div>
  )
}