import * as Yup from 'yup';

// Validation schema for signup
export const signupSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First name is required')
    .matches(/^[A-Za-z]+$/, 'First name can only contain letters'),
  lastName: Yup.string()
    .required('Last name is required')
    .matches(/^[A-Za-z]+$/, 'Last name can only contain letters'),
  nic: Yup.string()
    .required('NIC is required')
    .matches(/^\d{9}[vVxX]$|^\d{12}$/, 'NIC must be valid (e.g., 123456789V or 123456789012)'),  
  email: Yup.string().email('Invalid email address').required('Email is required'),
  stationName: Yup.string()
    .required('Station name is required')
    .matches(/^[A-Za-z\s]+$/, 'Station name can only contain letters and spaces'),
  location: Yup.string()
    .required('Location is required')
    .matches(/^[A-Za-z\s]+$/, 'Location can only contain letters and spaces'),
  petrolCapacity: Yup.number()
    .required('Petrol capacity is required')
    .positive('Petrol capacity must be a positive number')
    .integer('Petrol capacity must be an integer'),
  dieselCapacity: Yup.number()
    .required('Diesel capacity is required')
    .positive('Diesel capacity must be a positive number')
    .integer('Diesel capacity must be an integer'),
  username: Yup.string().required('Username is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[@$!%*?&#]/, 'Password must contain at least one special character'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

// Validation schema for password change
export const passwordChangeSchema = Yup.object().shape({
  currentPassword: Yup.string().required('Current password is required'),
  newPassword: Yup.string()
    .required('New password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[@$!%*?&#]/, 'Password must contain at least one special character'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm password is required'),
});