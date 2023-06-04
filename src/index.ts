#!/usr/bin/env node

import 'dotenv/config'

import { execSync } from 'child_process'
const { AutoComplete, prompt, Toggle } = require('enquirer');
const { request } = require("@octokit/request");
import checkbox, { Separator } from '@inquirer/checkbox';

let requestToUse = request;
let urlToRequest: 'orgs' | 'users' = 'orgs'

if (process.env.GITHUB_TOKEN) {
    requestToUse = request.defaults({
        headers: {
            authorization: "token " + process.env.GITHUB_TOKEN,
        },
    });
}

(async function () {
    const { username } = await prompt({
        type: 'input',
        name: 'username',
        message: 'What is your Github org/user?'
    });
    // console.log('github profile', username);

    let _config: any = await checkbox({
        instructions: false,
        message: 'Customize some options',
        choices: [
            { name: 'Show archived repos?', value: 'showArchived' },
            new Separator(),
        ],
    });
    let config: any = {}
    _config.forEach((item: any) => {
        config[item] = true
    })
    // console.log(' config', config);

    const isOrg = await new Toggle({
        message: 'it is a Github Organization?',
        enabled: 'Yep',
        disabled: 'Nope'
    }).run();
    // console.log('isOrg', isOrg);
    if (!isOrg) urlToRequest = 'users'
    // console.log('urlToRequest', urlToRequest);


    let choices = await requestToUse({
        method: 'GET',
        url: '/' + urlToRequest + '/' + username + '/repos',
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })

    choices = choices.data.map((data: any) => {
        return {
            name: data.full_name,
            archived: data.archived
        }
    });
    // console.log('checking config showarchived', config);
    
    if (!config.showArchived) choices = choices.filter((data: any) => data.archived === false)
    choices = choices.map((choice: any) => choice.name);


    const select = new AutoComplete({
        name: 'github: ' + urlToRequest + '/' + username,
        message: 'Filter a repository',
        choices
    });

    select.run()
        .then((answer: any) => {
            const gitUrl = 'git@github.com:' + answer + '.git';
            console.log('@run:clone ' + gitUrl);

            execSync('git clone ' + gitUrl)
        })
        .catch(console.error);
})()
