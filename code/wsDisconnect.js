let AWS = require("aws-sdk");
//Create new DocumentClient
let documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    //Get connection ID from event
    let connectId = event.requestContext.connectionId;
    console.log("Disconnecting client with ID: " + connectId);

    //Parameters for deleting connection ID from DynamoDB
    let params = {
        TableName: "webSocketClients",
        Key: {
            ConnectionId: connectId
        }
    };

    //Store connection Id for later communication with client
    try {
        await documentClient.delete(params).promise();
        console.log("Connection ID deleted.");

        //Return response
        return {
            statusCode: 200,
            body: "Client disconnected. ID: " + connectId
        };
    }
    catch (err) {
        console.log("Error disconnecting client with ID: " + connectId + ": " + JSON.stringify(err));
        return {
            statusCode: 500,
            body: "Server Error: " + JSON.stringify(err)
        };
    }
};
