import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  Alert,
  Fab,
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { formApi } from '@/services/api';
import type { ApiForm } from '@/types/api';

interface FormListViewProps {
  onCreateNew: () => void;
  onEditForm: (form: ApiForm) => void;
}

export const FormListView: React.FC<FormListViewProps> = ({
  onCreateNew,
  onEditForm,
}) => {
  const [forms, setForms] = useState<ApiForm[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    loadForms();
  }, []);

  const loadForms = async () => {
    try {
      setLoading(true);
      setError(null);
      const formsData = await formApi.fetchForms();
      setForms(Array.isArray(formsData) ? formsData : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load forms');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteForm = async (formId: string) => {
    if (!window.confirm('Are you sure you want to delete this form?')) {
      return;
    }

    try {
      setDeletingId(formId);
      await formApi.deleteForm(formId);
      setForms(forms.filter(form => form.id !== formId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete form');
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h4" component="h1">
          My Forms
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={onCreateNew}
          size="large"
        >
          Create New Form
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {!forms || forms.length === 0 ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '400px',
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No forms created yet
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Get started by creating your first form
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={onCreateNew}
            size="large"
          >
            Create Your First Form
          </Button>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
            gap: 3,
          }}
        >
          {(forms || []).map(form => (
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 4,
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="h2" gutterBottom>
                  {form.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {form.elements.length} element
                  {form.elements.length !== 1 ? 's' : ''}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Created: {formatDate(form.createdAt)}
                </Typography>
                {form.updatedAt !== form.createdAt && (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    display="block"
                  >
                    Updated: {formatDate(form.updatedAt)}
                  </Typography>
                )}
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
                <Button
                  startIcon={<Edit />}
                  onClick={() => onEditForm(form)}
                  variant="contained"
                  size="small"
                >
                  Edit
                </Button>
                <Button
                  startIcon={<Delete />}
                  onClick={() => handleDeleteForm(form.id)}
                  variant="outlined"
                  color="error"
                  size="small"
                  disabled={deletingId === form.id}
                >
                  {deletingId === form.id ? 'Deleting...' : 'Delete'}
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      )}

      <Fab
        color="primary"
        aria-label="add"
        onClick={onCreateNew}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
        }}
      >
        <Add />
      </Fab>
    </Box>
  );
};
