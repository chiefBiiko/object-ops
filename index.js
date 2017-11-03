const ops = {
  values(obj) {
    return Object.keys(obj).map(k => obj[k])
  },
  props(obj) {
    return Object.keys(obj).map(k => [ k, obj[k] ])
  },
  map(obj, func, that) { // func(val, key, obj)
    return this.props(obj).reduce((acc, cur) => {
      acc[cur[0]] = func.apply(that, cur.reverse().concat(obj))
      return acc
    }, {})
  },
  filter(obj, func, that) { // func(val, key, obj)
    return this.props(obj).reduce((acc, cur) => {
      if (func.apply(that, cur.reverse().concat(obj))) acc[cur[1]] = cur[0]
      return acc
    }, {})
  },
  reduce(obj, func, init, that) { // func(acc, cur, key, obj)
    const props = this.props(obj)
    return (function step(i, acc) {
      if (i > props.length - 1) return acc
      return step(i + 1, func.call(that, acc, props[i][1], props[i][0], obj))
    })(0, init)
  },
  forEach(obj, func, that) { // func(val, key, obj)
    this.props(obj).forEach(p => func.apply(that, p.reverse().concat(obj)))
  },
  every(obj, func, that) { // func(val, key, obj)
    return this.props(obj).reduce((acc, cur) => {
      if (!func.apply(that, cur.reverse().concat(obj))) acc = false
      return acc
    }, true)
  },
  some(obj, func, that) { // func(val, key, obj)
    const props = this.props(obj)
    var rtn = false
    var i = 0
    while(!rtn && i < props.length) {
      rtn = !!func.apply(that, props[i].reverse().concat(obj))
      i++
    }
    return rtn
  },
  randomProp(obj) {
    const props = this.props(obj)
    return props[Math.floor(Math.random() * props.length)]
  },
  hasValue(obj, val) {
    return this.some(obj, v => v === val)
  },
  hasProp(obj, key, val) {
    return this.some(obj, (v, k) => k === key && v === val)
  },
  keysOf(obj, val) {
    return this.props(obj).filter(p => val === p[1]).map(p => p[0])
  }
}

module.exports = Object.freeze(ops)
