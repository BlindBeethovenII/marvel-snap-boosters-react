import React from 'react';
import moment from 'moment';

import gitLog from '../_generated_git_log';

const left = 30;
const top = 30;

const builtstyle = {
  position: 'absolute',
  left: `${left}px`,
  top: `${top}px`,
  width: '40px',
  height: '40px',
  fontWeight: 'italic',
  fontSize: '12px',
  textAlign: 'center',
  color: 'black',
};

const datestyle = {
  position: 'absolute',
  left: `${left}px`,
  top: `${top + 15}px`,
  width: '40px',
  height: '40px',
  fontWeight: 'italic',
  fontSize: '12px',
  textAlign: 'center',
  color: 'black',
};

const GitInfo = () => (
  <div>
    <div style={builtstyle}>Built</div>
    <div style={datestyle}>{moment(gitLog.date, 'ddd MMM D YYYY HH:mm:ss').format('DMMMYY')}</div>
  </div>
);

export default GitInfo;
