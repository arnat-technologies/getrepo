# CLI Get Github Repository

A simple util to select a repository based of a Organization / User, because it's more efficient just to select & clone a repository from the shell instead browsing.

## Features

- Retrieve list of repositories of given org/user
- Show a interactive CLI to filter & select a repository
- Clone selected repo into current folder

## Requirements

- A Github Token(optional)
- Git

## Installation

```shell
$ npm install --global @arnat/getrepo
```

## How to use

```shell
$ getrepo 
```

## To-Do

- [x] type organization or profile
- [x] get list of project from api
- [x] filter archived
- [x] parse only name
- [x] send to npm cli library to select
- [x] selected concat for git URL
- [x] clone selected project
- [x] Token Environment setting
- [x] config: add dynamic
- [x] config: scan archived repos?
- [x] Search filter instead select repo
- [x] namespace for deployment
- [x] Export as bin

## Future Improves

- [ ] Unit testing
- [ ] Best practices
- [ ] CLI improves by arguments
