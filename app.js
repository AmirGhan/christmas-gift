
const readline = require('readline');
const game = new (require('./src/game'))();




const rl = readline.createInterface(process.stdin, process.stdout);

rl.setPrompt('Please enter your command: ');
rl.prompt();

// rl.question('Please enter your name : ', (name) => {
//     rl.question('Please enter your spouse name: ', (spouse) => {
//         let person = game.addPerson(name, spouse)
//
//     });
// });
rl.on('line', function(line) {
  if (line.startsWith('r')) {
		let name = line.split(' ')[1];
		let spouse = line.split(' ')[2];
    let member = game.addMember(name, spouse)
    console.log("Successfully added: ", member)


  } else if (line.trim() === 'd') {
    game.draw();

  }

  rl.prompt();
})

rl.on('close', function() {
    console.log('*** Thank you for using our app, Have a great day! ***');
    process.exit(0);
});
