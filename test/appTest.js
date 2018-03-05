const assert = require('chai').assert;
const expect = require('chai').expect;

// const game = new (require('../models/game'))();
const Game = require('../models/game');

describe('App', function () {
  describe('addMember()', function () {
    it('should return an array of a registered member', function () {
      let game = new Game()
      let result = game.addMember('Jack');
      console.log("result:", result)
      expect(result).to.be.an('array').that.deep.include({ name: 'Jack', spouse: undefined });

    });
    it('should return an array of a registered couple', function () {
      let game = new Game()
      let result = game.addMember('Jack', 'Sarah');
      console.log("result:", result)
      expect(result).to.be.an('array').that.deep.includes({ name: 'Jack', spouse: 'Sarah' }).and.deep.include({ name: 'Sarah', spouse: 'Jack' });

    });

  });

    describe('draw()', function () {
      it('should throw an error if there is only 1 person for draw', function () {
        let game = new Game()
        game.addMember('Jack');
        expect(game.draw.bind(game)).to.throw('*** Due to conditions, you can NOT use this app for only 1 person ***');
      });

    });

});
