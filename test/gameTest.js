const expect = require('chai').expect;
const Game = require('../models/game');

describe('Game', function () {
  describe('addMember()', function () {
    it('should return an array of a registered member', function () {
      let game = new Game()
      let result = game.addMember('Jack');
      expect(result).to.be.an('array').that.deep.include({ name: 'Jack', spouse: undefined });
    });

    it('should return an array of a registered couple (2 members)', function () {
      let game = new Game()
      let result = game.addMember('Jack', 'Sarah');
      expect(result).to.be.an('array').that.deep.includes({ name: 'Jack', spouse: 'Sarah' }).and.deep.include({ name: 'Sarah', spouse: 'Jack' });
    });

  });

    describe('draw()', function () {
      it('should throw an error if there is only 1 person for draw', function () {
        let game = new Game()
        game.addMember('Jack');
        expect(game.draw.bind(game)).to.throw('*** Due to conditions, you can NOT use this app for only 1 person ***');
      });

      it('should throw an error if there is only 1 couple for draw', function () {
        let game = new Game()
        game.addMember('Jack', 'Sarah');
        expect(game.draw.bind(game)).to.throw('*** Due to conditions, you can NOT use this app for only 1 couple ***');
      });

      it('should throw an error if there are only 1 couple and 1 single person for draw', function () {
        let game = new Game()
        game.addMember('Jack', 'Sarah');
        game.addMember('John');
        expect(game.draw.bind(game)).to.throw('*** Due to conditions, you can NOT use this app for only 1 couple and 1 single person ***');
      });

    });

    describe('find()', function () {
      it('should return a string if a given name matches a person in the results list', function () {
        let game = new Game()
        game.addMember('Jack');
        game.addMember('John');
        game.draw();
        result = game.find('Jack');
        expect(result).to.be.a('string').that.includes('John')
      });

      it('should throw an error if a given name is NOT in the results list', function () {
        let game = new Game()
        game.addMember('Jack');
        game.addMember('John');
        game.draw();
        expect(game.find.bind(game, 'Sarah')).to.throw('*** There is NO member with such a name in the results list ***');
      });
    });

    describe('finalResults()', function () {
      it('should return an object of the list of matched members', function () {
        let game = new Game()
        game.addMember('Jack');
        game.addMember('John');
        game.draw();
        result = game.finalResults();
        expect(result).to.be.an('object').that.deep.includes({ Jack: 'John', John: 'Jack' });
      })
    });

    describe('restart()', function () {
      it('should return an object of empty members list and results list', function () {
        let game = new Game()
        game.addMember('Jack');
        game.addMember('John');
        game.draw();
        result = game.restart();
        expect(result).to.be.an('object').that.deep.includes({ membersList: [], resultsList: {} });
      })
    });

});
