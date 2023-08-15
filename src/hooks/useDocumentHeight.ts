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

    window.visualViewport?.addEventListener("resize", handleResize);

    return () => {
      window.visualViewport?.removeEventListener("resize", handleResize);
    };
  }, [getHeight]);

  return height;
};

export default useDocumentHeight;
