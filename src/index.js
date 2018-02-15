#!/usr/bin/env node

const inquirer = require('inquirer')
const chalk = require('chalk')
const argv = require('yargs').argv
const { exec } = require('child_process')

let searchTerm = null
let replaceTerm = null

const prompts = [
  {
    name: 'searchPrompt',
    type: 'input',
    message: 'Search term:',
  },
  {
    name: 'replacePrompt',
    type: 'input',
    message: 'Replace term:',
  },
  {
    name: 'confirmSearchPrompt',
    type: 'confirm',
    message: 'Search results acceptable?'
  },
  {
    name: 'confirmExecutePrompt',
    type: 'confirm',
    message: 'Execute search and replace?'
  }
]

function search() {
  inquirer.prompt(prompts[0])
    .then(({ searchPrompt }) => {
      exec(
        `rg -l ${searchPrompt}`,
        (err, stdout, stderr) => {
          console.log(chalk.magenta(stdout))
          if (err) {
            console.log('err --- ', err)
            return 
          } else {
            searchTerm = searchPrompt
            confirmSearch()
          }
        }
      )
    })
}

function confirmSearch() {
  inquirer.prompt(prompts[2])
    .then(({ confirmSearchPrompt }) => {
      if (confirmSearchPrompt) { 
        replace() 
      } else {
        return
      }
    })
}

function replace() {
  inquirer.prompt(prompts[1])
    .then(({ replacePrompt }) => {
      replaceTerm = replacePrompt
      confirmSearchReplace()
    })
}

function confirmSearchReplace() {
  inquirer.prompt(prompts[3])
    .then(({ confirmExecutePrompt }) => {
      if (confirmExecutePrompt) {
        exec(
          `rg -l ${searchTerm} | xargs sed -i '' 's|${searchTerm}|${replaceTerm}|g'`,
          (err) => {
            err && console.log('err --- ', err)
          }
        )
      } else {
        return 
      }
    })
}

search()
