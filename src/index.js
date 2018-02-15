#!/usr/bin/env node

const inquirer = require('inquirer')
const chalk = require('chalk')
const { exec } = require('child_process')

let searchTerm = null
let replaceTerm = null

const prompts = [
  {
    name: 'search',
    type: 'input',
    message: 'Search term:',
  },
  {
    name: 'replace',
    type: 'input',
    message: 'Replace term:',
  },
  {
    name: 'confirmSearch',
    type: 'confirm',
    message: 'Search results acceptable?'
  },
  {
    name: 'confirmExecute',
    type: 'confirm',
    message: 'Execute search and replace?'
  }
]

function search() {
  inquirer.prompt(prompts[0])
    .then(({ search }) => {
      exec(
        `rg -l ${search}`,
        (err, stdout, stderr) => {
          console.log(chalk.magenta(stdout))
          if (err) {
            console.log('err --- ', err)
            return 
          } else {
            searchTerm = search
            confirmSearch()
          }
        }
      )
    })
}

function confirmSearch() {
  inquirer.prompt(prompts[2])
    .then(() => {
      replace()
    })
}

function replace() {
  inquirer.prompt(prompts[1])
    .then(({ replace }) => {
      replaceTerm = replace
      confirmSearchReplace()
    })
}

function confirmSearchReplace() {
  inquirer.prompt(prompts[3])
    .then(() => {
      exec(
        `rg -l ${searchTerm} | xargs sed -i '' 's|${searchTerm}|${replaceTerm}|g'`,
        (err) => {
          err && console.log('err --- ', err)
        }
      )
    })
}

search()
