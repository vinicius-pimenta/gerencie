/* eslint-disable no-alert */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from 'react';

import * as yup from 'yup';

import { Grid, Button, Container, TextField, Paper } from '@material-ui/core';

import { useFormik } from 'formik';

import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
// import queryString from 'query-string';
import api from '../../services/api';

import UseStyles from './styles';
import MyHeader from '../../components/Header';

interface UserFormData {
  name: string;
  email: string;
}

interface User {
  id: string;
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

const Employees: React.FC = () => {
  const classes = UseStyles();

  const history = useHistory();

  const { search } = useLocation();
  const params = new URLSearchParams(search).get('employeeId');
  const [userEdit, setUserEdit] = useState<User>();

  useEffect(() => {
    api.get<User>(`/users/${params}`).then(response => {
      const user: User = response.data;

      setUserEdit(response.data);

      formik.setValues({
        name: user ? user.name : '',
        email: user && user.email ? user.email : '',
      });
    });
  }, []);

  const validationSchema = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email().required('Email is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
    },
    validationSchema,
    onSubmit: async (data: UserFormData) => {
      if (userEdit) {
        const response = await api.put(`/users/${userEdit.id}`, data);
        if (response && response.status === 200) {
          history.push('/employees');
        }
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
            <h1 className={classes.titleContainer}>Edit Employee</h1>
            <form noValidate onSubmit={formik.handleSubmit}>
              <TextField
                className={classes.textFieldTitle}
                id="outlined-full-width"
                required
                name="name"
                label="name"
                placeholder="name"
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
                label="email"
                placeholder="email"
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

export default Employees;
