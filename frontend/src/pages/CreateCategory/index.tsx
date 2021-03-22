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

interface CategoryData {
  name: string;
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

const Categories: React.FC = () => {
  const classes = UseStyles();

  const history = useHistory();

  const validationSchema = yup.object({
    name: yup.string().required('name is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema,
    onSubmit: async (data: CategoryData) => {
      const response = await api.post('/categories', data);

      if (response && response.status === 200) {
        history.push('/categories');
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
            <h1 className={classes.titleContainer}>Create Category</h1>
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

export default Categories;
