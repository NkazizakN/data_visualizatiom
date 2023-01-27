
let AWS = require("aws-sdk");
let AWS2 = require("aws-sdk");
AWS2.config.update({
    region: "us-east-1",
    endpoint: "https://dynamodb.us-east-1.amazonaws.com"
});
let documentClient = new AWS2.DynamoDB.DocumentClient();
const api = new AWS.ApiGatewayManagementApi({
    endpoint : '2gmhsolzr3.execute-api.us-east-1.amazonaws.com/production'
});

exports.handler = async (event) => {
    let params1 = {
        TableName : "webSocketClients"
    };
    let data = await documentClient.scan(params1).promise();
    console.log(data.Items.length);
    
    //checking if any clients are currently connected
    if(data.Items.length > 0)
    {
        for(let record of event.Records)
        {
        console.log( "EVENT SIZE"+JSON.stringify(event).length);
        //extracting table name from the Event Object;
        let text = record.eventSourceARN;
        let myArray = text.split("/");
        
        
        //if there is a new entry to "webSocketClient" new client has connected and data is only sent to that Client
        if(record.eventName === "INSERT" && myArray[1] === "webSocketClients" )
        {

            let connectId =  record.dynamodb.NewImage.ConnectionId.S;
            console.log("New Connection id is : " + connectId);
            let nETH = await myDatapoints("ETH");
            let nBTC = await myDatapoints("BTC");
            let nDOGE = await myDatapoints("DOGE");
            let nBNB = await myDatapoints("BNB");
            let nREQ = await myDatapoints("REQ");
            
            let sETH = await mySentimentData("ETH");
            let sBTC = await mySentimentData("BTC");
            let sDOGE = await mySentimentData("DOGE");
            let sBNB = await mySentimentData("BNB");
            let sREQ = await mySentimentData("REQ"); 
            let neumerical = {
                etherium : nETH,
                bitcoin : nBTC,
                doge : nDOGE,
                binance : nBNB,
                request : nREQ
            };
            let sentiment = {
                etherium : sETH,
                bitcoin : sBTC,
                doge : sDOGE,
                binance : sBNB,
                request : sREQ                
            };
            let somedata = {
                type : "both",
                numerical : neumerical,
                sentimental : sentiment
            };
            
            let myDATA = JSON.stringify(somedata);
            console.log(myDATA);
            console.log("MyDATA length of" + myDATA.length);
            
            let params = {
               ConnectionId : connectId,
               Data : myDATA
            };
            
            
            try{
                console.log("trying to send data");
                await api.postToConnection(params).promise();
                console.log("Sent data Successfully");
            }
            catch(err)
            {
                console.log("Cannot Connect to client " + JSON.stringify(err));
                let dparams = {
                    TableName: "WebSocketClients",
                    Key: {
                    ConnectionId: connectId
                    }
                };
                try{
                    console.log("deleting the connection ID");
                    await documentClient.delete(dparams).promise();
                }
                catch(err)
                {
                    console.log("Failed to delete connection id");
                }
                
            }
        }//end of if (for connection of new clinets checked and handled Above)
        else if(record.eventName === "INSERT" && myArray[1] === "sentiment")
        {
            let ETH = await mySentimentData("ETH");
            let BTC = await mySentimentData("BTC");
            let DOGE = await mySentimentData("DOGE");
            let BNB = await mySentimentData("BNB");
            let REQ = await mySentimentData("REQ");
            
            let somedata = {
                type : "s",
                etherium : ETH,
                bitcoin : BTC,
                doge : DOGE,
                binance : BNB,
                request : REQ
            };
            
            
            let myDATA = JSON.stringify(somedata);
            console.log(myDATA);
            console.log("MyDATA length of" + myDATA.length);
            
            //deal with this later
            let params1 = {
                TableName : "webSocketClients"
            };
            let data = await documentClient.scan(params1).promise();
            console.log("Length of the WSC table : " + data.Items.length);
            for(let i=0; i<data.Count; i++)
            {
                console.log("Inside the For Loop");
                let connId = data.Items[i]["ConnectionId"];
                console.log("This is sentiment data : " + connId);
                let paramsn = {
                    ConnectionId : connId,
                    Data : myDATA
                };
                try{
                    console.log("trying to send new data to :" + connId);
                    await api.postToConnection(paramsn).promise();
                }
                catch(err)
                {
                    console.log("deleting onnection ID" + connId);
                    let params = {
                        TableName: "WebSocketClients",
                        Key: {
                            ConnectionId: connId
                            }
                    };
                await documentClient.delete(params).promise();
                }
                
            }
        }//dealing with new data added to sentiment table
        else if(record.eventName === "INSERT" && myArray[1] === "cryptodata")
        {
            let ETH = await myDatapoints("ETH");
            let BTC = await myDatapoints("BTC");
            let DOGE = await myDatapoints("DOGE");
            let BNB = await myDatapoints("BNB");
            let REQ = await myDatapoints("REQ");
            
            let somedata = {
                type : "n",
                etherium : ETH,
                bitcoin : BTC,
                doge : DOGE,
                binance : BNB,
                request : REQ
            };
            console.log(somedata);
            
            let myDATA = JSON.stringify(somedata);
            
            //deal with this later
            let params1 = {
                TableName : "webSocketClients"
            };
            let data = await documentClient.scan(params1).promise();
            for(let i=0; i<data.Count; i++)
            {
                let connId = data.Items[i]["ConnectionId"];
                console.log("This is sentiment data : " + connId);
                let paramsn = {
                    ConnectionId : connId,
                    Data : myDATA
                };
                try{
                    console.log("trying to send new data");
                    await api.postToConnection(paramsn).promise();
                }
                catch(err)
                {
                    console.log("deleting onnection ID" + connId);
                    let params = {
                        TableName: "WebSocketClients",
                        Key: {
                        ConnectionId: connId
                        }
                        };
                    await documentClient.delete(params).promise();
                }
                
            }            
        }

    } 
    }
 

};

function mySentimentData(curren)
{
    let params3 = {
        Limit : 50,
        TableName : "sentiment",
        IndexName : "currency-sentimentTimeStamp-index",
        KeyConditionExpression : "currency = :curr",
        ExpressionAttributeValues : {
        ":curr" : curren,
        },
        ScanIndexForward : false,
    };
    return documentClient.query(params3).promise();
}

function myDatapoints(curren)
{
    let params2 = {
            Limit : 50,
            TableName : "cryptodata",
            IndexName : "currency-pricetimestamp-index",
            KeyConditionExpression : "currency = :curr",
            ExpressionAttributeValues : {
                ":curr" : curren,
            },
            ScanIndexForward : true,
            };// end of params
    return documentClient.query(params2).promise();
}