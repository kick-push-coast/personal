import { useEffect, useRef } from "react";

interface RegisteredRef {
    element: HTMLElement,
    callback: Function
}

export default function useClickOutside() {
    const registeredRefs = useRef<RegisteredRef[]>([]);

    function register(el: HTMLElement, fn: Function) {
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