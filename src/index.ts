import { Octokit } from "octokit"
const { Select } = require('enquirer');

(async function () {
    const octokit = new Octokit({
        auth: ''
    })

    let choices = await octokit.request('GET /users/rsurjano/repos', {
        username: 'rsurjano',
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })

    choices = choices.data;
    const questions = []
    choices = (choices as any).map((data: any) => {
        return {
            name: data.full_name,
            archived: data.archived
        }
    }).filter((data: any) => data.archived === false)

    const prompt = new Select({
        name: 'github: rsurjano',
        message: 'Select a repository',
        choices
    });

    prompt.run()
        .then((answer: any) => {

            const gitUrl = 'git@github.com:' + answer + '.git';
            console.log('gitUrl', gitUrl);

        })
        .catch(console.error);


})()