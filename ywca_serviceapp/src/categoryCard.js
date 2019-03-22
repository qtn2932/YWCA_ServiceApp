import React from 'react';
import Paper from "@material-ui/core/Paper";
import { withStyles } from '@material-ui/core/styles';
import withRoot from './withRoot';
import Axios from "axios";
const styles = theme => ({
    stateCard: {
        height: "100px",
        padding: "10px",
        marginBottom: "10px",
        backgroundColor: "pink",
        cursor: "pointer",
        marginRight:"5%"
    },
    Icon:{
        width:"15%",
        height:"auto"
    }
})
class CategoryCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bgColor: 'white',
            chapterServices: [],
            categoryServices: [],
            iconUrl: null,
            availableServices: []
        }
    }
    handleCardSelect = () => {
        if (this.state.bgColor === 'white') {
            this.setState({ bgColor: 'pink' })
            setTimeout(() => {
                this.setState({ bgColor: 'white' })
            }, 100)
        }
        let tempHolder=[]
        for(let i=0; i<this.state.chapterServices.length; i++){
            for(let z=0; z<this.state.categoryServices.length;z++){
                if(this.state.chapterServices[i]===this.state.categoryServices[i]){
                    tempHolder.push(this.state.chapterServices[i])
                }
            }
        }
        console.log(tempHolder)
        this.props.findService()
    }
    componentDidMount(){
        Axios.get('https://ywca-service-api.herokuapp.com/chapters/services', {
            headers: {
                chapter: this.props.selectedChapter
            }
        })
            .then(res => {
                this.setState({ chapterServices: res.data[0].Service })
                console.log(this.state.chapterServices)
                this.props.setChapterServices(this.state.chapterServices)
            })
        Axios.get('https://ywca-service-api.herokuapp.com/categories/services', {
            headers: {
                category: this.props.element
            }
        })
            .then(res => {
                this.setState({ categoryServices: res.data[0] })
                console.log(this.state.categoryServices)
                this.props.setCategoryServices(this.state.categoryServices)
            })
        Axios.get('https://ywca-service-api.herokuapp.com/categories/icon',{
            headers:{
                category:this.props.element
            }
        })
            .then(res=>{
                console.log("here to my data",res.data[0][0])
                this.setState({iconUrl:res.data[0][0].url})
            })
    }
    render() {
        const { classes } = this.props;
        return (
            <Paper
                onClick={this.handleCardSelect}
                style={{ backgroundColor: this.state.bgColor }}
                className={classes.stateCard}>
                {this.props.element}
                <img src={this.state.iconUrl} className={classes.Icon} alt="icon"></img>
            </Paper>
        )
    }
}
export default withRoot(withStyles(styles)(CategoryCard));