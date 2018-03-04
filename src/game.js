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
			console.log("giftArr length: ", giftArr.length)

			// for the second last person, check if the 2 remaining people are himself and his spouse, if yes: reset
			if (i == this.members.length - 2) {
				if (
					(this.members[i].name == giftArr[0].name  || this.members[i].spouse == giftArr[0].name)
					&&
					(this.members[i].name == giftArr[1].name  || this.members[i].spouse == giftArr[1].name)
				) {
					this.reset();
					break;
				}
			};

			// for the last person, check if the remaining person is himself or his spouse, if yes: reset
			if (i == this.members.length - 1 && (this.members[i].name == giftArr[randomNum].name || this.members[i].spouse == giftArr[randomNum].name)) {
				this.reset();
				break;
			};

			// when a person matches with himself or his spouse, go back and generate another random number until passes this condition
			if (this.members[i].name == giftArr[randomNum].name || this.members[i].spouse == giftArr[randomNum].name) {
				i--; continue;
			};

			let matchedPerson = giftArr.splice(randomNum, 1)[0];

			let obj = {}
			obj[this.members[i].name] = matchedPerson.name
			console.log("***************************", obj)

		}



	}

	reset(){
		this.draw()
	}



}
