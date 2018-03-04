const Member = require('./member');

module.exports = class Game {
	constructor () {
		this.members = [];


	}

	addMember(name, spouse) {
		let member = new Member(name, spouse)
		this.members.push(member)
		if (spouse !== undefined) {
			let member2 = new Member(spouse, name)
			this.members.push(member2)
		}
		return member
	}

	draw() {
		let giftArr = this.members.slice();
		console.log("giftArr: ", giftArr)
		for (let i = 0; i < this.members.length; i++){
			let randomNum = Math.floor(Math.random() * giftArr.length);
			console.log("randomNum: ", randomNum)

			if (this.members[i].name == giftArr[randomNum].name || this.members[i].spouse == giftArr[randomNum].name) {
				i--; continue;
			}
			let matchedPerson = giftArr.splice(randomNum, 1)[0];

			let obj = {}
			obj[this.members[i].name] = matchedPerson.name
			console.log(obj)

		}

		// restartLoop:
		// while(true) {
		// 	for (let i = 0; i < this.members.length; i++) {
		// 		let randomNum = Math.floor(Math.random() * giftArr.length);
		// 		console.log("randomNum: ", randomNum)
		// 		if (this.members[i].name == giftArr[randomNum].name || this.members[i].spouse == giftArr[randomNum].name) {
		// 			break restartLoop;
		// 		}
		// 		let matchedPerson = giftArr.splice(randomNum, 1)[0];
    //
		// 		let obj = {}
		// 		obj[this.members[i].name] = matchedPerson.name
		// 		console.log(obj)
		// 	}
		// 	break;
    //
		// }



		// for (let i of this.members) {
		// 	let randomNum = Math.floor(Math.random() * giftArr.length);
		// 		console.log("randomNum: ", randomNum)
    //
		// 		if (i.name !== giftArr[randomNum].name || i.spouse == giftArr[randomNum].name) {
		// 			//RESET
		// 		}
    //
		// 		let matchedPerson = giftArr.splice(randomNum, 1)[0];
		// 		let obj = {}
		// 		obj[i.name] = matchedPerson.name
		// 		console.log(obj)
		// }


	}



}
