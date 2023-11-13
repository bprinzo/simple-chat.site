import { useEffect, useRef } from "react";

export const useChatScroll = (dep: any): any => {
  const ref = useRef<HTMLDivElement>();
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [dep]);
  return ref;
}