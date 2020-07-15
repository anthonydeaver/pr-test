const { Octokit } = require("@octokit/rest");
const create_age = process.env.PR_AGE;
const timestamp = new Date();
const SlackTransporter = require('./modules/SlackTransporter');

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});
const slackTransporter = new SlackTransporter();

timestamp.setDate(timestamp.getDate() - create_age);

octokit.pulls.list({
  owner: process.env.REPO_OWNER,
  repo: process.env.REPO,
}).then(({ data }) => {
  let formatted = [];
  for (let i = 0; i < data.length; i = i + 1) {
    const entry = data[i];
    const color = (Date.parse(timestamp) > Date.parse(entry.created_at)) ? '#ff3b33' : "#007a5a";
    formatted.push({      
        color,
        "title": entry.title,
        "text": entry.html_url
      });
  }
  return formatted;

}).then((prs) => {
  console.log(prs);
  slackTransporter.sendMessage(prs);
})


