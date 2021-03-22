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

interface TaskFormData {
  title: string;
  description?: string;
  categoryId: string;
  date: Date;
  userId: string;
}

interface User {
  id: string;
  name: string;
}

interface Category {
  id: string;
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

const Tasks: React.FC = () => {
  const classes = UseStyles();

  const history = useHistory();

  const [employeeList, setEmployeeList] = useState<User[]>([]);
  const [categoryList, setCategoryList] = useState<User[]>([]);

  useEffect(() => {
    api.get<User[]>('/users').then(response => {
      setEmployeeList(response.data);
    });

    api.get<Category[]>('/categories').then(response => {
      setCategoryList(response.data);
    });
  }, []);

  const validationSchema = yup.object({
    title: yup.string().required('Title is required'),
    description: yup.string(),
    categoryId: yup.string().required('Category is required'),
    userId: yup.string().required('Employee is required'),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      date: new Date(),
      categoryId: '',
      userId: '',
    },
    validationSchema,
    onSubmit: async (data: TaskFormData) => {
      console.log(data);
      const response = await api.post('/tasks', data);

      if (response && response.status === 200) {
        history.push('/tasks');
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
            <h1 className={classes.titleContainer}>Create Task</h1>
            <form noValidate onSubmit={formik.handleSubmit}>
              <TextField
                className={classes.textFieldTitle}
                id="outlined-full-width"
                required
                name="title"
                label="Title"
                placeholder="Enter the title"
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
              <TextField
                className={classes.textFieldDescription}
                id="outlined-full-width"
                multiline
                name="description"
                label="Description"
                placeholder="Enter the description"
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                value={formik.values.description}
                onChange={formik.handleChange}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />
              <TextField
                className={classes.textFieldDate}
                id="date"
                label="Delivery Date"
                type="date"
                style={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                value={formik.values.date}
                onChange={formik.handleChange}
                error={formik.touched.date && Boolean(formik.errors.date)}
                helperText={formik.touched.date && formik.errors.date}
              />
              <TextField
                className={classes.textFieldCategoryId}
                id="outlined-select-category"
                select
                required
                name="categoryId"
                label="Category"
                placeholder="Select the category"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                SelectProps={{
                  native: true,
                }}
                value={formik.values.categoryId}
                onChange={formik.handleChange}
                error={
                  formik.touched.categoryId && Boolean(formik.errors.categoryId)
                }
                helperText={
                  formik.touched.categoryId && formik.errors.categoryId
                }
              >
                <option hidden disabled value="">
                  Choose one option
                </option>
                {categoryList.map(option => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </TextField>
              <TextField
                className={classes.textFieldUserId}
                id="outlined-select-employee"
                select
                required
                name="userId"
                label="Employee"
                placeholder="Select the employee"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                SelectProps={{
                  native: true,
                }}
                value={formik.values.userId}
                onChange={formik.handleChange}
                error={formik.touched.userId && Boolean(formik.errors.userId)}
                helperText={formik.touched.userId && formik.errors.userId}
              >
                <option hidden disabled value="">
                  Choose one option
                </option>
                {employeeList.map(option => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </TextField>

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
