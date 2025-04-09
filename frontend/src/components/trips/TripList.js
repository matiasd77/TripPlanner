import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  IconButton,
  Fab,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { tripsAPI } from '../../services/api';
import useApi from '../../hooks/useApi';
import { useAlert } from '../../contexts/AlertContext';

const TripList = () => {
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();
  const { executeApiCall } = useApi();
  const { showSuccess } = useAlert();

  useEffect(() => {
    loadTrips();
  }, []);

  const loadTrips = async () => {
    try {
      const response = await executeApiCall(async () => {
        return await tripsAPI.getAllTrips();
      });
      setTrips(response.data);
    } catch (error) {
      // Error is handled by useApi hook
    }
  };

  const handleDelete = async (tripId) => {
    if (window.confirm('Are you sure you want to delete this trip?')) {
      try {
        await executeApiCall(async () => {
          await tripsAPI.deleteTrip(tripId);
          setTrips(trips.filter(trip => trip.id !== tripId));
          showSuccess('Trip deleted successfully');
        });
      } catch (error) {
        // Error is handled by useApi hook
      }
    }
  };

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" component="h1">
            My Trips
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => navigate('/trips/new')}
          >
            Create New Trip
          </Button>
        </Box>


        <Grid container spacing={3}>
          {trips.length === 0 ? (
            <Grid item xs={12}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                minHeight="200px"
                bgcolor="background.paper"
                borderRadius={1}
                p={3}
              >
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No trips found
                </Typography>
                <Typography color="text.secondary" mb={2}>
                  Start planning your next adventure!
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={() => navigate('/trips/new')}
                >
                  Create Your First Trip
                </Button>
              </Box>
            </Grid>
          ) : (
            trips.map((trip) => (
              <Grid item xs={12} sm={6} md={4} key={trip.id}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    '&:hover': {
                      boxShadow: 6,
                    }
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      height: 140,
                      bgcolor: 'grey.300',
                    }}
                    image={trip.imageUrl || 'https://source.unsplash.com/random?travel'}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {trip.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {trip.description}
                    </Typography>
                  </CardContent>
                  <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Button 
                      size="small" 
                      onClick={() => navigate(`/trips/${trip.id}`)}
                    >
                      View Details
                    </Button>
                    <Box>
                      <IconButton
                        size="small"
                        onClick={() => navigate(`/trips/${trip.id}/edit`)}
                        sx={{ mr: 1 }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDelete(trip.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Box>

      {/* Mobile FAB for creating new trip */}
      <Box sx={{ display: { sm: 'none' } }}>
        <Fab
          color="primary"
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
          onClick={() => navigate('/trips/new')}
        >
          <AddIcon />
        </Fab>
      </Box>
    </Container>
  );
};

export default TripList;
