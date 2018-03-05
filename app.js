
const readline = require('readline');
const game = new (require('./models/game'))();

function init() {
  console.log(
    "**************************************** \n" +
    "*** WELCOME TO THE GIFT EXCHANGE APP *** \n" +
    "****************************************"
  )
};
init();

function printHelp() {
  console.log(
    "COMMANDS: \n" +
    " 'help' for the list of commands. \n" +
    " 'register [YOUR NAME] [SPOUSE NAME]' to register. \n ***** Names must be unique! ***** \n *** If you have a spouse, you have to register one time only and add his/her name with yourself, otherwise leave it blank. ***  \n" +
    " 'draw' to match registered members \n" +
    " 'get [YOUR NAME]' to see who you should give a gift. \n" +
    " 'results' to see the results of everyone. \n" +
    " 'restart' to reset and start a new game. \n" +
    " 'ctrl + C' to exit the app"
  )
};

printHelp();

const rl = readline.createInterface(process.stdin, process.stdout);

rl.setPrompt('Please enter your command: ');
rl.prompt();


rl.on('line', function(line) {
  if (line.startsWith('register')) {
		let name = line.split(' ')[1];
		let spouse = line.split(' ')[2];
    if (name) {
      let member = game.addMember(name, spouse)
      console.log("Successfully added: ", member)

    } else {
		 	console.log("You must enter a name after 'register' command");
		}

  } else if (line.trim() === 'draw') {
    try {
      game.draw();
      console.log("*** Draw has been done! ***")
    }
    catch (err){
      console.log(err)
    }

  } else if (line.startsWith('get')) {
    let name = line.slice('get '.length);
    if (name.length > 0) {
      try {
        let matched = game.find(name)
        console.log(`'${name}' gives a gift to '${matched}'`)
      }
      catch(err){
        console.log(err)
      }
    } else {
		 	console.log("You must enter a name after 'get' command");
		}

  } else if (line.trim() === 'results') {
    let results = game.finalResults();
    console.log("Results: ", results)

  } else if (line.trim() === 'restart') {
    game.restart();
    console.log("*** The app has been restarted! ***")

  } else if (line.trim() === 'help') {
    printHelp();

  } else {
    console.log(
      "***** Unknown command ***** \n" +
      "Type 'help' for the list of valid commands"
    )
  }

  rl.prompt();
})

rl.on('close', function() {
    console.log('*** Thank you for using our app... Merry Christmas!!! ***');
    process.exit(0);
});
