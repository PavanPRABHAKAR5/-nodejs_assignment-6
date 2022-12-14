const router = require('express').Router();
const bodyparser = require("body-parser");
const Blog = require('../models/Blog')

// Your routing code goes here
router.use(bodyparser());
router.get('/blog', async (req,res)=>{
    try {
        
        let {page = 1, search = ""} = req.query;
        const data = await Blog.find({
            topic: req.query.search
        }).limit(5).skip((Number(page)-1) * 5);
        res.json({
            status: "success",
            result : data
        });
    }catch(e) {
        res.json({
            status: "failed",
            message: e.message
        })
    }

});
router.post("/blog", async (req, res) => {
    try {
      const data = req.body;
      const userdata = await Blog.create(data);
      res.json({
        status: "success",
        result: userdata,
      });
    } catch (e) {
      res.json({
        status: "something error",
        message: e.message,
      });
    }
  });


  
router.put("/blog/:id", async (req, res) => {
    try {
      let data = req.body;
      const userdata = await Blog.updateOne({ _id: req.params.id }, data);
      res.json({
        status: "success",
        result: userdata,
      });
    } catch (e) {
      res.json({
        status: "something error",
        message: e.message,
      });
    }
  });



router.delete("/blog/:id", async (req, res) => {
    try {
      const userdata = await Blog.deleteOne({ _id:req.params.id});
      res.json({
        status: "success",
        result: userdata,
      });
    } catch (e) {
      res.json({
        status: "something error",
        message: e.message,
      });
    }
  });


module.exports = router;