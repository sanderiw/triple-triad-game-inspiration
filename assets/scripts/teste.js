const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
   
  readline.question('Who are you? ', name => {
    console.log(`Hey there ${name}!`);
    console.log(typeof name)
    readline.close();
  });