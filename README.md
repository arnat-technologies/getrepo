# CLI Select Repository

A simple util to select an unarchived repository based on an array of Organizations / Users, because it's more efficient just to select & clone an repo from the shell instead browsing.

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

- [ ] array of organizations/profiles
- [ ] select org/profile
- [x] get list of project from api
- [x] filter archived
- [x] parse only name
- [x] send to npm cli library to select
- [x] selected concat for git URL
- [ ] clone selected project
- [ ] Token Environment setting
