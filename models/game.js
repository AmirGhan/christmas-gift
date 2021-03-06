const Member = require('./member');

module.exports = class Game {
	constructor () {
		this.members = [];
		this.results = {};
	}

	addMember(name, spouse) {
		let registeredMember = [];
		let member = new Member(name, spouse);
		this.members.push(member);
		registeredMember.push(member);
		if (spouse !== undefined && spouse != '') {
			let member2 = new Member(spouse, name);
			this.members.push(member2);
			registeredMember.push(member2);
		}
		return registeredMember;
	}

	draw() {
		// Stops if only 1 person registered
		if(this.members.length == 1){
			return "*** Due to conditions, you can NOT use this app for only 1 person ***";
		}
		// Stops if only 1 couple registered
		if(this.members.length == 2 && this.members[0].name == this.members[1].spouse){
			return "*** Due to conditions, you can NOT use this app for only 1 couple ***";
		}
		// Stops if only 1 couple and 1 person registered
		if(this.members.length == 3 && (this.members[0].name == this.members[1].spouse || this.members[1].name == this.members[2].spouse || this.members[0].name == this.members[2].spouse)){
			return "*** Due to conditions, you can NOT use this app for only 1 couple and 1 single person ***";
		}

		let giftArr = this.members.slice(); // Create a copy of the members list

		for (let i = 0; i < this.members.length; i++){
			let randomNum = Math.floor(Math.random() * giftArr.length); // Generate a random number based on remaining unmatched people

			// For the second last person, check if the 2 remaining people are himself and his spouse, if yes: reset
			if (i == this.members.length - 2) {
				if (
					(this.members[i].name == giftArr[0].name  || this.members[i].spouse == giftArr[0].name)
					&&
					(this.members[i].name == giftArr[1].name  || this.members[i].spouse == giftArr[1].name)
				) {
					this.reset();
					break;
				}
			}

			// For the last person, check if the remaining person is himself or his spouse, if yes: reset
			if (i == this.members.length - 1 && (this.members[i].name == giftArr[randomNum].name || this.members[i].spouse == giftArr[randomNum].name)) {
				this.reset();
				break;
			}

			// When a person matches with himself or his spouse, go back and generate another random number until passes this condition
			if (this.members[i].name == giftArr[randomNum].name || this.members[i].spouse == giftArr[randomNum].name) {
				i--;
				continue;
			}
			let matchedPerson = giftArr.splice(randomNum, 1)[0]; // Removing the matched person from the list

			this.results[this.members[i].name] = matchedPerson.name;
		}
	}

	reset(){
		this.draw();
	}

	find(name){
		if (name in this.results) {
			return this.results[name];
		} else {
			return "*** There is NO member with such a name in the results list ***";
		}
	}

	finalResults(){
		return this.results;
	}

	restart(){
		let membersList = this.members = [];
		let resultsList = this.results = {};
		return {
			membersList: membersList,
			resultsList: resultsList
		};
	}

};
