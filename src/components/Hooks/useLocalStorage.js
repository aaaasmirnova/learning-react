import { useEffect, useState } from "react";

export const useLocalStorage = (initialValue, key) => {
    
const data = localStorage.getItem(key);
const [value, setValue] = useState(data ? JSON.parse(data) : initialValue );

useEffect (() => {
localStorage.setItem(key, value);
}, [key, value])

return [value, setValue]
} 