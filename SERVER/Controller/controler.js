const userCollection=require('../Model/userSchema')
const bcrypt=require('bcrypt')
const jwt= require('jsonwebtoken')


const addUser=async(req,res)=>{
    try{
      const {user}=req.body
      const userExists=await userCollection.findOne({email:user.email})
      if(userExists){
        res.status(200).json({message:'Email Already Exists'})
        return
      }
      const password1= await bcrypt.hash(user.password,10)
      user.password=password1
      await userCollection.insertMany(user)
      res.status(200).json({message:'User Registered Successfully'})
    }catch(err){
        console.error(err);
    }
}

const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userCollection.findOne({ email: email });
    if (!user) {
      return res.status(200).json({ message: 'Email Not Registered' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(200).json({ message: 'Invalid Password' });
    }
    const token = jwt.sign({ email: user.email, userId: user._id }, 'secret_key', { expiresIn: '1h' });
    return res.status(200).json({ message: 'Logged In Successfully', user: user, token:token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const postAdminLogin=async(req,res)=>{
  const email1='admin@gmail.com'
  const password1='1234'

  const {email,password}=req.body
  if(email===email1 && password===password1){
    const token = jwt.sign({ email: email1 }, 'secret_key', { expiresIn: '1h' });
    res.status(200).json({message:'Admin Logged Successfully',token})
  }else if(email!==email1){
    res.json({message:'Email Not Matched'})
  }else{
    res.json({message:'Invalid Password'})
  }
}

const userData= async(req,res)=>{
  try {
    const {email}=req.body
    const user= await userCollection.findOne({email:email})
    res.status(200).json({user})
  } catch (error) {
    console.error(error);
  }
}

const allUsers= async(req,res)=>{
  try {
    const users= await userCollection.find()
    res.status(200).json({message:'Fetched Successfully',users})
  } catch (error) {
    console.log(error);
  }
}

const deleteUser= async(req,res)=>{
  try {
    const id=req.body
    await userCollection.deleteOne({_id:id})
    const users= await userCollection.find({})
    res.status(200).json({message:'User Deleted Successfully'})
  } catch (error) {
    console.log(error);
  }
}

const editUser=async(req,res)=>{
  try {

    const userData = req.body.user;
    const user = JSON.parse(userData);

     await userCollection.updateOne(
      { email: user.email },
      { $set: { firstName: user.firstName, lastName: user.lastName, mobile: user.mobile } }
    );

    const updated = await userCollection.findOne({email : user.email})

    res.status(200).json({ message: 'User Edited Successfully', updated });

    } catch (error) {
      console.log(error);
    }
   
}



module.exports = {addUser,postLogin,userData,allUsers,deleteUser,editUser,postAdminLogin}