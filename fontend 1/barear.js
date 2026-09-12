export const tokenrer =()=>{
    try {
        const localtoken = localStorage.getItem("token")
        if(!localtoken){
            return null
        }
        return `bearer ${localtoken}`;
        
    } catch (error) {
        console.log(error)
        return null;
    }
}

export const authBari =()=>{
    try {

         const localtoken = localStorage.getItem("AUTHtoken")
        if(!localtoken){
            return null
        }
        return `bearer ${localtoken}`;
        
    } catch (error) {
        console.log(error)
        return null
    }
}