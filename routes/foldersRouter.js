const {Router} = require('express');
const foldersRouter = Router();
const {getUserFolders, deleteFolder, updateFolderName} = require('../services/indexServices');

foldersRouter.get('/:folderName', async (req,res)=>{
    const user = req.user;
    const userwithfolders = await getUserFolders(user.id);
    const folders = userwithfolders.folders;
    const folderName = req.params.folderName;
    const currentFolder = folders.find((e)=> e.name===folderName);
    res.render('folderPage', {currentFolder});
});

foldersRouter.post('/:folderName/delete', async (req,res)=>{
    const userswithfolders = await getUserFolders(req.user.id);
    const folders = userswithfolders.folders;
    console.log("folders: ", folders);
    console.log('req params: ', req.params);
    console.log("params foldername: ", req.params.folderName);
    const folderName = decodeURIComponent(req.params.folderName);
    console.log("folder name : ", folderName);
    const currentFolder = folders.find((element)=>element.name === decodeURIComponent(req.params.folderName));
    const folderId = currentFolder.id;
    await deleteFolder(folderId);
    res.redirect('/');
});

foldersRouter.post('/:folderName/update', async (req,res)=>{
    
    const folderName = decodeURIComponent(req.params.folderName);
    const userwithfolders = await getUserFolders(req.user.id);
    const folders = userwithfolders.folders;
    const currentFolder = folders.find((element)=> element.name === folderName );
    const folderId = currentFolder.id;
    const newName = req.body.updateName;
    await updateFolderName( folderId, newName );
    res.redirect('/');
})

module.exports = {foldersRouter};