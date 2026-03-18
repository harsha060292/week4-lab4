// Node.js implementation of COBOL Student Account Management System
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let storageBalance = 1000.00;

function displayMenu() {
  console.log('--------------------------------');
  console.log('Account Management System');
  console.log('1. View Balance');
  console.log('2. Credit Account');
  console.log('3. Debit Account');
  console.log('4. Exit');
  console.log('--------------------------------');
}

function askChoice() {
  rl.question('Enter your choice (1-4): ', (choice) => {
    handleChoice(choice.trim());
  });
}

function handleChoice(choice) {
  switch (choice) {
    case '1':
      viewBalance();
      break;
    case '2':
      creditAccount();
      break;
    case '3':
      debitAccount();
      break;
    case '4':
      exitApp();
      break;
    default:
      console.log('Invalid choice, please select 1-4.');
      mainLoop();
  }
}

function viewBalance() {
  console.log(`Current balance: ${storageBalance.toFixed(2)}`);
  mainLoop();
}

function creditAccount() {
  rl.question('Enter credit amount: ', (input) => {
    const amount = parseFloat(input);
    if (isNaN(amount) || amount < 0) {
      console.log('Invalid amount.');
      mainLoop();
      return;
    }
    storageBalance += amount;
    console.log(`Amount credited. New balance: ${storageBalance.toFixed(2)}`);
    mainLoop();
  });
}

function debitAccount() {
  rl.question('Enter debit amount: ', (input) => {
    const amount = parseFloat(input);
    if (isNaN(amount) || amount < 0) {
      console.log('Invalid amount.');
      mainLoop();
      return;
    }
    if (storageBalance >= amount) {
      storageBalance -= amount;
      console.log(`Amount debited. New balance: ${storageBalance.toFixed(2)}`);
    } else {
      console.log('Insufficient funds for this debit.');
    }
    mainLoop();
  });
}

function exitApp() {
  console.log('Exiting the program. Goodbye!');
  rl.close();
}

function mainLoop() {
  displayMenu();
  askChoice();
}

mainLoop();
