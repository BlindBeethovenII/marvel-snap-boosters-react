/**
 * script to generate the git log info into a file that the React app can then import.
 * to run - see package.json
 */

const fs = require('fs');

console.log('./scripts/generateGitLogFile.js | Started');

const outputFileName = './src/_generated_git_log.js';

// this is the result - start with a failure case
let logMessage = 'FAILED TO GENERATE GIT INFO';

const { exec } = require('child_process');

exec('git log -1 --oneline', (err, stdout /* , stderr */) => {
  if (err) {
    console.log(`./scripts/generateGitLogFile.js | git log command returned error ${err}`);
  } else {
    // okay - save the result, without the newline
    logMessage = `${stdout}`.replace('\n', '');
  }
  // add in a date, so we know when this log message was generated
  const date = new Date();

  // either way, write some output
  fs.writeFileSync(
    outputFileName,
    `/* eslint-disable */\nconst gitLogInfo = {\n  logMessage: '${logMessage.replace(
      /'/g,
      "\\'",
    )}',\n  date: '${date}',\n};\nexport default gitLogInfo;\n`,
  );
  console.log('./scripts/generateGitLogFile.js | File Generated');
});
