const { getClient, getAwsCallback, handleArrParam } = require("./helpers");
const { listRegions } = require('./autocomplete');

async function tagResources(action,settings) {
    if (!action.params.resourcesArn){
        throw "Not given resources ARN";
    }
    let tags  = action.params.tags;
    if (!tags){
        throw "Not given tags";
    }
    if (typeof(tags) === "string"){
        tagsObj = {};
        tags.split("\n").forEach(line => {
            // split line string to key and value
            const [key, ...values] = line.split("=");
            if (!values) throw "Bad key=value format";
            let value;
            if (Array.isArray(values)) value = values.join("=").trim();
            else value = values.trim();
            tagsObj[key.trim()] = value;
        });
        tags = tagsObj;
    }
    else if (typeof(tags) !== "object"){
        throw "Tags must be either a string or an object";
    }
    const arns = handleArrParam(action.params.resourcesArn);

    const params = {
        ResourceARNList: arns,
        Tags: tags
    };

    const client = getClient(action, settings);
    return new Promise((resolve, reject) => {
        client.tagResources(params, getAwsCallback(resolve, reject));
    });
}

module.exports = {
    tagResources,
    // autocomplete
    listRegions
};