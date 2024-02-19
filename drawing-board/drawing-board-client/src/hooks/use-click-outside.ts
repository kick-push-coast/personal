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
        console.log(e.target);
        registeredRefs.current.forEach(ref => {
            if (ref.element && isClickOutside(e, ref.element)) {
                ref.callback();
            }
        })
    }

    function isClickOutside(e: MouseEvent, el: HTMLElement) {
        // Check if click is on non-HTML element OR on HTML element outside of registered element
        return !(e.target instanceof HTMLElement) || (e.target instanceof HTMLElement && !el.contains(e.target))
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