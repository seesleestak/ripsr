#!/usr/bin/env node

const inquirer = require('inquirer')
const { exec } = require('child_process')

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

inquirer.prompt(prompts).then(({ search, replace }) => {
  exec(`rg -l ${search} | xargs sed -i '' 's|${search}|${replace}|g'`)
})
