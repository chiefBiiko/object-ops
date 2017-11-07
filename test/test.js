const should = require('chai').should()
const ops = require('./../index')

describe('pojo-ops', () => {

  describe('.keys(obj)', () => {
    it('should just alias Object.keys', () => {
      ops.keys({ a: 1, b: 2 }).should.deep.equal([ 'a', 'b' ])
    })
  })

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
    const pojo = {}
    it('should not mutate the input object', () => {
      Object.is(pojo, ops.map(pojo, v => v)).should.be.false
    })
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
    it('should apply func for each property', () => {
      ops.forEach({ a: 1, b: 2 }, (val, key, obj) => stdout += `${key}:${val}\n`)
      stdout.should.equal('a:1\nb:2\n')
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
    it('should return a key of obj at random', () => {
      [ 'a', 'b' ].includes(ops.randomKey({ a: 1, b: 2 })).should.be.true
    })
  })


  describe('.randomVal(obj)', () => {
    it('should return a value of obj at random', () => {
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

  describe('.hasVal(obj, val)', () => {
    it('should check if obj contains any val', () => {
      ops.hasVal({ a: 1, z: 99 }, 99).should.be.true
    })
  })

  describe('.keysOf(val)', () => {
    it('should return an array of keys that point to val', () => {
      ops.keysOf({ a: 1, g: 7, z: 7 }, 2).should.be.empty
      ops.keysOf({ a: 1, g: 7, z: 7 }, 7).should.deep.equal([ 'g', 'z' ])
    })
  })

  describe('.extend(target, ...sources)', () => {
    const target = {}
    it('should not mutate the input object', () => {
      Object.is(target, ops.extend(target, {})).should.be.false
    })
    it('should extend target by own sources.props, last see last be', () => {
      ops.extend({ t: 0 }, { u: 1 }, { v: 2 }, { v: 8 })
        .should.deep.equal({ t: 0, u: 1, v: 8 })
    })
  })

  describe('.extendLock(target, ...sources)', () => {
    const target = {}
    it('should not mutate the input object', () => {
      Object.is(target, ops.extendLock(target, {})).should.be.false
    })
    it('should extend target by own sources.props, first see first be', () => {
      ops.extendLock({ t: 0 }, { u: 1 }, { v: 2 }, { v: 8 })
        .should.deep.equal({ t: 0, u: 1, v: 2 })
    })
  })

  describe('.clone(obj)', () => {
    const biik = { b: 9 }
    it('should clone all own props of the input object', () => {
      ops.clone(biik).should.deep.equal({ b: 9 })
    })
    it('should return a new instance', () => {
      Object.is(ops.clone(biik), biik).should.be.false
    })
  })

  describe('.empty(obj)', () => {
    it('should check whether obj has any own property', () => {
      ops.isEmpty({}).should.be.true
      ops.isEmpty({ z: 5 }).should.be.false
    })
  })

  describe('support for objects without a prototype', () => {
    const noop = Object.create(null)
    noop.b = 7
    it('should allow passing objects with no prototype', () => {
      ops.hasKey(noop, 'a').should.be.false
      ops.hasKey(noop, 'b').should.be.true
    })
  })

})
