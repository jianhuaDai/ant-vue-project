
export const setStorage=(obj)=>{
    window.localStorage.setItem(obj.keys()[0], JSON.stringify(obj[obj.keys()[0]]))
};
export const getStorage=(param)=>{
    return JSON.parse(window.localStorage.getItem(param))
}