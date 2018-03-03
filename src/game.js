const Person = require('./person');

module.exports = class Game {
	constructor () {
		this.members = [];

	}

	addPerson(name, spouse) {
		let member = new Person(name, spouse)
		this.members.push(member)
		if (spouse !== undefined) {
			let member2 = new Person(spouse, name)
			this.members.push(member2)
		}
		console.log(this.members)
		return member
	}

	draw()


}
