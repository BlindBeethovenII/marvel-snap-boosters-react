import React from 'react';
import moment from 'moment';

import gitLog from '../_generated_git_log';

const left = 30;
const top = 60;

const divstyle = {
  position: 'absolute',
  left: `${left}px`,
  top: `${top}px`,
  width: '300px',
  height: '40px',
  fontWeight: 'italic',
  fontSize: '12px',
  textAlign: 'left',
  color: 'black',
};

const GitInfo = () => (
  <div>
    <div style={divstyle}>{`App built ${moment(gitLog.date, 'ddd MMM D YYYY HH:mm:ss').format('D MMM YYYY')}`}</div>
  </div>
);

export default GitInfo;
