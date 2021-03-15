/* eslint-disable no-alert */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from 'react';

import * as yup from 'yup';

import { Grid, Button, Container, TextField, Paper } from '@material-ui/core';

import { useFormik } from 'formik';

import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

import UseStyles from './styles';
import MyHeader from '../../components/Header';

interface EmployeeTaskData {
  name: string;
  email: string;
}

const styles = {
  button: {
    background: '#894512',
    borderRadius: 3,
    border: 0,
    color: '#f4ede8',
    height: 48,
    padding: '0 30px',
  },
};

const Tasks: React.FC = () => {
  const classes = UseStyles();

  const history = useHistory();

  const validationSchema = yup.object({
    name: yup.string().required('name is required'),
    email: yup.string().email().required('email is required'),
    password: yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (data: EmployeeTaskData) => {
      const response = await api.post('/users', data);

      if (response && response.status === 200) {
        history.push('/employees');
      }
    },
  });

  return (
    <div>
      <MyHeader />
      <Container className={classes.containerFiArrowLeft} maxWidth="md">
        <Link className={classes.link} to="/dashboard">
          <FiArrowLeft className={classes.fiArrowLeft} />
          Back to dashboard
        </Link>
      </Container>
      <Container maxWidth="md">
        <Paper className={classes.paper} elevation={3}>
          <Grid className={classes.gridCreateTask} item>
            <h1 className={classes.titleContainer}>Create Employee</h1>
            <form noValidate onSubmit={formik.handleSubmit}>
              <TextField
                className={classes.textFieldTitle}
                id="outlined-full-width"
                required
                name="name"
                label="Name"
                placeholder="Enter the name"
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <TextField
                className={classes.textFieldDescription}
                id="outlined-full-width"
                multiline
                name="email"
                label="E-mail"
                placeholder="Enter the e-mail"
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                className={classes.textFieldDescription}
                id="outlined-full-width"
                multiline
                name="password"
                label="Password"
                placeholder="Enter the password"
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />

              <Button
                style={{
                  ...styles.button,
                }}
                className={classes.button}
                variant="contained"
                fullWidth
                type="submit"
                disabled={formik.isSubmitting}
              >
                Save
              </Button>
            </form>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
};

export default Tasks;
