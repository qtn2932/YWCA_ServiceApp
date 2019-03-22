import React from 'react';
import Paper from "@material-ui/core/Paper";
import { withStyles } from '@material-ui/core/styles';
import withRoot from './withRoot';
import Axios from "axios";
import Grid from '@material-ui/core/Grid';
const styles = theme => ({
    stateCard: {
        padding: "10px",
        marginBottom: "10px",
        cursor: "pointer",
    },
})
class ChapterCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bgColor: 'white'
        }
    }
    handleCardSelect = () => {
        this.props.setSelectedChapter(this.props.element)

        Axios.get('https://ywca-service-api.herokuapp.com/chapters/categories', {
            headers: {
                chapter: this.props.element
            }
        })
            .then(res => {
                this.props.setCategory(res.data[0].Categories)
            })

    }
    render() {
        const { classes } = this.props;
        return (
                <div
                onClick={this.handleCardSelect}
                className={classes.stateCard}>{this.props.element}</div>


        )
    }
}
export default withRoot(withStyles(styles)(ChapterCard));