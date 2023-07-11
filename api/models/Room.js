import mongoose from 'mongoose';

const RoomSchema= new mongoose.Schema({

    name:{
        type: String,
        required:true
    },
    capacity:{
        
        type: String,
        required:true
    },
    owner:{

        type: String,
        required:true
    },
    mobile:{
        type: String,
        required:true
    },
    type:{
        type: String,
        required:true
    },
    city:{
        type: String,
        required:true
    },
    address:{
        type: String,
        required:true
    },
    distance:{
        type: String,
        required:true
    },    
    photos:{
        type: [String]        
    },
    
    desc:{
        type: String,
        // required:true
    },
    rating:{
        type: Number,
        min:0,
        max:5
    },
    rooms:{
        type: String,
        required:true        
    },
    cheapestPrice:{
        type: Number,
        required:true
    },
    deposite:{
        type: Number,
        required:true
    },
    area:{
        type: String,
        required:true
    },
    perRate:{
        type: String,
        required:true
    },
    ownType:{
        type: String        
    },
    featured:{
        type: Boolean,
        default:false
    }
});

export default mongoose.model("Room",RoomSchema);