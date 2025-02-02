import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DeleteIcon from '@mui/icons-material/Delete';
import { getUsers, destroyUser } from '../services/UserService';
import { ResponseUserDTO } from '../models/User';
import { useUser } from '../components/UserProvider';

function ListUsers() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.admin) {
      navigate('/');
    }
  }, [user, navigate]);

  const { data: users = [], error, isLoading } = useQuery<ResponseUserDTO[]>('users', getUsers);

  const deleteUserMutation = useMutation((userId: string) => destroyUser(user!.id.toString(), userId), {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
    },
  });

  const handleDeleteUser = (userId: string) => {
    if (user?.id.toString() !== userId && user?.admin) {
      deleteUserMutation.mutate(userId);
    }
  };

  if (isLoading) {
    return <div>{t('loading')}</div>;
  }

  if (error) {
    return <div>{t('errorloadingusers')}</div>;
  }

  return (
    <Box sx={{ padding: 2, backgroundColor: (theme) => theme.palette.background.default, minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom>
        {t('tableuserlist')}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('tableusername')}</TableCell>
              <TableCell>{t('tabledeleteoperation')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((users2) => (
              <TableRow key={users2.id}>
                <TableCell>{users2.username}</TableCell>
                <TableCell>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteUser(users2.id.toString())}
                    title={t('tabledeleteoperation')}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ListUsers;
