exports.handler = async (event) => {
    const response = {
        statusCode: 500,
        body : JSON.stringify("Message Not Recognised")
    }
    return response;
};
