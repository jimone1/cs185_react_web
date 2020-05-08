import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const style = makeStyles((theme) => ({
  root: {
    display: 'block',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: 'auto',
      height: theme.spacing(16),
    },
  },
}));

export default function SimplePaper(data) {
  const classes = style();

  return (
    <div className={classes.root}>
        
        <Paper elevation={3}>
            {data}
        </Paper>
    </div>
  );
}