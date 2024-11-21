const {Router} = require('express');
const indexRouter = Router();
const {getUserFolders, createTopLevelFolder, createSubfolder} = require('../services/indexServices');

indexRouter.get('/', async (req,res)=>{
    try {
        if (req.user){
            const user = req.user;
            const userwithfolders = await getUserFolders(user.id);
            console.log(userwithfolders);
            console.log(userwithfolders.folders);
            const folders = userwithfolders.folders;
            res.render('indexRouter', {user : res.locals.user, folders});
        } else {

            res.render('indexRouter');
        }
        
    } catch (err) {
        console.error(err);
    }
});



// indexRouter.get('/:path', (req,res)=>{

// });

module.exports = {indexRouter};