import React, { useState, useEffect } from "react";
import { Grid, TextField, withStyles, FormControl, InputLabel, Select, MenuItem, Button, FormHelperText } from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/dCandidate";
import { useToasts } from "react-toast-notifications";

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: 200,
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 230,
    },
    smMargin: {
        margin: theme.spacing(1)
    }
})

const initialFieldValues = {
    fullname: '',
    number: '',
    email: '',
    dob: '',
    gender: ''
}

const DCandidateForm = ({ classes, ...props }) => {
    //console.log(props, "props")
    //console.log(new Date().getFullYear(), "date for editing")
    //toast msg.
    const { addToast } = useToasts()
    // const [ignored, forceupdate]  = useReducer(x => x+1, 0)

    const validate = (fieldValues = values) => {
        console.log(new Date(fieldValues.dob).getFullYear(), "values")
        let temp = { ...errors }
        temp.dob = ""
        if ('fullname' in fieldValues)

        temp.fullname = fieldValues.fullname ? "" : "This Field is required."
        if ('dob' in fieldValues) {
            if (validateAge(fieldValues.dob)) { temp.dob = "" } else { temp.dob = "This Field is required and age must be atleast 12." }
        }
        if ('gender' in fieldValues)
            temp.gender = fieldValues.gender ? "" : "This Field is required."
        if ('number' in fieldValues)
            temp.number = fieldValues.number ? "" : "Phone Number ia not valid"
        if ('email' in fieldValues)
            temp.email = (/^$|.+@.+..+/).test(fieldValues.email) ? "" : "Email ia not valid."
        setErrors({
            ...temp
        })
        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")

    }
    const validateAge = (prop) => {
        // - (new Date().getFullYear()) >= 12
        var date = new Date(prop)
        var cont = date.getFullYear()

        var curDate = new Date().getFullYear()

        var age =  curDate - cont
        console.log(age, "date func")

        if (age >= 12) {
            return true
        }
        else {
            return false
        }
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, validate, props.setCurrentId)

    //material-ui select
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const handleSubmit = e => {
        e.preventDefault()
        if (true) {
            const onSuccess = () => {
                resetForm()
                addToast("Submitted successfully", { appearance: 'success' })
                window.location.reload(true)
            }
            if (props.currentId == 0)
                props.createDCandidate(values, onSuccess)
            else
                props.updateDCandidate(props.currentId, values, onSuccess)

              
        }
        // forceupdate()
    }

    useEffect(() => {
        if (props.currentId != 0) {
            console.log(props.dCandidateList, "id")
            setValues({

                ...props.dCandidateList.find(x => x.sid == props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])

    return (
        <div>
        <h1 style={{marginLeft:"370px"}}>STUDENT FORM </h1>
        <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
            <Grid container style={{marginLeft:"250px"}}>
                <Grid item xs={6}>
                    <TextField
                        name="fullname"
                        variant="outlined"
                        label="Full Name"
                        value={values.fullname}
                        onChange={handleInputChange}
                        {...(errors.fullname && { error: true, helperText: errors.fullname })}
                    />
                    <TextField
                        name="email"
                        variant="outlined"
                        label="Email"
                        value={values.email}
                        onChange={handleInputChange}
                        {...(errors.email && { error: true, helperText: errors.email })}
                    />
                    <FormControl variant="outlined"
                        className={classes.formControl}
                        {...(errors.gender && { error: true })}
                    >
                        <InputLabel ref={inputLabel}>Gender</InputLabel>
                        <Select
                            name="gender"
                            value={values.gender}
                            onChange={handleInputChange}
                            labelWidth={labelWidth}
                        >
                            <MenuItem value="M">Male</MenuItem>
                            <MenuItem value="F">Female</MenuItem>
                        </Select>
                        {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
                    </FormControl>
                </Grid>
                <Grid item xs={6}>

                    <TextField
                        name="number"
                        variant="outlined"
                        label="PhoneNumber"
                        inputProps={{ maxLength: 10 }}
                        value={values.number}
                        onChange={handleInputChange}
                        {...(errors.number && { error: true, helperText: errors.number })}
                    />
                    <TextField
                        name="dob"
                        type="date"
                        variant="outlined"
                        value={values.dob}
                        onChange={handleInputChange}
                        {...(errors.dob && { error: true, helperText: errors.dob })}

                    />
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className={classes.smMargin}
                        >
                            Submit
                        </Button>
                        <Button
                            variant="contained"
                            className={classes.smMargin}
                            onClick={resetForm}
                        >
                            Reset
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </form>
        </div>
    );
}


const mapStateToProps = state => ({
    dCandidateList: state.dCandidate.list
})

const mapActionToProps = {
    createDCandidate: actions.create,
    updateDCandidate: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(DCandidateForm));