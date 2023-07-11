import Room from "../models/Room.js";


export const createRoom = async (req,res,next)=>{
   
    const photos=[String];
    
    for (let index = 0; index < req.files.length; index++) {
        photos[index]=req.files[index].path;
        
    }
   const name=req.body.name;
   const type=req.body.type;
   const city=req.body.city;
   const capacity=req.body.capacity;
   const Owner=req.body.owner;
   const mobile=req.body.mobile;
   const address=req.body.address;
   const distance=req.body.distance;
   const desc=req.body.desc;
   const rating=req.body.rating;
   const cheapestPrice=req.body.cheapestPrice;
   const deposite=req.body.deposite;
   const area=req.body.area;
   const perRate=req.body.perRate;
   const ownerType=req.body.ownerType;
   const rooms=req.body.rooms;
   
    const newRoom=new Room({photos:photos,name:name,type:type,city:city,
        capacity:capacity,owner:Owner,mobile:mobile,
        address:address, distance:distance,desc:desc,
        rating:rating,cheapestPrice:cheapestPrice,deposite:deposite,
        area:area,perRate:perRate,ownerType:ownerType,rooms:rooms

    });

        
    
    try{
        const savedRoom = await newRoom.save();
        res.status(200).json(savedRoom);
    }catch(err){
        res.status(500).json(err);

    }
};

export const updateRoom = async (req,res,next)=>{
    try{
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id,{$set: req.body},{new : true});
        res.status(200).json(updatedRoom);
    }catch(err){
        res.status(500).json(err);

    }
};

export const deleteRoom = async (req,res,next)=>{
    try{
        await Room.findByIdAndDelete(req.params.id);
       res.status(200).json("Room has been deleted!");
   }catch(err){
       res.status(500).json(err);

   }
};

export const getRoom = async (req,res,next)=>{
    try{
        const room = await Room.findById(req.params.id);
        res.status(200).json(room);
    }catch(err){
       next(err);
        
    }
};

export const getAllRooms = async (req,res,next)=>{
  const {  size,...others}= req.query;
    try{
        //gt=greater than and lt = less than mongodb query
        const rooms = await Room.find({
            ...others            
            
        }).limit(size);
        res.status(200).json(rooms);
    }catch(err){
        next(err);
        
    }
   
};

export const countByCity = async (req,res,next)=>{
    //to get Rooms accourding to multiple city name
    const cities= req.query.cities.split(",");
    try{
        const list = await Promise.all(cities.map(city => {
            return Room.countDocuments({city:city});
        }));
        res.status(200).json(list);
    }catch(err){
        res.status(500).json(err);
        
    }
}

export const countByType = async (req,res,next)=>{
    
    try{
        const houseCount=await Room.countDocuments({type:"House"});
        const apartmentCount= await Room.countDocuments({type:"Apartment"});
        const hostelCount=await Room.countDocuments({type:"Hostel"});
        
    
        res.status(200).json([
            {type:"House",count:houseCount},
            {type:"Apartment",count:apartmentCount},
            {type:"Hostel",count:hostelCount},
           
        ]);
    }catch(err){
        next(err);
        
    }
};


export const uploadphoto = async (req,res,next)=>{
  
    try{
        const image = await Room.findById(req.params.id);

        res.status(200).json(image);
    }catch(err){
       next(err);
        
    }
};
