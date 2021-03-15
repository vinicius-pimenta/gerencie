import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { CardActionArea, Container } from '@material-ui/core';
import { Link } from 'react-router-dom';
import imgCreateEmployee from '../../assets/sign-up-background.jpg';
import imgListOfEmployees from '../../assets/list-of-employees.jpg';
import imgBusinessManChekcbox from '../../assets/business-man-chekcbox.jpg';
import imgTask from '../../assets/task.jpg';
import MyHeader from '../../components/Header';

const useStyles = makeStyles({
  root: {
    marginTop: '60px !important',
  },
  card: {
    minWidth: 400,
  },
  media: {
    backgroundPosition: 'top',
    height: 195,
    filter: 'saturate(0%)',
  },
  content: {
    background: '#894512',
  },
  typography: {
    color: '#f4ede8',
    fontWeight: 400,
  },
  link: {
    textDecoration: 'none',
  },
  fiArrowLeft: {
    marginRight: '20px !important',
  },
  container: {
    marginTop: '20px !important',
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  containerHeader: {
    display: 'flex',
  },
});

const Dashboard: React.FC = () => {
  const classes = useStyles();

  return (
    <div>
      <MyHeader />
      <Container className={classes.container} maxWidth="md">
        <Link className={classes.link} to="/create-employee">
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia className={classes.media} image={imgCreateEmployee} />
              <CardContent className={classes.content}>
                <Typography
                  className={classes.typography}
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  Create Employee
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Link>
        <Link className={classes.link} to="/employees">
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia className={classes.media} image={imgListOfEmployees} />
              <CardContent className={classes.content}>
                <Typography
                  className={classes.typography}
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  Employees List
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Link>
      </Container>
      <Container className={classes.container} maxWidth="md">
        <Link className={classes.link} to="/create-task">
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia className={classes.media} image={imgTask} />
              <CardContent className={classes.content}>
                <Typography
                  className={classes.typography}
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  Create Task
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Link>
        <Link className={classes.link} to="/tasks">
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={imgBusinessManChekcbox}
              />
              <CardContent className={classes.content}>
                <Typography
                  className={classes.typography}
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  Tasks List
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Link>
      </Container>
    </div>
  );
};

export default Dashboard;
