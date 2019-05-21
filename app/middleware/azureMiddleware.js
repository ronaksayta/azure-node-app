var azure = require('azure-storage');
var path = require('path');
var jwt_decode = require('jwt-decode');

var config = require('../config/config');
var imageService = require('../services/imageService');

const accountName = config.accountName;
const storageKey = config.storageKey;
const storageContainer = config.storageContainer;

const blobService = azure.createBlobService(accountName, storageKey);

async function uploadFile(projectName, imageName) {
    await blobService.createBlockBlobFromLocalFile(storageContainer, projectName, `${path.resolve(__dirname, `../images/` + imageName)}`, function (error, result, response) {
        if (!error) {
            console.log('File uploaded!');
        } else if (error) {
            console.log(error);
        }
    });
}

async function getUrl(project) {
    return blobService.getUrl(storageContainer, project);
}

async function storeImageInAzureCloud(req, res, next) {
    const files = req.files;
    const token = req.headers.authorization.split(" ")[1];
    const tokenvalues = jwt_decode(token);
    console.log(tokenvalues);

    const name = tokenvalues.mid;
    const images = [];
    const imageUrl = [];
    for (var key in files) {
        images.push(files[key][0].filename);
    }
    console.log(images);
    const allImages = images.map(image => {
        var i = image.split('.');
        const imageName = name + '_' + Date.now()+ '.' + i[1];
        const uploadData = uploadFile(imageName, image);
        const url = getUrl(imageName);
        return Promise.all([uploadData, url]).then(function (values) {
            return imageUrl.push({
                name: imageName,
                url: values[1]
            })
        });
    });
    Promise.all(allImages).then(() => {
        console.log(imageUrl);
        req.imageUrls = imageUrl;
        next();
    })
}

function deleteImageFromAzureCloud() {
    blobService.listBlobsSegmented(storageContainer, null, (err, data) => {
        if (err) {
            console.error(err);
        } else {
            var imageData = { message: `${data.entries.length} blobs in '${storageContainer}'`, blobs: data.entries };
            let result = imageData.blobs.map(a => a.name);
            console.log(result);
            
            imageService.getImages()
                .then((images) => {
                    var res = images.map(a => a.name);
                    console.log(res);
                    var r = result.filter((el) => !res.includes(el));
                    console.log(r);
                    r.map(i => blobService.deleteBlobIfExists(storageContainer, i, err => {
                        if (!err) {
                            console.log({ message:  `Block blob '${i}' deleted` });
                        }
                    }));
                });
        }
    });
}

module.exports = { storeImageInAzureCloud, deleteImageFromAzureCloud };
