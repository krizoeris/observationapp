// Dependencies
import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import {
    Button, Form, FormGroup, Label, 
    Input, FormFeedback, Col, Row 
} from 'reactstrap';

// Shared
import { ReactComponent as LoadingAnimation} from '../../../shared/images/loadingButton.svg'

const UserCreate = ({loadUser, toggle, action}) => {
    const [loading, setLoading] = useState(false)
    const [subjects, setSubjects] = useState([])
    const [inputs, setInputs] = useState({
        fnameInput: '', 
        lnameInput: '', 
        emailInput: '', 
        passwordInput: '', 
        inviteInput: '',
        rolesInput: [],
        subjectsInput: [],
    })
    const [errors, setErrors] = useState({
        fnameError: "", 
        lnameError: "", 
        emailError: "", 
        passwordError: "", 
        rolesError: "", 
        subjectsError: ""
    })
    const roles = [
        { value: 'admin', label: 'Admin' },
        { value: 'observer', label: 'Observer' },
        { value: 'facilitator', label: 'Facilitator' },
        { value: 'teacher', label: 'Teacher' }
    ]

    const validate = () => {
        let fnameError, lnameError, emailError, passwordError, rolesError, subjectsError = ""

        if(!inputs.fnameInput) {
            fnameError = "First Name must not be empty"
        }
        
        if(!inputs.lnameInput) {
            lnameError = "Last Name must not be empty"
        }
        
        if(!inputs.emailInput) {
            emailError = "Email must not be empty"
        }
        
        if(!inputs.passwordInput) {
            passwordError = "Please enter password"
        } else if(inputs.passwordInput.length <= 8) {
            passwordError = "Password must be 8 characters"
        }
        
        if(!inputs.rolesInput || inputs.rolesInput.length <= 0) {
            rolesError = "Roles must contain one row"
        }
        
        if(!inputs.subjectsInput || inputs.subjectsInput.length <= 0) {
            subjectsError = "Subjects must contain one subject"
        }

        if(fnameError || lnameError || emailError || passwordError || rolesError || subjectsError ) {
            setErrors({
                fnameError: fnameError,
                lnameError: lnameError,
                emailError: emailError,
                passwordError: passwordError,
                rolesError: rolesError,
                subjectsError: subjectsError
            })
            return false
        } else {
            return true
        }
    }

    const getSubjectsData = async () => {
        let url = `${process.env.REACT_APP_BACKEND_URL}/subjects`
        let response = await fetch(url)
        response = await response.json()
        response = response.data

        let subjects = []

        response.map(data => {
            subjects.push({
                value: data.id,
                label: data.name
            })
        })

        setSubjects(subjects)
    }

    const postUserData = async () => {
        setLoading(true)
        if(validate()) {

            let data = {
                first_name: inputs.fnameInput,
                last_name: inputs.lnameInput,
                email: inputs.emailInput,
                password: inputs.passwordInput,
                type: []
            }
    
            inputs.rolesInput.map(role => {
                data.type = [...data.type, role.value]
            })

            const createUser = await fetch(process.env.REACT_APP_BACKEND_URL+'/users', {
                method: 'POST',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(data)
            })
            
            const response = await createUser.json()
            const userId = response.data.id
            const userType = response.data.type
    
            if(userId && inputs.subjectsInput.length > 0) {
                let subjects = []
    
                inputs.subjectsInput.map(subject => {
                    subjects.push({
                        user_id: userId,
                        subject_id: subject.value,
                        user_type: userType
                    })
                })
    
                await fetch(process.env.REACT_APP_BACKEND_URL+'/subject-users', {
                    method: 'POST',
                    headers: {"Content-type": "application/json"},
                    body: JSON.stringify(subjects)
                })
            }

           if(response.success) {
                loadUser()
                toggle()
                setLoading(false)
           }
        }
    }

    const handleSubmit = e => {
        e.preventDefault()

        if(action === 'add') {
            postUserData()
        }
    }

    const selectStyleInValid = { control: styles => ({...styles, borderColor: 'red'}) }

    useEffect(()=>{
        getSubjectsData()
    }, [subjects])

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Row form>
                    <Col md={6}>
                        <FormGroup>
                            <Label>First name</Label>
                            <Input  type="text" placeholder="First name" 
                                    onChange={e => setInputs({...inputs, fnameInput: e.target.value})} 
                                    invalid={(!errors.fnameError) ? false : true} />
                            <FormFeedback>{errors.fnameError}</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label>Last name</Label>
                            <Input  type="text" placeholder="Last name" 
                                    onChange={e => setInputs({...inputs, lnameInput: e.target.value})} 
                                    invalid={(!errors.lnameError) ? false : true} />
                            <FormFeedback>{errors.lnameError}</FormFeedback>
                        </FormGroup>
                    </Col>
                </Row>
                <FormGroup>
                    <Label>Email address</Label>
                    <Input  type="email" placeholder="Email" 
                            onChange={e => setInputs({...inputs, emailInput: e.target.value})} 
                            invalid={(!errors.emailError) ? false : true} />
                    <FormFeedback>{errors.emailError}</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label>Password</Label>
                    <Input  type="password" placeholder="password" 
                            onChange={e => setInputs({...inputs, passwordInput: e.target.value})} 
                            invalid={(!errors.passwordError) ? false : true} />
                    <FormFeedback>{errors.passwordError}</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label>Roles</Label>
                    <Select value={inputs.rolesInput} options={roles} 
                            styles={errors.rolesError && selectStyleInValid} 
                            isMulti onChange={e => setInputs({ ...inputs, rolesInput: e })} />
                    <small className="text-danger">{errors.rolesError}</small>
                </FormGroup>
                <FormGroup>
                    <Label>Subjects</Label>
                    <Select value={inputs.subjectsInput} options={subjects} 
                            styles={errors.subjectsError && selectStyleInValid} 
                            isMulti onChange={e => setInputs({ ...inputs, subjectsInput: e })} />
                    <small className="text-danger">{errors.subjectsError}</small>
                </FormGroup>
                <FormGroup className="custom-control custom-checkbox" check>
                    <Input  type="checkbox" id="inviteUser" className="custom-control-input" 
                            onChange={e => setInputs({...inputs, inviteInput: e.target.value})} />
                    <Label for="inviteUser" className="custom-control-label" check>Invite User</Label>
                </FormGroup>
                <div className="d-flex justify-content-between mt-2">
                    {(loading) 
                        ? <Button type="submit" color="primary" style={{width: 127.55}} disabled><LoadingAnimation style={{margin: '0 auto', height: 20, width: '100%'}} /></Button>
                        : <Button type="submit" color="primary">Add New User</Button>
                    }
                    <Button onClick={toggle} color="secondary">Cancel</Button>
                </div>
            </Form>
        </div>
    )
    
}

export default UserCreate
