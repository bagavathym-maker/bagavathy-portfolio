const router=require("express").Router();const db=require("../config/db");
router.get("/",async(req,res,next)=>{try{const [rows]=await db.query("SELECT * FROM projects ORDER BY featured DESC, created_at DESC");res.json({success:true,data:rows})}catch(e){next(e)}});
router.get("/:slug",async(req,res,next)=>{try{const [rows]=await db.execute("SELECT * FROM projects WHERE slug=? LIMIT 1",[req.params.slug]);if(!rows.length)return res.status(404).json({success:false,message:"Project not found"});res.json({success:true,data:rows[0]})}catch(e){next(e)}});
module.exports=router;