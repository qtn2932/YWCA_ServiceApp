import React from 'react';
import PropTypes from 'prop-types';
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withStyles } from '@material-ui/core/styles';
import withRoot from './withRoot';
import Axios from 'axios';
import Select from 'react-select';
import logo from "./assest/YWCA_LOGO.png";
import ChapterCard from "./chapterCard";
import CategoryCard from "./categoryCard";
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    margin: "0 auto",
    frontSize: "62.5%"
  },
  appPaper: {
    width: "50%",
    margin: "50px auto",
    padding: 20,
    background: 'linear-gradient(to bottom, #ffcccc 0%, #ff9933 100%)',
    height: "auto",
    display: "flex",
    flexWrap: "wrap",
  },
  stateView: {
    padding: "10px"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    paddingLeft: "3%",
    paddingRight: "5%",
    marginBottom: "40px"
  },
  logo: {
    width: "20%",
    height: "auto",
    alignSelf: "flex-start",
    marginTop: "5px",
  },
  title: {
    alignSelf: "baseline",
    marginTop: "30px",
    color: "#FA4616",
    fontSize: "2rem",
    fontWeight: "bold",
    width: "60%"
  },
  bodyContainer: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
  },

  selectState: {
    marginBottom: "20px",
    width: "50%"
  },
  stateText: {
    width: "100%",
    marginBottom: "10px",
    color: "#FA4616",
  },
  textYMCA: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
  },
  selectYMCA: {
    width: "100%",
    marginBottom: "10px",
    color: "#FA4616",
  },
  CategoryCardContainer: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  selectCategory: {
    width: "100%",
    marginBottom: "10px",
    color: "#FA4616",
  },
  serviceCard: {
    height: "70px",
    marginRight: "5%",
    marginBottom: "10px",
    padding: "5px",
  },
  selectServices: {
    width: "100%",
    marginBottom: "10px",
    color: "#FA4616",
  }
});

class App extends React.Component {
  state = {
    chapterName: [],
    selected: null,
    selectedChapter: null,
    states: [],
    categories: [],
    categoriesName: [],
    isClearable: true,
    isDisable: false,
    isLoadingChapters: true,
    isLoadingCategories: true,
    isLoadingStates: true,
    isSearchable: true,
    selectedCategory: "Health and Wellness",
    availableActivities: [],
    stateDisplayed: false,
    categoriesDisplayed: false,
    servicesDisplayed: false,
    categoryService: [],
    chapterService: [],
    isLoadingServices: true,
    chapterServiceDisplay: false,

  };
  setCategoryServices = (data) => {
    console.log("hello this")
    this.setState({ categoryService: data })
  }
  setChapterServices = (data) => {
    this.setState({ chapterService: data, chapterServiceDisplay: true })
  }
  handleChange = (selected) => {
    this.setState({ selected });
    if (selected != null) {
      Axios.get("https://ywca-service-api.herokuapp.com/state/chapters", {
        headers: {
          state: selected.value
        }
      }).then(res => {
        console.log(res.data[0].Name)
        const tempHolder = [];
        res.data[0].Name.forEach(element => {
          tempHolder.push(element)
        });
        this.setState({
          ...this.state,
          chapterName: tempHolder,
          stateDisplayed: true
        })
      })
    } else {
      this.setState({ chapterName: [] })
    }
  }
  setCategory = (data) => {
    this.setState({ categories: data, categoriesDisplayed: true })
  }
  setServices = (data) => {
    this.setState({ availableActivities: data, servicesDisplayed: true })
  }
  setSelectedChapter = (selectedChapter) => {
    this.setState({ selectedChapter: selectedChapter })
  }
  setSelectedCategory=(selectCategory)=>{
    this.setState({selectCategory})
  }
  findService = () => {
    console.log("called")
    let tempHolder = []
    // if (this.state.categoryService.length > 0 && this.state.chapterService.length > 0) {
    for (let i = 0; i < this.state.categoryService.length; i++) {
      for (let z = 0; z < this.state.chapterService.length; z++) {
        if (this.state.categoryService[i] === this.state.chapterService[z]) {
          tempHolder.push(this.state.categoryService[i])
        }
      }
    }
    this.setState({ availableActivities: tempHolder, isLoadingServices: false })
    // }
    // else {
    //   setTimeout(this.findService, 200)
    // }
  }
  resetHandle = () => {
    this.setState({
      chapterName: [],
      selected: null,
      selectedChapter: null,
      categories: [],
      categoriesName: [],
      isClearable: true,
      isDisable: false,
      isLoadingChapters: true,
      isLoadingCategories: true,
      isSearchable: true,
      selectedCategory: "Health and Wellness",
      availableActivities: [],
      stateDisplayed: false,
      categoriesDisplayed: false,
      servicesDisplayed: false,
      categoryService: [],
      chapterService: [],
      isLoadingServices: true,
      chapterServiceDisplay: false,
    })
  }
  componentDidMount() {


    Axios.get('https://ywca-service-api.herokuapp.com/states')
      .then(res => {
        let tempHolder = [];
        let sorted = [];
        res.data.forEach(element => {
          sorted.push(element);
        })
        sorted.sort();
        sorted.forEach(element => {
          tempHolder.push({
            value: element, label: element
          })
        })
        this.setState({
          ...this.state,
          states: tempHolder,
          isLoadingStates: false
        })
      })
  }
  render() {
    const {
      chapterName,
      isClearable,
      isDisable,
      isLoadingStates,
      isSearchable,
      states,
      selected
    } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Paper className={classes.appPaper}>
          <div className={classes.header}>
            <img className={classes.logo} src={logo} alt="logo" />
            <Typography className={classes.title} variant="title">YWCA National Program Inventory</Typography>
          </div>
          <div className={classes.bodyContainer}>
            <Typography className={classes.stateText}
              variant='h5'>State:</Typography>
            <Select
              defaultValue={states[0]}
              className={classes.selectState}
              isDisabled={isDisable}
              isLoading={isLoadingStates}
              isClearable={isClearable}
              isSearchable={isSearchable}
              name="state"
              options={states}
              onChange={this.handleChange}
              value={selected}
              placeholder="Type to Search"
            />
          </div>
          <div className={classes.textYMCA}>{this.state.stateDisplayed && (
            <Typography className={classes.selectYMCA}
              variant='h5'>Select YWCA Local Associations:</Typography>
          )}</div>

          <Grid container spacing={24} className={classes.stateView}>
            {chapterName.map(element =>
              <Grid item xs={4}>
                <ChapterCard
                  setCategory={this.setCategory}
                  setSelectedChapter={this.setSelectedChapter}
                  class={classes.ChapterCard} element={element} />
              </Grid>
            )}
            <div className={classes.hiddenItem}></div>
          </Grid>
          {this.state.categoriesDisplayed && (
            <div>
              <Typography className={classes.selectCategory}
                variant='h5'>Select a Program:</Typography>
              <Grid container xs={24} >
                {this.state.categories.map(element =>
                  <Grid item xs={4}><CategoryCard element={element}
                    selectedChapter={this.state.selectedChapter}
                    setServices={this.setServices}
                    setCategoryServices={this.setCategoryServices}
                    setChapterServices={this.setChapterServices}
                    findService={this.findService}
                    
                  /></Grid>

                )}
              </Grid>
            </div>
          )}

            <div>
              <Typography className={classes.selectServices} variant='h5'>
                Available Services:
              </Typography>
            </div>
            <Grid container xs={24} className={classes.stateView}>
                {this.state.availableActivities.map(element =>
                  <Grid item xs={4}>
                    <Paper className={classes.serviceCard}>{element}</Paper>
                  </Grid>
                )}
            </Grid>

        </Paper>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(App));



