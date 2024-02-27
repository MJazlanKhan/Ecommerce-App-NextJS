import mongoose from "mongoose";


const URL = 'mongodb+srv://jazlan:Jazlan@cluster0.ppffegt.mongodb.net/?retryWrites=true&w=majority'
const connectToMongo = async () => {
  try {
    const res = await mongoose.connect(URL);
    if(res){
        console.log("connection sucessfull")
    }
   } catch (error) {
    console.log(error)
   }
}

export default connectToMongo