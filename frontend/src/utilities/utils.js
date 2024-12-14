export const debouncefn= (fn,delay)=>{
    let timer= null;
    return (...args)=>{
        if(timer)clearTimeout(timer);
        timer= setTimeout(()=>{
            fn(...args);
        },delay)
    }
}