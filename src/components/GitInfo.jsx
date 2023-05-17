import React from 'react';
import moment from 'moment';

import gitLog from '../_generated_git_log';

const divstyle = {
  whiteSpace: 'pre-line',
};

const GitInfo = () => (
  <div style={divstyle}>{`\nApp built ${moment(gitLog.date, 'ddd MMM D YYYY HH:mm:ss').format('D MMM YYYY')}`}</div>
);

export default GitInfo;
