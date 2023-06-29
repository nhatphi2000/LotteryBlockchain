const axios = require('axios');
const ethers = require('ethers');
const LotteryABI = require('./LotteryABI.json');

const lottery = '0x8cb152e26ae8691d859a594e24a3de7b524c0e76';
const rpc = 'https://rpc.ankr.com/polygon_mumbai';
const provider = new ethers.providers.JsonRpcProvider(rpc);
const key = '18d8876905ad0abf463f74381c9a060d65bdf15bb28f8a99888b8296c71f4347';
const wallet = new ethers.Wallet(key, provider);
const apikey = "10PKCilKeHG8r2Kj0ynZJA1n1m1p2CBWnOBOkAXpTJnebNAWX04CuzMxX75r0GbT";
const url = "https://ap-southeast-1.aws.data.mongodb-api.com/app/data-hehpy/endpoint/data/v1/action/";
const contract = new ethers.Contract(lottery, LotteryABI, wallet);

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

const storeTime = async (timeleft) => {
  try {
    const response = await axios.post(
      url + "updateOne",
      {
        collection: "Timer",
        database: "LottoryData",
        dataSource: "Cluster1",
        filter: { name: "interval" },
        update: {
          name: "interval",
          time: timeleft,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          "api-key": apikey,
        },
        auth: {
          username: "nhatphi2106",
          password: "nhatphi2000",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const openLotto = async () => {
  await contract.openLottery().then((result) => {
      console.log("complete");
      return "complete";
    }).catch((error) => {console.log("error calling function");});
};

const closeLotto = async () => {
    await contract.closeLottery().then((result) => {
        console.log("complete");
        return "complete";
      }).catch((error) => {console.log("error calling function");});
};

const drawNumbers = async () => {
    await contract.drawNumbers().then((result) => {
        console.log("complete");
        return "complete";
      }).catch((error) => {console.log("error calling function");});
};

const countWinners = async () => {
    await contract.countWinners().then((result) => {
        console.log("complete");
        return "complete";
      }).catch((error) => {console.log("error calling function");});
};

const currentLotto = async () => {
  const output = await contract.currentLotteryId().catch(error => {
    console.log('error calling function')
  })
  const lottoId = output.toString();
  return lottoId;
}

const getBalance = async () => {
  const output = await contract.getBalance().catch(error => {
    console.log('error calling function')
  })
  const balance = output.toString();
  return balance;
}

const getDrawJackpot = async () => {
  const output = await contract.currentLotteryId().catch(error => {
    console.log('error calling function')
  })
  const lottoId = output.toString();
  const lottodata = await contract.viewLottery(lottoId).catch(error => {
    console.log('error calling function')
  })
  return lottodata;
}

const getLotteryInfo = async (lottoId) => {
  const lottodata = await contract.viewLottery(lottoId).catch(error => {
    console.log('error calling function 10')
  })
  return lottodata;
}

const viewTickets = async (ticketId) => {
  const ticketdata = await contract.viewTickets(ticketId).catch(error => {
    console.log('error calling function 11')
  })
  return ticketdata;
}



module.exports = {getDrawTimer, 
  storeTime, 
  openLotto, 
  closeLotto, 
  drawNumbers, 
  countWinners,
  currentLotto,
  getBalance,
  getDrawJackpot,
  getLotteryInfo,
  viewTickets};