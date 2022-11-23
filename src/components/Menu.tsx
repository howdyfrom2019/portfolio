import React, {useCallback, useEffect, useRef, useState} from "react";
import BG1 from "../assets/png/portfolio2.png";
import BG2 from "../assets/png/portfolio12.png";
import BG3 from "../assets/png/portfolio22.png";
import BG4 from "../assets/png/portfolio25.png";
import BG5 from "../assets/png/portfolio38.png";
import {ImageLoader} from "../utils/imageloader";

interface MenuProps {
  onClose?: (e?: React.MouseEvent) => void;
  close: boolean;
}

const MENU_ITEM_CLASSNAME = "text-gray hover:text-black uppercase whitespace-nowrap text-4xl cursor-pointer transition-all";

const Menu: React.FC<MenuProps> = ({ onClose, close }) => {
  const menuRef = useRef<HTMLMenuElement>(null);
  const [imgSrc, setImgSrc] = useState(BG1);

  const onMouseOverHandler = useCallback(async (e: React.MouseEvent, i: number) => {
    e.preventDefault();
    if (i === 2) setImgSrc(BG2);
    else if (i === 3) setImgSrc(BG3);
    else if (i === 4) setImgSrc(BG4);
    else if (i === 5) setImgSrc(BG5);
    else {
      setImgSrc(BG1);
    }
  }, []);

  const closeMenu = useCallback(() => {
    if (menuRef.current) {
      menuRef.current.style.transform = "translateX(100%)";
      if (onClose) setTimeout(() => onClose(),540);
    }
  }, [onClose]);

  useEffect(() => {
    if (menuRef.current) menuRef.current.style.transform = "translateX(0)";
  }, [close]);

  return (
    <menu className={`fixed top-0 z-1000 flex w-screen h-screen animate-slideIn transition-all duration-540`} ref={menuRef}>
      <figure className={"relative p-0 bg-gray flex-5"}>
        <img className={"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover h-1/2 max-w-70"} src={imgSrc} alt={"represent"} />
      </figure>
      <article className={"relative p-2vmax flex-8 bg-white"}>
        <button className={"absolute top-2vmax right-2vmax text-4xl outline-0 bg-none z-1001"} onClick={closeMenu}>CLOSE</button>
        <section className={"flex flex-col h-full max-h-px-712 justify-between"}>
          <span onMouseOver={(e) => onMouseOverHandler(e, 1)} className={MENU_ITEM_CLASSNAME}>portfolio 2022</span>
          <span onMouseOver={(e) => onMouseOverHandler(e, 2)} className={MENU_ITEM_CLASSNAME}>Mintty</span>
          <span onMouseOver={(e) => onMouseOverHandler(e, 3)} className={MENU_ITEM_CLASSNAME}>internship</span>
          <span onMouseOver={(e) => onMouseOverHandler(e, 4)} className={MENU_ITEM_CLASSNAME}>ticket taker for msi</span>
          <span onMouseOver={(e) => onMouseOverHandler(e, 5)} className={MENU_ITEM_CLASSNAME}>parrot lamp</span>
          <span onMouseOver={(e) => onMouseOverHandler(e, 6)} className={MENU_ITEM_CLASSNAME}>tasting ventures</span>
          <span onMouseOver={(e) => onMouseOverHandler(e, 7)} className={MENU_ITEM_CLASSNAME}>personal infos</span>
        </section>
      </article>
    </menu>
  )
}

export default Menu;