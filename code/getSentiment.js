let AWS = require("aws-sdk");
let AWS2 = AWS;
let comprehend  = new AWS.Comprehend();

exports.handler = (event) => {

for(let record of event.Records)
{
    if(record.eventName === "INSERT")
    {
    console.log(JSON.stringify(record));
    //parameter for AWS comprehend
    let params1 = {
    LanguageCode : "en",
    Text : record.dynamodb.NewImage.textdata.S
    };

        comprehend.detectSentiment(params1, (err,data) =>{
        if(err)
        {
            console.log("2e");
            console.log(JSON.stringify(err));
        }
        else{
            AWS2.config.update({
            region: "us-east-1",
            endpoint: "https://dynamodb.us-east-1.amazonaws.com"
            });
            //dynanoDB Client
            let documentClient = new AWS2.DynamoDB.DocumentClient();
            let params = {
                TableName : "sentiment",
                Item : {
                        tweetid : record.dynamodb.NewImage.tweetid.N,
                        sentimentTimeStamp : parseInt(record.dynamodb.NewImage.tweettimestamp.N),
                        currency : record.dynamodb.NewImage.currency.S,
                        result : data.Sentiment,
                        positive : data.SentimentScore.Positive,
                        negative : data.SentimentScore.Negative,
                        neutral : data.SentimentScore.Neutral,
                        mixed :  data.SentimentScore.Mixed
                        }
            };
            documentClient.put(params,(e,d) =>{
                if(e)
                {
                    console.log(JSON.stringify(e));
                }
                else
                {
                    console.log(JSON.stringify(d));
                }
            });
    
        }//end of else
    });//end of comprehend
    }


}
    

};