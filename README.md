# ripsr
[![npm version](https://badge.fury.io/js/ripsr.svg)](https://badge.fury.io/js/ripsr)

A search and replace command line utility based on [ripgrep](https://github.com/BurntSushi/ripgrep).

## Installation

```bash
npm install ripsr -g
```

## Dependencies

You need [ripgrep](https://github.com/BurntSushi/ripgrep) to use this. 

```bash
brew install ripgrep
```

## Usage

Upon entering the `rsr` command you will be prompted for a search term and a replace term. Add the `--verbose` flag to view file paths that matched the search query.

Alternatively, you can give `rsr` command the search and replace arguments as strings. For example:

```bash
rsr 'SearchTerm' 'ReplaceTerm'
```

With this usage, there will be no confirmation prompts and the search and replace will be executed immediately.
