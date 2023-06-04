# CLI Select Repository

A simple util to select an unarchived repository based on an array of Organizations / Users, because it's more efficient just to select & clone an repo from the shell instead browsing.

## Features

- Retrieve list of repositories of given org/user
- Show a interactive CLI to select a repository
- Clone selected repo into current folder
- Initial Checklist for faster configuration

## Requirements

- A Github Token
- Git

## Installation

```shell
$ npm install --global @arnat/select-repo
```

## Configuration

...

## How to use

```shell
$ select-repo 
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
- [ ] Export as bin