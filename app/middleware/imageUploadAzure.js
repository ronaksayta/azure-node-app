const azureStorage = require('azure-storage');
const getStream = require('into-stream');
const jwt_decode = require('jwt-decode');
const config = require('../config/config');

const azureStorageConfig = {
    accountName: config.accountName,
    accountKey: config.storageKey,
    blobURL: "",
    containerName: config.storageContainer
};

blobSvc = azureStorage.createBlobService(azureStorageConfig.accountName, azureStorageConfig.accountKey);

function getImageName(MID) {
    return MID + Date.now();
}

async function getUrl(project) {
    return blobSvc.getUrl(azureStorageConfig.containerName, project);
}


const uploadAzureImage = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const tokenvalues = jwt_decode(token);
    const mid = req.user.mid;
    const blobName = getImageName(mid) + req.file.originalname;
    const stream = getStream(req.file.buffer);
    const streamLength = req.file.buffer.length;
    blobSvc.createBlockBlobFromStream(azureStorageConfig.containerName, `${blobName}`, stream, streamLength, function (error, result, uploaded) {
        if (!error) {
            console.log(blobName);
            getUrl(blobName).then((url) => {
                console.log(url);
                res.status(200);
                res.json({
                        data: {
                            imageUrl: url
                        }
                })
            });
        } else {
            res.status(409);
            res.json({
                message: 'Error in file upload!'
            })
        }
    });
}

module.exports = uploadAzureImage;