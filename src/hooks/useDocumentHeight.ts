import { useCallback, useState, useEffect } from "react";

const useDocumentHeight = () => {
  const getHeight = useCallback(
    () =>
      window.visualViewport ? window.visualViewport.height : window.innerHeight,
    [],
  );
  const [height, setHeight] = useState<number>(getHeight());

  useEffect(() => {
    const handleResize = () => {
      setHeight(getHeight());
    };

    window.addEventListener("resize", handleResize);

    window.addEventListener("orientationchange", handleResize);

    window.visualViewport?.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      window.visualViewport?.removeEventListener("resize", handleResize);
    };
  }, [getHeight]);

  return height;
};

export default useDocumentHeight;
