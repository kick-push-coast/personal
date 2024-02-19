import { useEffect, useRef } from "react";

interface RegisteredRef {
    element: HTMLElement,
    callback: Function
}

export default function useClickOutside() {
    // const [registeredRefs, setRegisteredRefs] = useState<RegisteredRef[]>([]);
    const registeredRefs = useRef<RegisteredRef[]>([]);

    function register(el: HTMLElement, fn: Function) {
        // setRegisteredRefs([...registeredRefs].concat([{element: el, callback: fn}]));
        registeredRefs.current.push({element: el, callback: fn});
    }
    
    function handleClickOutside(e: MouseEvent) {
        registeredRefs.current.forEach(ref => {
            if (ref.element &&  e.target instanceof HTMLElement && !ref.element.contains(e.target)) {
                ref.callback();
            }
        })
    }

    useEffect(() => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [registeredRefs]);

    return register;
}