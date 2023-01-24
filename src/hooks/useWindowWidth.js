import { useState, useEffect } from "react";
import debounce from "lodash.debounce";

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(undefined);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", debounce(handleResize, 20));

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { width: windowWidth, isMobile: windowWidth < 640 };
};

export default useWindowWidth;
