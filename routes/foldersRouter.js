const {Router} = require('express');
const foldersRouter = Router();
const {getUserFolders} = require('../services/indexServices');

foldersRouter.get('/:folderName', async (req,res)=>{
    const user = req.user;
    const userwithfolders = await getUserFolders(user.id);
    const folders = userwithfolders.folders;
    const folderName = req.params.folderName;
    const currentFolder = folders.find((e)=> e.name===folderName);
    res.render('folderPage', {currentFolder});
});

module.exports = {foldersRouter};