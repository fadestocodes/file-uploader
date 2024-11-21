const {Router} = require('express');
const uploadRouter = Router();
const multer = require('multer');
const upload = multer({dest : 'uploads/'})
const {createTopLevelFolder, createSubfolder} = require('../services/indexServices');


uploadRouter.get('/',(req,res)=>{
    res.render('upload');
});

uploadRouter.post('/', async (req,res)=>{
    const name = req.body.folderName;
    try {
        const userId = req.user.id;
        await createTopLevelFolder(name, userId);
        res.redirect('/')
    } catch (err) {
        console.error(err);
    }

    });


// uploadRouter.post('/', upload.array('files', 10), (req,res,next)=>{

// });


module.exports = {uploadRouter};