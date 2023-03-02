//! แยกไฟล์ / ทำ commander ไม่ได้

const axios = require("axios").default;
const { program } = require("commander");
require("dotenv").config();

let x = "644921";
const { urlAPI } = process.env;
const urlAPILotto = `${urlAPI}`;

// program
//   .name("check-lotto-CLI")
//   .description("You can check thai lottery and become a millionaire!")
//   .version("1.0.0")
//   .requiredOption("-d, --date <date>", "Date to check lottery")
//   .requiredOption("-l, --lotto <lottery>", "Number lottery to check!")
//   .action()

const getdata = async (date) => {
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

    // convert x to number to check num lotto
    x = +x;

    // check error input lotto
    if (Number.isNaN(x)) {
      throw new Error("Your input is not a number!");
    } else {
      x = x.toString();
    }

    // check num lotto to get prize!
    try {
      switch (x.length) {
        case 2:
          for (let i = 0; i < arrayLottoFinal[6][2].length; i++) {
            if (x === arrayLottoFinal[6][2][i]) {
              console.log("ถูกรางวัลเลขท้าย 2 ตัวจ้า");
            }
          }
          console.log("ถูกแดก");
          break;
        case 3:
          for (let i = 0; i < arrayLottoFinal[5][1][0]; i++) {
            if (x === arrayLottoFinal[5][2][i]) {
              return console.log(`คุณถูกหวยเลขท้าย 3 ตัว`);
            } else if (x === arrayLottoFinal[7][2][i]) {
              return console.log(`คุณถูกหวยเลขหน้า 3 ตัว`);
            }
          }
          console.log(`ถูกแดก`);
          break;
        case 6:
          for (let i = 0; i < arrayLottoFinal[4][1][0]; i++) {
            if (x === arrayLottoFinal[0][2][0]) {
              return console.log("ถูกรางวัลที่ 1 จ้าา เศรษฐีหน้าใหม่!");
            } else if (x === arrayLottoFinal[1][2][i]) {
              return console.log("คุณถูกรางวัลที่ 2");
            } else if (x === arrayLottoFinal[2][2][i]) {
              return console.log("คุณถูกรางวัลที่ 3");
            } else if (x === arrayLottoFinal[3][2][i]) {
              return console.log("คุณถูกรางวัลที่ 4");
            } else if (x === arrayLottoFinal[4][2][i]) {
              return console.log("คุณถูกรางวัลที่ 5");
            } else if (x === arrayLottoFinal[8][2][i]) {
              return console.log("คุณถูกรางวัลข้างเคียงรางวัลที่ 1");
            }
          }
          console.log(`ถูกแดก`)
          break
          default:
            throw new Error ('Is not a lotto! | pls check a length.')
      }

    } catch (error) {
      console.log(error);
    }
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
