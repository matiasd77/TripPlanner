import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
} from '@mui/material';
import useApi from '../../hooks/useApi';
import { useAlert } from '../../contexts/AlertContext';
import { tripsAPI } from '../../services/api';

const TripForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: null,
    endDate: null,
    destination: '',
    budget: '',
    imageUrl: '',
  });

  const { executeApiCall } = useApi();
  const { showSuccess } = useAlert();

  const fetchTripData = useCallback(async () => {
    const response = await executeApiCall(async () => {
      return await tripsAPI.getTrip(id);
    });
    const trip = response.data;
    setFormData({
      ...trip,
      startDate: new Date(trip.startDate),
      endDate: new Date(trip.endDate),
    });
  }, [executeApiCall, id, setFormData]);

  useEffect(() => {
    if (isEditing) {
      fetchTripData();
    }
  }, [id, isEditing, fetchTripData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      // Special handling for date fields
      if (name === 'startDate' || name === 'endDate') {
        return {
          ...prev,
          [name]: new Date(value),
          // Reset end date if start date is after it
          ...(name === 'startDate' && prev.endDate && new Date(value) > new Date(prev.endDate) 
            ? { endDate: new Date(value) }
            : {})
        };
      }
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    try {
      await executeApiCall(async () => {
        const tripData = {
          ...formData,
          budget: Number(formData.budget),
        };

        if (isEditing) {
          await tripsAPI.updateTrip(id, tripData);
          showSuccess('Trip updated successfully');
        } else {
          await tripsAPI.createTrip(tripData);
          showSuccess('Trip created successfully');
        }
        navigate('/trips');
      });
    } catch (error) {
      // Error is handled by useApi hook
    }
  }, [executeApiCall, formData, id, isEditing, navigate, showSuccess]);

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {isEditing ? 'Edit Trip' : 'Create New Trip'}
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="name"
                label="Trip Name"
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                multiline
                rows={4}
                name="description"
                label="Description"
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="date"
                name="startDate"
                label="Start Date"
                value={formData.startDate ? new Date(formData.startDate).toISOString().split('T')[0] : ''}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="date"
                name="endDate"
                label="End Date"
                value={formData.endDate ? new Date(formData.endDate).toISOString().split('T')[0] : ''}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                inputProps={{ min: formData.startDate ? new Date(formData.startDate).toISOString().split('T')[0] : '' }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="destination"
                label="Destination"
                value={formData.destination}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                name="budget"
                label="Budget"
                type="number"
                value={formData.budget}
                onChange={handleChange}
                InputProps={{
                  startAdornment: '€',
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                name="imageUrl"
                label="Image URL"
                value={formData.imageUrl}
                onChange={handleChange}
                helperText="Enter a URL for the trip's cover image"
              />
            </Grid>

            <Grid item xs={12} sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button
                variant="outlined"
                onClick={() => navigate('/trips')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
              >
                {isEditing ? 'Save Changes' : 'Create Trip'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default TripForm;
