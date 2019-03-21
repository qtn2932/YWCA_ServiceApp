import React from 'react';
import PropTypes from 'prop-types';
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withStyles } from '@material-ui/core/styles';
import withRoot from './withRoot';
import Axios from 'axios';
import Select from 'react-select';
import logo from "./assest/YWCA_LOGO.png"

const styles = theme => ({
  root: {
    margin: "0 auto",
    frontSize:"62.5%"
  },
  header:{
    display:"flex",
    justifyContent:"space-around",
  },

  logo:{
    width:"20%",
    height:"auto",
    alignSelf:"flex-start",
    marginTop:"5px",
  },
  AppBar:{
    backgroundColor:"pink",
    width:"100%",
    marginBottom:"20px",
    alignSelf:"center",
    display:"flex",
    justifyContent:"center",
    borderRadius:"4px",
    padding:"5px"
  },
  title:{
    alignSelf:"baseline",
    marginTop:"30px",
    color:"#FA4616",
    fontSize:"2rem",

  },
  sericePaper:{
    width:"30%",
    height:"100px",
    padding:"2%",
    marginRight:"3%",
    marginBottom:"20px"
  },
  serviceView:{
    width:"100%",
    display:"flex",
    flexWrap:"wrap"
  },
  selectTable: {
    marginBottom: "20px"
  },
  mainContainer: {
    margin: '0 auto',
    width: '500px',
  },
  innerContainer: {
    width: '1080px',
    margin: '50px auto'
  },
  paper: {
    padding: 20,
    background: 'linear-gradient(to bottom, #ffcccc 0%, #ff9933 100%)',
    display:"flex",
    flexWrap:"wrap",
    justifyContent:"center",
    height:"700px"
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

class App extends React.Component {
  state = {
    chapters: [],
    chapterName: [],
    categories: [],
    categoriesName: [],
    selected: null,
    isClearable: true,
    isDisable: false,
    isLoadingChapters: true,
    isLoadingCategories: true,
    isSearchable: true,
    selectedCategory: "Health and Wellness",
    availableActivities: [],
    noService: false
  };
  handleChange = (selected) => {
    this.setState({ selected });
  }
  handleCatChange = (selectedCategory) => {
    this.setState({ selectedCategory })
  }
  handleViewServices = () => {
    const { selected, chapters, categories, selectedCategory } = this.state
    const tempHolder = []
    for (let i = 0; i < chapters.length; i++) {
      console.log("really im here")
      console.log(selected.label)
      console.log(chapters[i].Chapters)
      if (chapters[i].Chapters === selected.label) {
        for (let z = 0; z < categories.length; z++) {
          console.log("im here tho")
          if (categories[z].Name === selectedCategory.label) {
            console.log("im here")
            console.log(selectedCategory.label)
            for (let x = 0; x < chapters[i].Services.length; x++) {
              for (let y = 0; y < categories[z].Service.length; y++) {
                if (chapters[i].Services[x] === categories[z].Service[y]) {
                  if (!tempHolder.includes(chapters[i].Services[x])) {
                    tempHolder.push(chapters[i].Services[x])
                  }
                }
              }
            }
          }
        }
        break;
      }

    }
    this.setState({ availableActivities: tempHolder })
    if (tempHolder.length === 0) {
      console.log("is this true?")
      this.setState({ noService: true })
    }
    else {
      this.setState({ noService: false })
    }
  }
  handleClose = () => {
    this.setState({
      open: false,
    });
  };
  handleTabChange = (event, value) => {
    this.setState({
      ...this.state,
      selectedCategory: value
    })
  }
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
  componentDidMount() {
    Axios.get('https://ywca-service-api.herokuapp.com/chapters/name')
      .then(res => {
        const tempHolder = [];
        res.data.forEach(element => {
          tempHolder.push({
            value: element, label: element
          })
        });
        this.setState({
          ...this.state,
          chapterName: tempHolder,
          isLoadingChapters: false
        })
      })
    Axios.get('https://ywca-service-api.herokuapp.com/categories')
      .then(res => {
        const tempHolder = [];
        res.data.forEach(element => {
          tempHolder.push({
            value: element.Name, label: element.Name
          })
        })
        this.setState({
          ...this.state,
          categories: res.data,
          categoriesName: tempHolder,
          isLoadingCategories: false
        })
      })
    Axios.get('https://ywca-service-api.herokuapp.com/chapters')
      .then(res => {
        // const tempHolder = [];
        // res.data.forEach(element => {
        //   tempHolder.push({
        //     chapter: element.Name, service: element.ServiceName
        //   })
        // })
        this.setState({
          ...this.state,
          chapters: res.data,
        })
      })
  }
  render() {
    const {
      chapterName,
      categoriesName,
      selected,
      isClearable,
      isDisable,
      isLoadingChapters,
      isLoadingCategories,
      isSearchable,
      selectedCategory,
      availableActivities
    } = this.state;
    const { classes } = this.props;
    if (availableActivities.length < 1) {

    }
    return (
      <div className={classes.root}>
        <div className={classes.innerContainer}>
          <Paper className={classes.paper}>
          <div className={classes.header}>
             <img className={classes.logo} src={logo} alt="logo"/>
            <Typography className={classes.title} variant="title">YWCA National Program Inventory</Typography>
          </div>
         
            

            <Typography className={classes.chapter}
              variant='h5'>YWCA Local Association:</Typography>
            <Select
              className={classes.selectTable}
              defaultValue={chapterName[0]}
              isDisabled={isDisable}
              isLoading={isLoadingChapters}
              isClearable={isClearable}
              isSearchable={isSearchable}
              name="chapters"
              options={chapterName}
              onChange={this.handleChange}
              value={selected}
              placeholder="Select a chapter"
            />
            <Typography className={classes.textTitle}
              variant='h5'>Programs:</Typography>
            <Select
              className={classes.selectTable}
              defaultValue={categoriesName[0]}
              isDisabled={isDisable}
              isLoading={isLoadingCategories}
              isClearable={isClearable}
              isSearchable={isSearchable}
              name="categories"
              options={categoriesName}
              onChange={this.handleCatChange}
              value={selectedCategory}
              placeholder="Select a category"
            />
            <Button onClick={this.handleViewServices}>View Services</Button>
            <div className={classes.serviceView}>
              {this.state.noService && (
                <Paper className={classes.sericePaper}>No Service available for this category</Paper>
              )}
              {this.state.availableActivities.map(element => (
                <Paper className={classes.sericePaper}>{element}</Paper>
              ))}
            </div>

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



