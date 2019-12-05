import React from 'react'
import { withAuthSync } from '../utils/auth';
import Layout from '../components/default_layout';
import { Container } from '@material-ui/core/';
import Newsfeed from "../components/Newsfeed.js"
import classNames from "classnames";
import Parallax from '../components/parallax/parallax.js';
import styles from '../public/jss/components.js';
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";
import background from '../public/images/journey.jpg';

const useStyles = makeStyles(styles);

const Main = props => {
  const classes = useStyles();
  return (
    <Layout title="Main" loginStatus={props.loginStatus}>
      <Parallax image={background}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1 className={classes.title}>FLINE social media</h1>
                <p className={classes.subtitle}>
                  A line connects friends and courses.
                </p>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <Container maxWidth="md" style={{ flex: 1 }}>
          <h1>Friends' Update</h1>
          <Newsfeed uid={props.token} />
        </Container>
      </div>
    </Layout>
  );
}

export default withAuthSync(Main)