import { createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width:"50%",
    margin: "auto",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  formControl: {
    margin: theme.spacing(1),
  },
  formControlMulti: {
    margin: theme.spacing(1),
    width: 200
  },
  indeterminateColor: {
    color: "#f50057"
  },
}));


const ModalStyles = () => {
  return useStyles();
};

export default ModalStyles;
