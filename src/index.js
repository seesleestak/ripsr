#!/usr/bin/env node

const inquirer = require('inquirer')
const chalk = require('chalk')
const argv = require('yargs').argv
const { exec } = require('child_process')

let searchTerm = null
let replaceTerm = null

function executeReplace() {
  exec(
    `rg -l -F '${searchTerm}' | xargs sed -i '' 's|${searchTerm}|${replaceTerm}|g'`,
    (err) => {
      err && console.log('err --- ', err)
    }
  )
}

if (argv._.length) {
  if (argv._.length < 2) {
    console.log('Must have two arguments: Search and replace')
  } else if (argv._.length === 2) {
    searchTerm = argv._[0]
    replaceTerm = argv._[1]
    executeReplace()
  } else {
    console.log('Invalid arguments')
  }
} else {
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
        if (argv.verbose) {
          exec(
            `rg -l -F '${searchPrompt}'`,
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
        } else {
          searchTerm = searchPrompt
          replace()
        }
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
          executeReplace()
        } else {
          return 
        }
      })
  }

  search()
}

