const router=require("express").Router();const db=require("../config/db");
function clean(v){return String(v||"").trim()}
router.post("/",async(req,res,next)=>{try{
 const name=clean(req.body.name),email=clean(req.body.email),subject=clean(req.body.subject),message=clean(req.body.message);
 if(!name||!email||!subject||!message)return res.status(400).json({success:false,message:"All fields are required"});
 if(name.length>80||email.length>160||subject.length>160||message.length>2000||message.length<10)return res.status(400).json({success:false,message:"Please check field lengths"});
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return res.status(400).json({success:false,message:"Enter a valid email"});
 const [result]=await db.execute("INSERT INTO contact_messages (name,email,subject,message) VALUES (?,?,?,?)",[name,email,subject,message]);
 res.status(201).json({success:true,data:{id:result.insertId}});
}catch(e){next(e)}});
module.exports=router;