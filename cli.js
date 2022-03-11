#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const { untype } = require('./untype')

const [,,...args] = process.argv
const filepath = path.resolve(args[0])
const filename = path.basename(filepath)

const ts = fs.readFileSync(filepath).toString()
const js = untype(filename, ts)
console.log(js)


