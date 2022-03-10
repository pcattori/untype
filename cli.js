#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const { untype } = require('./untype')

const [,,...args] = process.argv
const file = path.resolve(args[0])


const ts = fs.readFileSync(file).toString()
const js = untype(ts)
console.log(js)


