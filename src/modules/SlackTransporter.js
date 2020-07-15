const axios = require('axios');
const SLACK_URL = process.env.SLACK_WEBHOOK_URI;

class SlackTransporter {

  constructor(slackURL = SLACK_URL) {
    this.SLACK_URL = slackURL;
  }

  sendMessage(message) {
    const options = {
      method: 'post',
      url: this.SLACK_URL,
      data: {
        attachments: message
      }
    };

    axios(options)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    }
}

module.exports = SlackTransporter;




