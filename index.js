// เลือกวันที่ด้วยที่จ้องการเช็ต ทำเช็คหวย และดูผลทั้งหมด

// เหลือ : แยกไฟล์ / สร้าง command / แสดงผลว่าถูกรางวัลที่ และได้เงินเท่าไหร่ (ใช้ chalk)

const axios = require("axios").default;

const x = "90900909090";
const urlAPILotto = "https://www.thairath.co.th/api-lottery?history=1&date=";

const  getdata = async (date) => {
  console.log(date);
  await axios.get(`${urlAPILotto}${date}`).then((response) => {
    const numLottoData = Object.entries(response.data.data.prizes);
    const arrayLottoFinal = []; // array ซ้อนที่มี [รางวัลที่, [จำนวนเลข, เงินรางวัล], [เลขรางวัลต่างๆ]]
    numLottoData.forEach((item) => {
      let numLottoTemp = Object.entries(item);
      let arrayTemp = [];
      arrayTemp.push([numLottoTemp[0][1], Object.entries(numLottoTemp[1][1])]);
      arrayLottoFinal.push([
        arrayTemp[0][0],
        arrayTemp[0][1][0][1],
        arrayTemp[0][1][1][1],
      ]);
    });

    // change index to run 1-9
    arrayLottoFinal[7][0] = "8";
    arrayLottoFinal[8][0] = "9";

    try {
        for (let i = 0; i <= 100; i++) {
        switch (x.length) {
          case 2:
            if (x === arrayLottoFinal[6][2][i]) {
              return console.log("ถูกรางวัลเลขท้าย 2 ตัวจ้า");
            } else if (x !== arrayLottoFinal[6][2][i]) {
              return console.log("ถูกแดก");
            } else {
              throw new Error('Is not a lotto! | pls check a length.');
            }

          case 3:
            if (x === arrayLottoFinal[7][2][i]) {
              return console.log("ถูกรางวัลเลขท้าย 3 ตัวจ้า");
            } else if (x === arrayLottoFinal[5][2][i]) {
              return console.log("ถูกรางวัลเลขหน้า 3 ตัวจ้า");
            } else if (
              x !== arrayLottoFinal[5][2][i] ||
              x !== arrayLottoFinal[7][2][i]
            ) {
              return console.log("ถูกแดก");
            } else {
              throw new Error('Is not a lotto! | pls check a length.');
            }
        case 6:
            if (x === arrayLottoFinal[0][2][0]) {
                return console.log('ถูกรางวัลที่ 1 จ้าา เศรษฐีหน้าใหม่!')
            } else if (x === arrayLottoFinal[1][2][i]) {
                return console.log('คุณถูกรางวัลที่ 2')
            } else if (x === arrayLottoFinal[2][2][i]) {
                return console.log('คุณถูกรางวัลที่ 3')
            } else if (x === arrayLottoFinal[3][2][i]) {
                return console.log('คุณถูกรางวัลที่ 4')
            } else if (x === arrayLottoFinal[4][2][i]) {
                return console.log('คุณถูกรางวัลที่ 5')
            } else if (x === arrayLottoFinal[8][2][i]) {
                return console.log('คุณถูกรางวัลข้างเคียงรางวัลที่ 1')
            } else {
                throw new Error('Is not a lotto! | pls check a length.');
            }
        default:
            throw new Error ('Is not a number!| pls check a length or type of input.')

        }
      }
    } catch (error) {
      console.log(error);
    }
    // console.log(arrayLottoFinal)
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
