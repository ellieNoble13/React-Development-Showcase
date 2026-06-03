import {useState, useEffect} from "react";

export function useWindowSize(){
    const [windowSize, setWindowSize] = useState(
        {
            width: window.innerWidth,
            height: window.innerHeight,
        }
    )
    useEffect(  () => {
        const handleSize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        window.addEventListener("resize", handleSize);
            handleSize()
            return () => {window.removeEventListener("resize", handleSize);}
        }
    }
)
    return windowSize;
}
