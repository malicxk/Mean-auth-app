const express=require('express')
const userController=require('./Controller/controler')
const router=express.Router()
const multer= require('multer');
const userCollection = require('./Model/userSchema');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './Public/image'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); 
  }
});
const upload = multer({ storage: storage });

router.post('/addUser',userController.addUser)
router.post('/postLogin',userController.postLogin)
router.post('/userData',userController.userData)

router.post('/upload', upload.single('file'), async (req, res) => {
    console.log('File upload request received');
    
    const email = req.body.email;
    const filename = req.file.filename;
    console.log(filename);
    
    await userCollection.findOneAndUpdate(
        { email: email },
        { $set: { profile: filename } },
        { new: true }
    );
    
    res.status(200).json({ message: 'File Added Successfully' });
});

router.get('/allUsers',userController.allUsers)
router.post('/deleteUser',userController.deleteUser)
router.post('/editUser',userController.editUser)
router.post('/adminLogin',userController.postAdminLogin)


module.exports = router
