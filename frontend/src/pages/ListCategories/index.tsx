/* eslint-disable import/extensions */
import {
  Container,
  Button,
  createStyles,
  IconButton,
  makeStyles,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
  Typography,
} from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';

import ConfirmationDialog from '../../components/Screen';
import api from '../../services/api';
import MyHeader from '../../components/Header';

interface Category {
  id: string;
  name: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    table: {
      marginTop: theme.spacing(3),
    },

    containerFiArrowLeft: {
      marginBottom: '20px !important',
    },
    link: {
      textDecoration: 'none',
      color: 'white',
    },
    fiArrowLeft: {
      marginTop: '5px !important',
      marginRight: '15px !important',
    },
  }),
);

const Categories: React.FC = () => {
  const classes = useStyles();
  const [rows, setRows] = useState<Category[]>([]);

  useEffect(() => {
    api.get<Category[]>('/categories').then(response => {
      setRows(response.data);
    });
  }, []);

  const [deleteOptions, setDeleteOptions] = useState<{
    show: boolean;
    itemId?: number;
    itemDescription?: string;
  }>({ show: false });

  const [messageInfo, setMessageInfo] = useState<{
    show: boolean;
    message: string;
  }>({ show: false, message: '' });

  const handleDelete = (item: any) => {
    setDeleteOptions({
      show: true,
      itemId: item.id,
      itemDescription: item.name,
    });
  };

  const handleDeleteCallBack = async (value?: string) => {
    const { itemId } = deleteOptions;
    setDeleteOptions({
      show: false,
      itemId: undefined,
      itemDescription: undefined,
    });

    if (value === 'ok') {
      await api.delete<Category[]>(`/categories/${itemId}`).then();
      setMessageInfo({ show: true, message: 'Item excluído com sucesso' });
      window.location.reload();
    }
  };

  const handleCloseMessage = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setMessageInfo({ show: false, message: '' });
  };

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

  return (
    <div>
      <MyHeader />
      <Container className={classes.containerFiArrowLeft} maxWidth="lg">
        <Link className={classes.link} to="/dashboard">
          <FiArrowLeft className={classes.fiArrowLeft} />
          Back to dashboard
        </Link>
      </Container>
      <Container maxWidth="lg">
        <div className={classes.toolbar}>
          <div>
            <Typography component="h1" variant="h4">
              Categories
            </Typography>
          </div>
          <div>
            <Link className={classes.link} to="/create-category">
              <Button
                style={{
                  ...styles.button,
                }}
                variant="contained"
                color="primary"
              >
                Create Category
              </Button>
            </Link>
          </div>
        </div>
      </Container>

      <Container maxWidth="lg">
        <TableContainer component={Paper} className={classes.table}>
          <Table aria-label="Clientes">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell width="140" align="center">
                  Ações
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.id}>
                  <TableCell className="" component="th" scope="row">
                    {row.name}
                  </TableCell>

                  <TableCell>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDelete(row)}
                    >
                      <Delete />
                    </IconButton>
                    <Link to={`/edit-category/?categoryId=${row.id}`}>
                      <IconButton aria-label="edit">
                        <Edit />
                      </IconButton>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      <ConfirmationDialog
        id={`delete-${deleteOptions.itemId}`}
        title="Excluir"
        confirmButtonText="Excluir"
        keepMounted
        open={deleteOptions.show}
        onClose={handleDeleteCallBack}
      >
        Confirma a exclusão do item{' '}
        <strong>{deleteOptions.itemDescription}</strong>
      </ConfirmationDialog>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={3000}
        open={messageInfo.show}
        message={messageInfo.message}
        key={messageInfo.message}
        onClose={handleCloseMessage}
      />
    </div>
  );
};

export default Categories;
