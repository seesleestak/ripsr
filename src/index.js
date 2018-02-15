const chalk = require('chalk')
const clear = require('clear')
const inquirer = require('inquirer')

clear()
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
  }
]

inquirer.prompt(prompts)
