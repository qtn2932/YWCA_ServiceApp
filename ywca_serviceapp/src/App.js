import React, { Component } from 'react';
import PropTypes, { element } from 'prop-types';
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { withStyles } from '@material-ui/core/styles';
import withRoot from './withRoot';
import { MenuList, MenuItem, IconButton,Menu } from '@material-ui/core';
import { MoreVertIcon } from '@material-ui/icons';
import Axios from 'axios';


const styles = theme => ({
  root: {
    margin: "0 auto",
  },
  mainContainer: {
    margin: '0 auto',
    width: '500px',
  },
  innerContainer: {
    width: '500px',
    margin: '50px auto'
  },
  paper: {
    padding: 20,
    background: 'linear-gradient(to bottom, #99ccff 0%, #ffff99 87%)',
  },
  text: {
    paddingBottom: 70,
    fontSize: "22px"
  },
  textTitle: {
    paddingBottom: 20,
    fontSize: "22px"
  },
  button: {
    padding: 15,
    width: "100%"
  }
});

const ITEM_HEIGHT = 48;
class App extends React.Component {
  state = {
    open: false,
    chapterName: [],
    newArr:[1,2,3,4,5,6,7]
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleClick = () => {
    this.setState({
      open: true,
      anchorEl: null,
    });
  };
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  componentDidMount(){
    Axios.get('https://ywca-service-api.herokuapp.com/chapters/name')
    .then(res=>{
      this.setState({
        ...this.state,
        chapterName:res.data
      })
    })
  }
  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.innerContainer}>
          <Paper className={classes.paper}>
            <Typography className={classes.textTitle}
              variant='title'>Chapters:</Typography>
            <IconButton
              aria-label="More"
              aria-owns={open ? 'long-menu' : undefined}
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              <Button>Icon Here</Button>
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={this.handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: 400,
                },
              }}
            >
              {this.state.chapterName.map(option => (
                <MenuItem key={option}  onClick={this.handleClose}>
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </Paper>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(App));



