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

interface TaskFormData {
  title: string;
  description?: string;
  userId: string;
}

interface User {
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

interface Task {
  id: string;
  title: string;
  description?: string;
  userId: string;
}

const Tasks: React.FC = () => {
  const classes = UseStyles();

  const history = useHistory();

  const { search } = useLocation();
  const params = new URLSearchParams(search).get('taskId');
  const [taskEdit, setTaskEdit] = useState<Task>();
  const [employeeList, setEmployeeList] = useState<User[]>([]);

  useEffect(() => {
    api.get<User[]>(`/users`).then(response => {
      setEmployeeList(response.data);
    });

    api.get<Task>(`/tasks/${params}`).then(response => {
      const task: Task = response.data;
      setTaskEdit(response.data);

      formik.setValues({
        title: task ? task.title : '',
        description: task && task.description ? task.description : '',
        userId: task ? task.userId : '',
      });
    });
  }, []);

  const validationSchema = yup.object({
    title: yup.string().required('Title is required'),
    description: yup.string(),
    userId: yup.string().required('Employee is required'),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      userId: '',
    },
    validationSchema,
    onSubmit: async (data: TaskFormData) => {
      if (taskEdit) {
        const response = await api.put(`/tasks/${taskEdit.id}`, data);
        if (response && response.status === 200) {
          history.push('/dashboard');
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
            <h1 className={classes.titleContainer}>Edit Task</h1>
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
