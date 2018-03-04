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

	}


}
