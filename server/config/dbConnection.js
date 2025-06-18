import mongoose from "mongoose";

mongoose.set('strictQuery',false)

const connectionToDB = async () => {
    try {
        const {connection} = await mongoose.connect(process.env.MONGO_URI);
        
        if(connection){
            console.log(`Connected to mongodb : ${connection.host}`)
        }
        
    } catch (e) {
        console.log("error",e);
        process.exit(1)
    }
}

export default connectionToDB;