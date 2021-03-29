const aws = require("aws-sdk");

function getClient(action, settings){
    const options = {
        "accessKeyId": action.params.accessKeyId || settings.accessKeyId,
        "secretAccessKey": action.params.secretAccesKey || settings.secretAccesKey,
        "region": handleAutocomplete(action.params.region)
    }
    return new aws.ResourceGroupsTaggingAPI(options);
}

function getAwsCallback(resolve, reject){
    return (error, data) => {
        if (error) return reject(error);
        return resolve(data);
    }
}

function handleArrParam(param){
    if (Array.isArray(param)){
        return param;
    }
    if (typeof(param) !== "string"){
        throw "Parameter can only be string or array";
    }
    return param.split("\n").map((line) => line.trim()).filter(item => item); // split by lines, trim all lines, and remove empty lines
}

function handleAutocomplete(param){
    if (typeof(param) === "object" && param.hasOwnProperty("id")){
        return param.id;
    }
    return param;
}

module.exports = {
    getClient,
    getAwsCallback,
    handleArrParam,
    handleAutocomplete
};