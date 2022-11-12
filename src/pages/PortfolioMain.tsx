import BasicLayout from "../layout/BasicLayout";
import ScrollNoti from "../components/ScrollNoti";
import scrollListener from "../utils/scrollListener";
import {useRef, useState} from "react";
import ThreeCamera from "../components/ThreeCamera";

const PortfolioMain = () => {
  const scrollY = useRef(0);
  const [showNoti, setShowNoti] = useState(true);
  scrollListener(() => {
    const currentHeight = window.scrollY;
    if (scrollY.current < currentHeight) {
      setShowNoti(false);
    }
    scrollY.current = currentHeight;
  });
  return(
    <BasicLayout>
      {showNoti && <ScrollNoti />}
      <ThreeCamera />
    </BasicLayout>
  )
}

export default PortfolioMain;