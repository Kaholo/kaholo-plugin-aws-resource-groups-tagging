const aws = require("aws-sdk");

function getClient(action, settings){
    const options = {
        "accessKeyId": action.params.accessKeyId || settings.accessKeyId,
        "secretAccessKey": action.params.secretAccessKey || settings.secretAccessKey,
        "region": handleAutocomplete(action.params.region)
    }
    return new aws.ResourceGroupsTaggingAPI(options);
}

function getEc2(params, settings) {
    return new aws.EC2({
        region: handleAutocomplete(params.region),
        accessKeyId: params.accessKeyId|| settings.accessKeyId,
        secretAccessKey: params.secretAccessKey || settings.secretAccessKey
    });
}

function getLightsail(params, settings) {
    return new aws.Lightsail({
        region: handleAutocomplete(params.region),
        accessKeyId: params.accessKeyId || settings.accessKeyId,
        secretAccessKey: params.secretAccessKey || settings.secretAccessKey
    });
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
    getEc2,
    getLightsail,
    getClient,
    handleArrParam
};
