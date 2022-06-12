#!/usr/bin/env node

const path = require('path')
const fs = require('fs')
const rimraf = require('rimraf')

function removeDir (p) {
  rimraf(p, (err) => {
    if (err) {
      console.log(`err: ${p}`)
    } else {
      console.log(`rm -rf: ${p}`)
    }
  })
}

function search (p) {
  const _p = path.resolve(p)
  const bn = path.basename(_p)
  fs.stat(_p, (err, stat) => {
    if (err) return
    if (stat.isDirectory()) {
      if (bn === 'node_modules') {
        removeDir(_p)
      } else {
        fs.readdir(p, (err, fnames) => {
          if (err) {
            console.error('error: ' + p)
            return
          }
          fnames.forEach(fname => {
            search(path.join(p, fname))
          })
        })
      }
    } else {
      return
    }
  })
}

const p = process.argv[2]

if (p !== undefined) {
  const absPath = path.resolve(process.cwd(), p)
  console.log(`clean: ${absPath}`)
  search(p)
} else {
  console.log(`usage: rmanm <path>`)
  process.exit(1)
}
