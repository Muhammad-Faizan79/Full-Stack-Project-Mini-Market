import mongoose from "mongoose"
import{setServers} from "node:dns/promises"
setServers(["8.8.8.8", "1.1.1.1"])
const conectionDb = async ()=>{
    try {
       await mongoose.connect(process.env.MongoDb_URI)
        .then(()=>{
            console.log("mongo conected!" )
        })
    } catch (error) {
        console.log(`mogoDb conected ${error.message}`)
    }

}

export default conectionDb