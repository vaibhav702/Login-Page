const router = require('express').Router(); 
const userModel=require("../model/userModel")
 
const userController=require('../controller/userController')
const middleware=require('../middleware/middleware')
const validator=require("../validator/validator")
router.post('/register', userController.registerUser)
router.post('/loginUser', userController.loginUser)
// router.get('/getUsers/userId/profile'),userController.getUser
router.get('/getUser/:userId',middleware.authentication, async (req, res) => {
    // res.send("GET Request Called")
    try {
        const userId = req.params.userId;
    
      
          if (!(validator.isValidObjectId(userId) && validator.isValid(userId))) {
            return res
              .status(400)
              .send({ status: false, msg: "userId is not valid" });
          }
          const userData = await userModel.findById({ _id: userId });
          if (userData) {
            return res
              .status(200)
              .send({ status: true, msg: "user profile details", data: userData });
          } else {
            return res
              .status(404)
              .send({ status: false, msg: "userid does not exist" });
          }
        } catch (err) {
          return res.status(500).send({ status: false, msg: err.message });
        }
      
    });
    router.put('/user/:userId', middleware.authentication,middleware.authorization, userController.updateUser)
      
  
    
module.exports=router