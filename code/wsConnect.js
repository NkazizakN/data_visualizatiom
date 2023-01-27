let AWS = require("aws-sdk");
AWS.config.update({
    region: "us-east-1",
    endpoint: "https://dynamodb.us-east-1.amazonaws.com"
});

//Create new DocumentClient
let documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    let statusCode1 = 0;
    //Get connection ID from event
    let connectId = event.requestContext.connectionId;
    console.log("Client connected with ID: " + connectId);

    //Parameters for storing connection ID in DynamoDB
    let params = {
        TableName: "webSocketClients",
        Item: {
            ConnectionId: connectId
        }
    };

    //Store connection Id for later communication with client

    try {

        await documentClient.put(params).promise();
        console.log("Connection ID stored.");
        statusCode1 = 200;

    }
    catch (err) {
    console.log(err);
    statusCode1 = 500;
    }
    return {
     statusCode: statusCode1,
     body: "response From Server" 
    }
};

