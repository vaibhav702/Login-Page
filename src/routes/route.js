const router = require('express').Router(); 
 
const userController=require('../controller/userController')
const middleware=require('../middleware/middleware')
router.post('/register', userController.registerUser)
router.post('/loginUser', userController.loginUser)
router.get('/getUsers/:userId'),userController.getUser
module.exports=router