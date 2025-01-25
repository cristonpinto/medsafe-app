import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Grid, 
  Typography, 
  Paper, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  FormHelperText
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import * as Yup from 'yup';

// Database Structure (MongoDB Schema)
/*
{
  patientId: String, // Unique identifier
  recordType: String, // e.g., 'Annual Check-up', 'Specialist Consultation'
  date: Date,
  healthcareFacility: String,
  healthcareProfessional: {
    name: String,
    specialty: String
  },
  medicalDetails: {
    diagnosis: String,
    treatments: [String],
    medications: [String]
  },
  vitalSigns: {
    bloodPressure: String,
    heartRate: Number,
    temperature: Number,
    weight: Number,
    height: Number
  },
  labResults: [{
    testName: String,
    result: String,
    normalRange: String,
    date: Date
  }],
  nextAppointment: {
    date: Date,
    purpose: String,
    professional: String
  },
  attachments: [String], // URLs to medical documents
  notes: String
}
*/

function MedicalRecordsForm() {
  const [record, setRecord] = useState({
    recordType: '',
    date: null,
    healthcareFacility: '',
    healthcareProfessional: {
      name: '',
      specialty: ''
    },
    medicalDetails: {
      diagnosis: '',
      treatments: '',
      medications: ''
    },
    vitalSigns: {
      bloodPressure: '',
      heartRate: '',
      temperature: '',
      weight: '',
      height: ''
    },
    labResults: [{
      testName: '',
      result: '',
      normalRange: '',
      date: null
    }],
    nextAppointment: {
      date: null,
      purpose: '',
      professional: ''
    },
    notes: ''
  });

  const [errors, setErrors] = useState({});

  // Validation Schema
  const validationSchema = Yup.object().shape({
    recordType: Yup.string().required('Record Type is required'),
    date: Yup.date().nullable().required('Date is required'),
    healthcareFacility: Yup.string().required('Healthcare Facility is required'),
    'healthcareProfessional.name': Yup.string().required('Healthcare Professional Name is required'),
    'healthcareProfessional.specialty': Yup.string(),
    'medicalDetails.diagnosis': Yup.string(),
    'vitalSigns.bloodPressure': Yup.string().matches(/^\d{2,3}\/\d{2,3}$/, 'Invalid blood pressure format (e.g., 120/80)'),
    'vitalSigns.heartRate': Yup.number().positive('Heart rate must be positive'),
    'vitalSigns.temperature': Yup.number().min(95).max(106, 'Invalid temperature'),
    'vitalSigns.weight': Yup.number().positive('Weight must be positive'),
    'vitalSigns.height': Yup.number().positive('Height must be positive')
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split('.');
    
    if (keys.length > 1) {
      setRecord(prev => ({
        ...prev,
        [keys[0]]: {
          ...prev[keys[0]],
          [keys[1]]: value
        }
      }));
    } else {
      setRecord(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Validate entire form
      await validationSchema.validate(record, { abortEarly: false });
      
      // Submit to backend
      const response = await fetch('http://localhost:5000/api/medical-records', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(record),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Medical Record saved successfully:', result);
      
      // Reset form or show success message
      setErrors({});
    } catch (err) {
      if (err.name === 'ValidationError') {
        const validationErrors = {};
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      } else {
        console.error('Error saving medical record:', err);
      }
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Paper elevation={3} style={{ padding: '20px', maxWidth: '800px', margin: '20px auto' }}>
        <Typography variant="h4" gutterBottom>
          Medical Record Entry
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Record Type */}
            <Grid item xs={12} sm={6}>
              <FormControl 
                fullWidth 
                error={!!errors.recordType}
              >
                <InputLabel>Record Type</InputLabel>
                <Select
                  name="recordType"
                  value={record.recordType}
                  onChange={handleInputChange}
                >
                  <MenuItem value="Annual Check-up">Annual Check-up</MenuItem>
                  <MenuItem value="Specialist Consultation">Specialist Consultation</MenuItem>
                  <MenuItem value="Emergency Visit">Emergency Visit</MenuItem>
                  <MenuItem value="Follow-up">Follow-up</MenuItem>
                </Select>
                {errors.recordType && <FormHelperText>{errors.recordType}</FormHelperText>}
              </FormControl>
            </Grid>

            {/* Date */}
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Date of Record"
                value={record.date}
                onChange={(date) => setRecord(prev => ({ ...prev, date }))}
                renderInput={(params) => (
                  <TextField 
                    {...params} 
                    fullWidth 
                    error={!!errors.date}
                    helperText={errors.date}
                  />
                )}
              />
            </Grid>

            {/* Healthcare Facility */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Healthcare Facility"
                name="healthcareFacility"
                value={record.healthcareFacility}
                onChange={handleInputChange}
                error={!!errors['healthcareFacility']}
                helperText={errors['healthcareFacility']}
              />
            </Grid>

            {/* Healthcare Professional Name */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Healthcare Professional Name"
                name="healthcareProfessional.name"
                value={record.healthcareProfessional.name}
                onChange={handleInputChange}
                error={!!errors['healthcareProfessional.name']}
                helperText={errors['healthcareProfessional.name']}
              />
            </Grid>

            {/* Vital Signs Section */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Vital Signs
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Blood Pressure (e.g., 120/80)"
                name="vitalSigns.bloodPressure"
                value={record.vitalSigns.bloodPressure}
                onChange={handleInputChange}
                error={!!errors['vitalSigns.bloodPressure']}
                helperText={errors['vitalSigns.bloodPressure']}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Heart Rate"
                name="vitalSigns.heartRate"
                type="number"
                value={record.vitalSigns.heartRate}
                onChange={handleInputChange}
                error={!!errors['vitalSigns.heartRate']}
                helperText={errors['vitalSigns.heartRate']}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Temperature (°F)"
                name="vitalSigns.temperature"
                type="number"
                value={record.vitalSigns.temperature}
                onChange={handleInputChange}
                error={!!errors['vitalSigns.temperature']}
                helperText={errors['vitalSigns.temperature']}
              />
            </Grid>

            {/* Additional Notes */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Additional Notes"
                name="notes"
                multiline
                rows={4}
                value={record.notes}
                onChange={handleInputChange}
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary"
              >
                Save Medical Record
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </LocalizationProvider>
  );
}

export default MedicalRecordsForm;