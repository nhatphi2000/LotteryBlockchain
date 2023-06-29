var axios = require('axios');

url = 'https://ap-southeast-1.aws.data.mongodb-api.com/app/data-hehpy/endpoint/data/v1/action/'
var data = JSON.stringify({
    "collection": "Timer",
    "database": "LottoryData",
    "dataSource": "Cluster1",
    "filter": {
        name: "interval",
      },
});
            
var config = {
    method: 'post',
    url: 'https://ap-southeast-1.aws.data.mongodb-api.com/app/data-hehpy/endpoint/data/v1/action/findOne',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': '10PKCilKeHG8r2Kj0ynZJA1n1m1p2CBWnOBOkAXpTJnebNAWX04CuzMxX75r0GbT',
    },
    data: data
};
            
axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });


    const getDrawTimer = async () => {
        try {
          const response = await axios.post(
            url + "findOne",
            {
              collection: "Timer",
              database: "LottoryData",
              dataSource: "Cluster1",
              filter: {
                name: "interval",
              },
            },
            {
              headers: {
                "Content-Type": "application/json",
                'Access-Control-Request-Headers': '*',
                "api-key":
                  "10PKCilKeHG8r2Kj0ynZJA1n1m1p2CBWnOBOkAXpTJnebNAWX04CuzMxX75r0GbT",
              },
              auth: {
                username: "nhatphi2106",
                password: "nhatphi2000",
              },
            }
          );
      
          const output = response.data;
          return output;
        } catch (error) {
          console.error("Error:", error);
          throw error;
        }
      };
      

test = getDrawTimer();
console.log(test);