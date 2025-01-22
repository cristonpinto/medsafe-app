import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Grid, 
  Typography, 
  Paper, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Chip,
  IconButton
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';

function PrescriptionForm() {
  const [prescription, setPrescription] = useState({
    illnessName: '',
    doctorName: '',
    doctorSpecialty: '',
    startDate: null,
    drugs: [{ name: '', dosage: '', times: [], beforeAfterFood: 'after' }]
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPrescription({ ...prescription, [name]: value });
  };

  const handleDateChange = (date) => {
    setPrescription({ ...prescription, startDate: date });
  };

  const handleDrugChange = (index, e) => {
    const { name, value } = e.target;
    const updatedDrugs = [...prescription.drugs];
    updatedDrugs[index] = { ...updatedDrugs[index], [name]: value };
    setPrescription({ ...prescription, drugs: updatedDrugs });
  };

  const handleTimesChange = (index, event) => {
    const { value } = event.target;
    const updatedDrugs = [...prescription.drugs];
    updatedDrugs[index] = { ...updatedDrugs[index], times: value };
    setPrescription({ ...prescription, drugs: updatedDrugs });
  };

  const addDrug = () => {
    setPrescription({
      ...prescription,
      drugs: [...prescription.drugs, { name: '', dosage: '', times: [], beforeAfterFood: 'after' }]
    });
  };

  const removeDrug = (index) => {
    const updatedDrugs = prescription.drugs.filter((_, i) => i !== index);
    setPrescription({ ...prescription, drugs: updatedDrugs });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(prescription);
    // Here you would typically send the data to your backend
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Paper elevation={3} style={{ padding: '20px', maxWidth: '800px', margin: '20px auto' }}>
        <Typography variant="h4" gutterBottom>
          New Prescription
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Illness Name"
                name="illnessName"
                value={prescription.illnessName}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Doctor's Name"
                name="doctorName"
                value={prescription.doctorName}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Doctor's Specialty"
                name="doctorSpecialty"
                value={prescription.doctorSpecialty}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <DatePicker
                label="Start Date"
                value={prescription.startDate}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} fullWidth required />}
              />
            </Grid>
            
            {prescription.drugs.map((drug, index) => (
              <Grid item xs={12} key={index}>
                <Paper elevation={2} style={{ padding: '10px', marginBottom: '10px' }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="h6">Drug {index + 1}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Drug Name"
                        name="name"
                        value={drug.name}
                        onChange={(e) => handleDrugChange(index, e)}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Dosage"
                        name="dosage"
                        value={drug.dosage}
                        onChange={(e) => handleDrugChange(index, e)}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel>Consumption Times</InputLabel>
                        <Select
                          multiple
                          value={drug.times}
                          onChange={(e) => handleTimesChange(index, e)}
                          renderValue={(selected) => (
                            <div>
                              {selected.map((value) => (
                                <Chip key={value} label={value} style={{ margin: 2 }} />
                              ))}
                            </div>
                          )}
                        >
                          <MenuItem value="morning">Morning</MenuItem>
                          <MenuItem value="afternoon">Afternoon</MenuItem>
                          <MenuItem value="evening">Evening</MenuItem>
                          <MenuItem value="night">Night</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel>Consume</InputLabel>
                        <Select
                          value={drug.beforeAfterFood}
                          name="beforeAfterFood"
                          onChange={(e) => handleDrugChange(index, e)}
                        >
                          <MenuItem value="before">Before Food</MenuItem>
                          <MenuItem value="after">After Food</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <IconButton onClick={() => removeDrug(index)} color="secondary">
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            ))}
            
            <Grid item xs={12}>
              <Button startIcon={<AddIcon />} onClick={addDrug}>
                Add Another Drug
              </Button>
            </Grid>
            
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Save Prescription
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </LocalizationProvider>
  );
}

export default PrescriptionForm;