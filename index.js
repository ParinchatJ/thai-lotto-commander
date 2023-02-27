// ทำเช็คหวย และดูผลทั้งหมด

// ลองใช้ foreach เพื่อวนตรวจสอบข้อมูลข้างในไหม

const axios = require("axios").default;
const myLotto = '92'


const urlAPILotto = "https://www.thairath.co.th/api-lottery?history=1&date=";

const getdata = (date) => {
  console.log(date);
  axios.get(`${urlAPILotto}${date}`).then((response) => {
    const numLottoData = Object.entries(response.data.data.prizes)
    const arrayLottoFinal = []  // array ซ้อนที่มี [รางวัลที่, [จำนวนเลข, เงินรางวัล], [เลขรางวัลต่างๆ]]
    numLottoData.forEach((item) => {
        let numLotto = Object.entries(item)
        let arrayTemp = []
        arrayTemp.push([numLotto[0][1], Object.entries(numLotto[1][1])])
        arrayLottoFinal.push([arrayTemp[0][0], arrayTemp[0][1][0][1] ,arrayTemp[0][1][1][1]])
    })

    // for (let i = 1; i <= 10; i++) {
    //     let index = arrayLottoFinal[i]
    //     console.log(Object.keys(index))
    // }

    // ก่อนทำต่อมาเอาลง git ก่อนด้วย เดี๋ยวพัง

    console.log(arrayLottoFinal)

  });
};

getdata("2023-02-16");


// const urlAPILotto = "https://www.thairath.co.th/api-lottery?history=1&date=";

// const getdata = (date) => {
//   console.log(date);
//   axios.get(`${urlAPILotto}${date}`).then((response) => {
//     const numLottoData = response.data.data.prizes;
//     console.log(numLottoData);
//   });
// };

// getdata("2023-02-01");


