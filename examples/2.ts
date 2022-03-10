import _ from 'lodash'
import type Blah from 'blah'

interface C {
    hello: string
    world: number
}

const a: number = 1
const b: string = "hello"
const c: C = {
    hello: 'hello',
    world: 1
}
const d: Blah = 1
const e = _.doTheThing()

// print out all the things
console.log(a, b, c, d, e)

export default a