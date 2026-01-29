// const readline = require("readline");

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// rl.question("Введите первое число: ", (num1) => {
//   rl.question("Введите математический знак (+, -, *, /): ", (operator) => {
//     rl.question("Введите второе число: ", (num2) => {
//       const number1 = parseFloat(num1);
//       const number2 = parseFloat(num2);
//       let result;

//       switch (operator) {
//         case "+":
//           result = number1 + number2;
//           break;
//         case "-":
//           result = number1 - number2;
//           break;
//         case "*":
//           result = number1 * number2;
//           break;
//         case "/":
//           result = number1 / number2;
//           break;
//         default:
//           console.log("Неверный математический знак");
//           rl.close();
//           return;
//       }

//       console.log(`Результат: ${result}`);
//       rl.close();
//     });
//   });
// });

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Введите первое число: ", (num1) => {
  rl.question("Введите второе число: ", (num2) => {
    const number1 = parseFloat(num1);
    const number2 = parseFloat(num2);

    console.log(`Результат: ${number1 + number2}`);
    rl.close();
  });
});
