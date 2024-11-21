const {PrismaClient} = require('@prisma/client');
const prisma = require('../prisma/prisma');

async function addUser( username, password, email ){
    return await prisma.user.create({
        data : {
            username : username,
            password : password,
            email : email
        }
    })
}

// async function addSession( sid, data, expiresAt, userId){
//     console.log('creating session with data', sid, data, expiresAt, userId);
//     await prisma.session.create({
//         data : {
//             sid : sid,
//             data : data,
//             expiresAt : expiresAt,
//             user : {
//                 connect : { id : userId }
//             },
//         }
//     })
// }

// async function addFileData(){
//     await prisma.file.create({
//         data : {

//         }
//     })
// }

async function getUserFolders(userId){
    return await prisma.user.findUnique({
        where : {
            id : userId
        },
        include : {
            folders : true
        }
    });
}

async function createTopLevelFolder(name, userId  ){
    await prisma.folder.create({
        data : {
            name : name,
            parentId : null,
            userId : userId
        }
    })
}

async function createSubfolder(name, userId, parentId){
    await prisma.folder.create({
        data : {
            name : name,
            userId : userId,
            parentId : parentId
        }
    })
}

async function deleteFolder( folderId ){
    await prisma.folder.delete({
        where : {
            id : folderId
        }
    });
};

async function updateFolderName(folderId, newName){
    await prisma.folder.update({
        where :{
            id : folderId
        },
        data :
        {
            name : newName
        }
    });
};

module.exports = {addUser, getUserFolders, createTopLevelFolder, createSubfolder, deleteFolder, updateFolderName};