import mongoose from "mongoose"

const dbConnect=()=>{
    // const connectionParams={useNewUrlParser:true};
    mongoose.connect(process.env.DB)

    mongoose.connection.on("connected",()=>{
        console.log("Connected to database successfully");
    })

    mongoose.connection.on("error",(err)=>{
        console.log("error while connecting to database"+err);
    })

    mongoose.connection.on("disconnected",()=>{
        console.log("Mongodb connection disconnected");
    })

}

export default dbConnect