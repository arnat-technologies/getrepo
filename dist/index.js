#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const child_process_1 = require("child_process");
const { AutoComplete, prompt, Toggle } = require('enquirer');
const { request } = require("@octokit/request");
const checkbox_1 = __importStar(require("@inquirer/checkbox"));
let requestToUse = request;
let urlToRequest = 'orgs';
if (process.env.GITHUB_TOKEN) {
    requestToUse = request.defaults({
        headers: {
            authorization: "token " + process.env.GITHUB_TOKEN,
        },
    });
}
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        const { username } = yield prompt({
            type: 'input',
            name: 'username',
            message: 'What is your Github org/user?'
        });
        // console.log('github profile', username);
        let _config = yield (0, checkbox_1.default)({
            instructions: false,
            message: 'Customize some options',
            choices: [
                { name: 'Show archived repos?', value: 'showArchived' },
                new checkbox_1.Separator(),
            ],
        });
        let config = {};
        _config.forEach((item) => {
            config[item] = true;
        });
        // console.log(' config', config);
        const isOrg = yield new Toggle({
            message: 'it is a Github Organization?',
            enabled: 'Yep',
            disabled: 'Nope'
        }).run();
        // console.log('isOrg', isOrg);
        if (!isOrg)
            urlToRequest = 'users';
        // console.log('urlToRequest', urlToRequest);
        let choices = yield requestToUse({
            method: 'GET',
            url: '/' + urlToRequest + '/' + username + '/repos',
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });
        choices = choices.data.map((data) => {
            return {
                name: data.full_name,
                archived: data.archived
            };
        });
        // console.log('checking config showarchived', config);
        if (!config.showArchived)
            choices = choices.filter((data) => data.archived === false);
        choices = choices.map((choice) => choice.name);
        const select = new AutoComplete({
            name: 'github: ' + urlToRequest + '/' + username,
            message: 'Filter a repository',
            choices
        });
        select.run()
            .then((answer) => {
            const gitUrl = 'git@github.com:' + answer + '.git';
            console.log('@run:clone ' + gitUrl);
            (0, child_process_1.execSync)('git clone ' + gitUrl);
        })
            .catch(console.error);
    });
})();
//# sourceMappingURL=index.js.map