
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
  if (line.startsWith('register')) {
		let name = line.split(' ')[1];
		let spouse = line.split(' ')[2];
    let member = game.addMember(name, spouse)
    console.log("Successfully added: ", member)


  } else if (line.trim() === 'draw') {
    try {

      let results = game.draw();
      console.log("Results: ", results)
    }
    catch (err){
      console.log(err)
    }

  } else if (line.trim() === 'restart') {
    game.restart();
    console.log("*** The app has been restarted ***")

  }

  rl.prompt();
})

rl.on('close', function() {
    console.log('*** Thank you for using our app... Merry Christmas!!! ***');
    process.exit(0);
});
