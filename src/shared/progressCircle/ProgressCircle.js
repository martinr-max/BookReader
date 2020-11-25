import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import './ProgressCircle.css';



export default function CircularIndeterminate({color, size}) {

  return (
    <div className="spinner overLay">
      <CircularProgress color={color} size={size} />
    </div>
  );
}