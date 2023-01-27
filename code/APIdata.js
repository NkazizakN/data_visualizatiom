let axios = require('axios');
let moment = require('moment');
let dotenv = require('dotenv');
let Twitter = require('twitter');

//configuring twitter Connection
let twitterClient = new Twitter({
    consumer_key: "IXHxiC6TetMXRHq6URTS9dhco",
    consumer_secret: "EBO5zQuwpsmNCBs7Lk5hYuPJcFnHVzeLhBbvD0Et3Lhy9vSnNW",
    access_token_key: "1508260930378948614-fILcxE3qhL5TTDjBZ4Ry1LlGbqB9Hq",
    access_token_secret: "XOYeoD86TdjrcTzKcTHFOwdktn6ZLXyWPLyHKh7oI8chP"
});

//configuring AWS access
//const { DocumentClient } = require('aws-sdk/clients/dynamodb');
let AWS = require("aws-sdk");
AWS.config.update({
    region: "us-east-1",
    endpoint: "https://dynamodb.us-east-1.amazonaws.com"
});
//dynanoDB Client
let documentClient = new AWS.DynamoDB.DocumentClient();

//Promises created to fetch information from web services for each coin
//Etherium 
let Promise1 = new Promise(function (resolve, reject) {
    var myurl = "https://www.alphavantage.co/query?function=CRYPTO_INTRADAY&symbol=ETH&market=USD&interval=5min&outputsize=full&apikey=Q5N74BNMPHPXLS5H";
    resolve(axios.get(myurl));
});
//Bitcoin
let Promise2 = new Promise(function (resolve, reject) {
    var myurl = "https://www.alphavantage.co/query?function=CRYPTO_INTRADAY&symbol=BTC&market=USD&interval=5min&outputsize=full&apikey=Q5N74BNMPHPXLS5H";
    resolve(axios.get(myurl));
});
//Binance
let Promise3 = new Promise(function (resolve, reject) {
    var myurl = "https://www.alphavantage.co/query?function=CRYPTO_INTRADAY&symbol=BNB&market=USD&interval=5min&outputsize=full&apikey=Q5N74BNMPHPXLS5H";
    resolve(axios.get(myurl));
});
//Dogecoin
let Promise4 = new Promise(function (resolve, reject) {
    var myurl = "https://www.alphavantage.co/query?function=CRYPTO_INTRADAY&symbol=DOGE&market=USD&interval=5min&outputsize=full&apikey=Q5N74BNMPHPXLS5H";
    resolve(axios.get(myurl));
});
//Request
let Promise5 = new Promise(function (resolve, reject) {
    var myurl = "https://www.alphavantage.co/query?function=CRYPTO_INTRADAY&symbol=REQ&market=USD&interval=5min&outputsize=full&apikey=Q5N74BNMPHPXLS5H";
    resolve(axios.get(myurl));
});

//an array cointaining five promises
let myPromise = [Promise1, Promise2, Promise3, Promise3, Promise4, Promise5];

//functio to send data to dynamoDB
async function sendData() {
    //looping through the promises
    for (let j = 0; j < myPromise.length - 1; j++) {

        try {
            let myData = await myPromise[j];
            let keys = Object.keys(myData.data["Time Series Crypto (5min)"]);
            let curr = "";
            if (j == 0) {
                curr = "ETH";
            }
            else if (j == 1) {
                curr = "BTC";
            }
            else if (j == 2) {
                curr = "BNB";
            }
            else if (j == 3) {
                curr = "DOGE";
            }
            else {
                curr = "REQ";
            }
            //i< keys.length-1
            for (let i = 0; i < 1; i++) {
                let obj = myData.data["Time Series Crypto (5min)"][keys[i]];
                let objkeys = Object.keys(obj);
                //object to send data to dynamoDB
                let params = {
                    TableName: "cryptodata",
                    Item: {
                        currency: curr,
                        pricetimestamp: new Date(keys[i]).valueOf(),
                        open: parseFloat(obj[objkeys[0]]),
                        high: parseFloat(obj[objkeys[1]]),
                        low: parseFloat(obj[objkeys[2]]),
                        close: parseFloat(obj[objkeys[3]])
                    }
                }// end of params
                documentClient.put(params, (err, data) => {
                    if (err) {
                        console.log(JSON.stringify(err));
                    }
                    else {
                        console.log(params.Item);
                    }
                });//update if error
            }
        }
        catch (err) {
            console.log(JSON.stringify(err));
        }

    }

}

async function serachTweets(item) {
    console.log(item);
    let keyword = item;
    try {
        let searchParams = {
            q: keyword,
            count: 1,
            lang: "en"
        };

        let result = await twitterClient.get('search/tweets', searchParams);
        result.statuses.forEach(async (tweet) => {

            let params = {
                TableName: "twitterData",
                Item: {
                    currency: item,
                    tweetid: parseInt(tweet.id),
                    tweettimestamp: new Date(tweet.created_at).valueOf(),
                    textdata: tweet.text
                }
            }// end of params
            let gt = await documentClient.put(params).promise();
            console.log(JSON.stringify(gt));
            console.log(tweet.id);

        });
    }
    catch (error) {
        console.log(JSON.stringify(error));
    }


}
let myCoins = ["BTC", "ETH", "DOGE", "BNB", "REQ"];
myCoins.forEach(serachTweets);
//sendData();