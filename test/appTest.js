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


});
