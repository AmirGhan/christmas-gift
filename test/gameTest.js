const expect = require('chai').expect;
const Game = require('../models/game');

describe('Game', function () {
  let game;
  beforeEach(function () {
    game = new Game();
  });

  describe('addMember()', function () {
    it('should return an array of a registered member', function () {
      let result = game.addMember('Jack');
      expect(result).to.be.an('array').that.deep.include({ name: 'Jack', spouse: undefined });
    });

    it('should return an array of a registered couple (2 members)', function () {
      let result = game.addMember('Jack', 'Sarah');
      expect(result).to.be.an('array').that.deep.includes({ name: 'Jack', spouse: 'Sarah' }).and.deep.include({ name: 'Sarah', spouse: 'Jack' });
    });

  });

    describe('draw()', function () {
      it('should throw an error if there is only 1 person for draw', function () {
        game.addMember('Jack');
        let result = game.draw()
        expect(result).to.be.a('string').that.includes('*** Due to conditions, you can NOT use this app for only 1 person ***');
      });

      it('should throw an error if there is only 1 couple for draw', function () {
        game.addMember('Jack', 'Sarah');
        let result = game.draw()
        expect(result).to.be.a('string').that.includes('*** Due to conditions, you can NOT use this app for only 1 couple ***');
      });

      it('should throw an error if there are only 1 couple and 1 single person for draw', function () {
        game.addMember('Jack', 'Sarah');
        game.addMember('John');
        let result = game.draw()
        expect(result).to.be.a('string').that.includes('*** Due to conditions, you can NOT use this app for only 1 couple and 1 single person ***');
      });

    });

    describe('find()', function () {
      it('should return a string if a given name matches a person in the results list', function () {
        game.addMember('Jack');
        game.addMember('John');
        game.draw();
        result = game.find('Jack');
        expect(result).to.be.a('string').that.includes('John');
      });

      it('should throw an error if a given name is NOT in the results list', function () {
        game.addMember('Jack');
        game.addMember('John');
        game.draw();
        let result = game.find('Sarah')
        expect(result).to.be.a('string').that.includes('*** There is NO member with such a name in the results list ***');
      });
    });

    describe('finalResults()', function () {
      it('should return an object of the list of matched members', function () {
        game.addMember('Jack');
        game.addMember('John');
        game.draw();
        result = game.finalResults();
        expect(result).to.be.an('object').that.deep.includes({ Jack: 'John', John: 'Jack' });
      });
    });

    describe('restart()', function () {
      it('should return an object of empty members list and results list', function () {
        game.addMember('Jack');
        game.addMember('John');
        game.draw();
        result = game.restart();
        expect(result).to.be.an('object').that.deep.includes({ membersList: [], resultsList: {} });
      });
    });

});
