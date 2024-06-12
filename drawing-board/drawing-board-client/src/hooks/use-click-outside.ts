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
    
    function handleClickOutside(e: MouseEvent | KeyboardEvent) {
        registeredRefs.current.forEach(ref => {
            if (ref.element && isClickOutside(e, ref.element)) {
                ref.callback();
            }
        })
    }

    function isClickOutside(e: MouseEvent | KeyboardEvent, el: HTMLElement) {
        if (e instanceof KeyboardEvent && e.key !== 'Enter') {
            return false;
        } else {
            return e.target instanceof Node && !el.contains(e.target);
        }
    }

    useEffect(() => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.addEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleClickOutside);
        document.addEventListener("keydown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleClickOutside);
        };
    }, [registeredRefs]);

    return register;
}