import React, { useState } from 'react'
import {
    Typography,
    Box,
    Grid,
    Button,
    TextField,
    Chip,
    InputBase,
    Divider,
    MenuItem
} from '@mui/material'
import { red } from '@mui/material/colors'
import { Link } from 'react-router-dom'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import * as Yup from 'yup';
import { FormikProvider, useFormik, Form } from "formik";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate()
    const [err, setErr] = useState('')

    const handleTagChange = tags => {
        setFieldValue('tags', tags)
    }

    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        description: '',
        password: '',
        conPassword: '',
        street: '',
        town: '',
        city: '',
        country: '',
        dob: '00-00-0000',
        accountNumber: '',
        accountName: '',
        bankName: '',
        isErrand: true,
        readyToWork: true,
        banned: false,
        type: 'errand',
        balance: 0,
        rating: 0,
        images: []
    }

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('Required'),
        lastName: Yup.string().required('Required'),
        email: Yup.string()
            .email("Email must be a valid email address")
            .required("Email is required"),
        phone: Yup.string().required('required'),
        city: Yup.string().required('Required'),
        accountNumber: Yup.string().required('Required'),
        accountName: Yup.string().required('Required'),
        bankName: Yup.string().required('Required'),
        country: Yup.string().required('Required'),
        password: Yup.string().required("Password is required"),
        conPassword: Yup.string()
            .required('Password is required')
            .oneOf([Yup.ref("password"), null], "New Password and Confirm Password must match"),
    })

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values, { setSubmitting }) => {
            setSubmitting(true)
            const data = {
                ...values, address: {city: values.city, town: values.town, street: values.street, country: values.country}, isErrand: values.type === 'errand' ? true : false, readyToWork: values.type === 'errand' ? true : false
            }
            console.log(data)
            fetch(process.env.REACT_APP_API_HOST + '/auth/signup',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            })
                .then(() => {
                    console.log('then')
                    // navigate('/auth/signin', { replace: true });
                })
                .catch(error => {
                    setSubmitting(false)
                })
        }
    })
    const { errors, touched, values, isSubmitting, setSubmitting, handleChange, handleSubmit, setFieldValue, getFieldProps, resetForm, setFieldError } = formik;

    return (
        <React.Fragment>
            <Typography component="h1" variant="h5">
                Sign up
            </Typography>
            <FormikProvider value={formik} >
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} >
                            <TextField
                                name="type"
                                select
                                required size="small"
                                fullWidth
                                id="type"
                                label="Type"
                                autoFocus
                                variant="standard"
                                {...getFieldProps("type")}
                                error={Boolean(touched.type && errors.type)}
                                helperText={touched.type && errors.type}
                                defaultValue='errand'
                            >
                                {
                                    [{value: 'errand', label: 'Errand'}, {value: 'poster', label: 'Poster'}].map(({value, label})=>(
                                        <MenuItem value={value} key={value}>
                                            {label}
                                        </MenuItem>
                                    ))
                                }
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <TextField
                                name="firstName"
                                required size="small"
                                fullWidth
                                id="firstName"
                                label="First Name"
                                variant="standard"
                                {...getFieldProps("firstName")}
                                error={Boolean(touched.firstName && errors.firstName)}
                                helperText={touched.firstName && errors.firstName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <TextField
                                required size="small"
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                variant="standard"
                                {...getFieldProps("lastName")}
                                error={Boolean(touched.lastName && errors.lastName)}
                                helperText={touched.lastName && errors.lastName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required size="small"
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                variant="standard"
                                {...getFieldProps("email")}
                                error={Boolean(touched.email && errors.email)}
                                helperText={touched.email && errors.email}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required size="small"
                                fullWidth
                                id="phone"
                                label="Phone Number"
                                name="phone"
                                variant="standard"
                                {...getFieldProps("phone")}
                                error={Boolean(touched.phone && errors.phone)}
                                helperText={touched.phone && errors.phone}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required size="small"
                                fullWidth
                                label="Street"
                                name="street"
                                variant="standard"
                                {...getFieldProps("street")}
                                error={Boolean(touched.street && errors.street)}
                                helperText={touched.street && errors.street}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required size="small"
                                fullWidth
                                label="Town"
                                name="town"
                                variant="standard"
                                {...getFieldProps("town")}
                                error={Boolean(touched.town && errors.town)}
                                helperText={touched.town && errors.town}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required size="small"
                                fullWidth
                                label="City"
                                name="city"
                                variant="standard"
                                {...getFieldProps("city")}
                                error={Boolean(touched.city && errors.city)}
                                helperText={touched.city && errors.city}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required size="small"
                                fullWidth
                                label="Country"
                                name="country"
                                variant="standard"
                                {...getFieldProps("country")}
                                error={Boolean(touched.country && errors.country)}
                                helperText={touched.country && errors.country}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required size="small"
                                fullWidth
                                type='date'
                                label="DOB"
                                name="dob"
                                variant="standard"
                                {...getFieldProps("dob")}
                                error={Boolean(touched.dob && errors.dob)}
                                helperText={touched.dob && errors.dob}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required size="small"
                                fullWidth
                                label="Account Name"
                                name="accountName"
                                variant="standard"
                                {...getFieldProps("accountName")}
                                error={Boolean(touched.accountName && errors.accountName)}
                                helperText={touched.accountName && errors.accountName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required size="small"
                                fullWidth
                                label="Account Number"
                                name="accountNumber"
                                variant="standard"
                                {...getFieldProps("accountNumber")}
                                error={Boolean(touched.accountNumber && errors.accountNumber)}
                                helperText={touched.accountNumber && errors.accountNumber}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required size="small"
                                fullWidth
                                label="Bank Name"
                                name="bankName"
                                variant="standard"
                                {...getFieldProps("bankName")}
                                error={Boolean(touched.bankName && errors.bankName)}
                                helperText={touched.bankName && errors.bankName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required size="small"
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                variant="standard"
                                {...getFieldProps("password")}
                                error={Boolean(touched.password && errors.password)}
                                helperText={touched.password && errors.password}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required size="small"
                                fullWidth
                                name="conPassword"
                                label="Confirm Password"
                                type="password"
                                id="conPassword"
                                variant="standard"
                                {...getFieldProps("conPassword")}
                                error={Boolean(touched.conPassword && errors.conPassword)}
                                helperText={touched.conPassword && errors.conPassword}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required size="small"
                                multiline
                                rows={3}
                                fullWidth
                                id="description"
                                label="Description"
                                name="description"
                                variant="standard"
                                {...getFieldProps("description")}
                                error={Boolean(touched.description && errors.description)}
                                helperText={touched.description && errors.description}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {isSubmitting ? 'Loading...' : 'Sign Up'}
                    </Button>
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid item>
                            <Link to="/auth/signin" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </FormikProvider>
        </React.Fragment>
    )
}
export default SignUp