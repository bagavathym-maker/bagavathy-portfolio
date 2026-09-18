const router=require("express").Router();const db=require("../config/db");
router.get("/",async(req,res,next)=>{try{const [rows]=await db.query("SELECT * FROM certifications ORDER BY issue_date DESC, created_at DESC");res.json({success:true,data:rows})}catch(e){next(e)}});
module.exports=router;