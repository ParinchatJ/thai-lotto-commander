const axios = require("axios").default;
const { program } = require("commander");
const chalk = require("chalk");
require("dotenv").config();

const { urlAPI } = process.env;
const urlAPILotto = `${urlAPI}`;

const getdata = async (date, x) => {
  const response = await axios.get(`${urlAPILotto}${date}`)
  const numLottoData = Object.entries(response.data.data.prizes);
  const arrayLottoFinal = [];

  for (const item of numLottoData) {
    let numLottoTemp = Object.entries(item);
    let arrayTemp = [];
    arrayTemp.push([numLottoTemp[0][1], Object.entries(numLottoTemp[1][1])]);
    arrayLottoFinal.push([
      arrayTemp[0][0],
      arrayTemp[0][1][0][1],
      arrayTemp[0][1][1][1],
    ]);
  }

  // change index to run 1-9
  arrayLottoFinal[7][0] = "8";
  arrayLottoFinal[8][0] = "9";

  // convert x to number to check num lotto
  x = +x
  // console.log(`date is ${date}`)
  // console.log(`x is ${x}`)

  // check error input lotto
  if (Number.isNaN(x)) {
    throw new Error("Your input is not a number!");
  } else {
    x = x.toString();
  }

  // use chalk to log
  const logToConsole = (th, bath, x) => {
    console.log(
      chalk.red.italic(`คุณถูกหวย `) +
        chalk.blue(chalk.bgRed.bold(`${th}`)) +
        chalk.blueBright.bold(` เลข ${x} `) +
        chalk.bgGreen.red(`จำนวนเงิน ${bath} บาท`)
    );
  };

  const logNotPrize = (x) => {
    console.log(chalk.bgRed.bold(`เลข ${x} ของคุณไม่ถูกรางวัล!`))
  }

  // check num lotto to get prize!
  try {
    switch (x.length) {
      case 2:
        for (let i = 0; i < arrayLottoFinal[6][2].length; i++) {
          if (x === arrayLottoFinal[6][2][i]) {
            return logToConsole("รางวัลเลขท้าย 2 ตัว", 2000, x);
          }
        }
        logNotPrize(x)
        break;
      case 3:
        for (let i = 0; i < arrayLottoFinal[5][1][0]; i++) {
          if (x === arrayLottoFinal[5][2][i]) {
            return logToConsole("รางวัลเลขหน้า 3 ตัว", 4000, x);
          } else if (x === arrayLottoFinal[7][2][i]) {
            return logToConsole("รางวัลเลขท้าย 3 ตัว", 4000, x);
          }
        }
        logNotPrize(x)
        break;
      case 6:
        for (let i = 0; i < arrayLottoFinal[4][1][0]; i++) {
          if (x === arrayLottoFinal[0][2][0]) {
            return logToConsole("รางวัลที่ 1", 6000000, x);
          } else if (x === arrayLottoFinal[1][2][i]) {
            return logToConsole("รางวัลที่ 2", 200000, x);
          } else if (x === arrayLottoFinal[2][2][i]) {
            return logToConsole("รางวัลที่ 3", 80000, x);
          } else if (x === arrayLottoFinal[3][2][i]) {
            return logToConsole("รางวัลที่ 4", 40000, x);
          } else if (x === arrayLottoFinal[4][2][i]) {
            return logToConsole("รางวัลที่ 5", 20000, x);
          } else if (x === arrayLottoFinal[8][2][i]) {
            return logToConsole("รางวัลข้างเคียงรางวัลที่ 1", 100000, x);
          }
        }
        logNotPrize(x)
        break;
      default:
        throw new Error("Is not a lotto! | pls check a length.");
    }
  } catch (error) {
    console.log(error);
  }
};

program
  .name("check-lotto-CLI")
  .description("You can check thai lottery and become a millionaire!")
  .version("1.0.0")
  .requiredOption("-d, --date <date>", "Date to check lottery")
  .requiredOption("-x, --x <string>", "Number lottery to check!")
  .action(async (options) => {
    await getdata(options.date, options.x)
  })

program.parse()