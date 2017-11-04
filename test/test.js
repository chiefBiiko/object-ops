const should = require('chai').should()
const ops = require('./../index')

describe('object-ops', () => {

  describe('.values(obj)', () => {
    it('should return an array that contains all values of the object', () => {
      ops.values({ a: 1, b: { c: 2 } }).should.deep.equal([ 1, { c: 2 } ])
    })
  })

  describe('.props(obj)', () => {
    it('should return an array that contains all object properties', () => {
      ops.props({ a: 1, b: { c: 2 } })
        .should.deep.equal([ [ 'a', 1 ], [ 'b', { c: 2 } ] ])
    })
  })

  describe('.map(obj, func, that)', () => {
    it('should return an object mapped according to func', () => {
      ops.map({ a: 1, b: 2 }, (val, key, obj) => 2 * val)
        .should.deep.equal({ a: 2, b: 4 })
    })
  })

  describe('.filter(obj, func, that)', () => {
    it('should return an object filtered according to func', () => {
      ops.filter({ a: 1, b: 2 }, (val, key, obj) => val % 2 === 0)
        .should.deep.equal({ b: 2 })
    })
  })

  describe('.reduce(obj, func, init, that)', () => {
    it('should reduce an object to a single value', () => {
      ops.reduce({ a: 1, b: 2, c: 3 }, (acc, cur, key, obj) => acc += cur, 0)
        .should.equal(6)
    })
  })

  describe('.forEach(obj, func, that)', () => {
    var stdout = ''
    it('should apply func for to every property', () => {
      ops.forEach({ a: 1, b: 2 }, (key, val) => stdout += `${key}:${val}\n`)
    })
  })

  describe('.every(obj, func, that)', () => {
    it('should assert all func returns are truthy', () => {
      ops.every({ a: 2, b: 4 }, (val, key, obj) => val % 2 === 0)
        .should.be.true
      ops.every({ a: 5, b: 4 }, (val, key, obj) => val % 2 === 0)
        .should.be.false
    })
  })

  describe('.some(obj, func, that)', () => {
    it('should assert some func returns are truthy and shortcircuit', () => {
      ops.some({ a: 1, b: null, c: 3 }, (val, key, obj) => val === null)
        .should.be.true
    })
  })

  describe('.randomProp(obj)', () => {
    it('should return an [ key, val ] of obj at random', () => {
      ops.randomProp({ a: 1, b: 2 }).should.be.an('array')
    })
  })

  describe('.randomKey(obj)', () => {
    it('should return a key of object at random', () => {
      [ 'a', 'b' ].includes(ops.randomKey({ a: 1, b: 2 })).should.be.true
    })
  })


  describe('.randomVal(obj)', () => {
    it('should return a key of object at random', () => {
      [ 1, 2 ].includes(ops.randomVal({ a: 1, b: 2 })).should.be.true
    })
  })

  describe('.hasProp(obj, key, val)', () => {
    it('should check if obj contains any key-val pair', () => {
      ops.hasProp({ a: 1, z: 99 }, 'z', 99).should.be.true
    })
  })

  describe('.hasKey(obj, key)', () => {
    it('should check if obj has key as own property', () => {
      ops.hasKey({ a: 1 }, 'a').should.be.true
      ops.hasKey({ z: 9 }, 'a').should.be.false
    })
  })

  describe('.hasValue(obj, val)', () => {
    it('should check if obj contains any val', () => {
      ops.hasValue({ a: 1, z: 99 }, 99).should.be.true
    })
  })

  describe('.keysOf(val)', () => {
    it('should return an array of keys that point to val', () => {
      ops.keysOf({ a: 1, g: 7, z: 7 }, 2).should.be.empty
      ops.keysOf({ a: 1, g: 7, z: 7 }, 7).should.deep.equal([ 'g', 'z' ])
    })
  })

})
