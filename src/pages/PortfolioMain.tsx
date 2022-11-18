import BasicLayout from "../layout/BasicLayout";
import ScrollNoti from "../components/ScrollNoti";
import scrollListener from "../utils/scrollListener";
import {useRef, useState} from "react";
import FrontEndPF from "../components/FrontEndPF";
import {Routes, Route} from "react-router-dom";

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
    <>
      <BasicLayout>
        {showNoti && <ScrollNoti />}
        <Routes>
          <Route index element={<FrontEndPF />} />
          <Route path={"/front-end"} element={<FrontEndPF />} />
        </Routes>
      </BasicLayout>
    </>
  )
}

export default PortfolioMain;