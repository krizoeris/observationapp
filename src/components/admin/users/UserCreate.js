// Dependencies
import React, { useState, useEffect } from 'react'
import Select from 'react-select'

// Shared
import { ReactComponent as LoadingAnimation} from '../../../shared/images/loadingButton.svg'

const UserCreate = ({loadUser}) => {
    const [state, setState] = useState({
        loading: true,
        success: false,
        subjects: [],
        rolesInput: [],
        subjectsInput: [],
        error: {
            fnameError: "", 
            lnameError: "", 
            emailError: "", 
            passwordError: "", 
            rolesError: "", 
            subjectsError: ""
        }
    })

    const roles = [
        { value: 'admin', label: 'Admin' },
        { value: 'observer', label: 'Observer' },
        { value: 'facilitator', label: 'Facilitator' },
        { value: 'teacher', label: 'Teacher' }
    ]

    let subjects =[]

    let fnameInput, lnameInput, emailInput, passwordInput, inviteInput
    let rolesInput = state.rolesInput
    let subjectsInput = state.subjectsInput

    const getSubjectsData = async () => {
        let url = `${process.env.REACT_APP_BACKEND_URL}/subjects`
        let response = await fetch(url)
        response = await response.json()

        response = response.data

        setState({
            ...state,
            loading: false,
            subjects: response
        })
    }

    const validate = () => {
        let fnameError, lnameError, emailError, passwordError, rolesError, subjectsError = ""

        if(!fnameInput.value) {
            fnameError = "First Name must not be empty"
        }
        
        if(!lnameInput.value) {
            lnameError = "Last Name must not be empty"
        }
        
        if(!emailInput.value) {
            emailError = "Email must not be empty"
        }
        
        if(!passwordInput.value) {
            passwordError = "Please enter password"
        } else if(passwordInput.value.length <= 8) {
            passwordError = "Password must be 8 characters"
        }
        
        if(!rolesInput || rolesInput.length <= 0) {
            rolesError = "Roles must contain one row"
        }
        
        if(!subjectsInput || subjectsInput.length <= 0) {
            subjectsError = "Subjects must contain one subject"
        }

        if(fnameError || lnameError || emailError || passwordError || rolesError || subjectsError ) {
            setState({
                ...state,
                error: {
                    fnameError: fnameError,
                    lnameError: lnameError,
                    emailError: emailError,
                    passwordError: passwordError,
                    rolesError: rolesError,
                    subjectsError: subjectsError
                }
            })
            return false
        } else {
            return true
        }
    }

    const handleChangeRoles = newValue => { setState({ ...state, rolesInput: newValue })}
    const handleChangeSubjects = newValue => { setState({ ...state, subjectsInput: newValue })}

    const handleCreateUser = async e => {
        e.preventDefault()
        setState({...state, loading: true})
        if(validate()) {
            let data = {
                first_name: fnameInput.value,
                last_name: lnameInput.value,
                email: emailInput.value,
                password: passwordInput.value,
                type: []
            }
    
            rolesInput.map(role => {
                data.type = [...data.type, role.value]
            })
    
            //console.log(data)
            //console.log(subjects)
    
            const submitUser = await fetch(process.env.REACT_APP_BACKEND_URL+'/users', {
                method: 'POST',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(data)
            })
            
            const response = await submitUser.json()
            const userId = response.data.id
            const userType = response.data.type
    
            if(userId && subjectsInput.length > 0) {
                
                let subjects = []
    
                subjectsInput.map(subject => {
                    subjects.push({
                        user_id: userId,
                        subject_id: subject.value,
                        user_type: userType
                    })
                })
    
                const submitUserSubject = await fetch(process.env.REACT_APP_BACKEND_URL+'/subject-users', {
                    method: 'POST',
                    headers: {"Content-type": "application/json"},
                    body: JSON.stringify(subjects)
                })
                
                const responseSubjectUser = await submitUserSubject.json()
            }

           if(response.success) {
                loadUser()
                setState({
                    ...state,
                    success: true,
                    loading: false,
                    error: {
                        fnameError: '',
                        lnameError: '',
                        emailError: '',
                        passwordError: '',
                        rolesError: '',
                        subjectsError: ''
                    },
                    rolesInput: [],
                    subjectsInput: []
                })

                return true
           }
        }
    }

    const handleClear = () => {

        setState({
            ...state,
            success: false
        })
        
        fnameInput = ''
        lnameInput = '' 
        emailInput = '' 
        passwordInput = ''
        inviteInput = ''
    }

    const selectStyleInValid = { control: styles => ({...styles, borderColor: 'red'}) }

    if(subjects.length === 0) {
        state.subjects.map(data => {
            subjects.push({
                value: data.id,
                label: data.name
            })
        })
    }

    useEffect(()=>{
        getSubjectsData()
    }, [])

    
    return (
        <div>
            {(state.success) ?
                <div className="text-center">
                    <h4 className="text-success mb-4">Successfully Added!</h4>
                    <button className="btn btn-danger" data-dismiss="modal" aria-label="Close" onClick={handleClear}>Done</button>
                </div>
            :
                <form onSubmit={handleCreateUser}>
                    <div className="form-group">
                        <div className="form-row">
                            <div className="col">
                                <label>First Name</label>
                                <input type="text" className={(!state.error.fnameError) ? `form-control` : `form-control border border-danger`} placeholder="First name" ref={e => fnameInput = e}/>
                                <small className="text-danger bold">{state.error.fnameError}</small>
                            </div>
                            <div className="col">
                                <label>Last Name</label>
                                <input type="text" className={(!state.error.lnameError) ? `form-control` : `form-control border border-danger`} placeholder="Last name" ref={e => lnameInput = e}/>
                                <small className="text-danger bold">{state.error.lnameError}</small>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className={(!state.error.emailError) ? `form-control` : `form-control border border-danger`} placeholder="Enter email" ref={e => emailInput = e}/>
                        <small className="text-danger bold">{state.error.emailError}</small>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className={(!state.error.passwordError) ? `form-control` : `form-control border border-danger`} placeholder="Password" ref={e => passwordInput = e}/>
                        <small className="text-danger bold">{state.error.passwordError}</small>
                    </div>
                    <div className="form-group">
                        <label>Roles</label>
                        <Select value={state.rolesInput} options={roles} styles={state.error.rolesError && selectStyleInValid} isMulti onChange={handleChangeRoles} />
                        <small className="text-danger bold">{state.error.rolesError}</small>
                    </div>
                    <div className="form-group">
                        <label>Subjects</label>
                        <Select value={state.subjectsInput} options={subjects} styles={state.error.subjectsError && selectStyleInValid} isMulti onChange={handleChangeSubjects} />
                        <small className="text-danger bold">{state.error.subjectsError}</small>
                    </div>
                    <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" id="inviteUser" className="custom-control-input" ref={e => inviteInput = e} />
                            <label className="custom-control-label" for="inviteUser" >Invite User</label>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        {(state.loading) 
                            ? <button type="submit" className="btn btn-primary" style={{width: 127.55}} disabled><LoadingAnimation style={{margin: '0 auto', height: 20, width: '100%'}} /></button>
                            : <button type="submit" className="btn btn-primary">Add New User</button>
                        }
                        <button className="btn btn-secondary ml-1" data-dismiss="modal" aria-label="Close">Cancel</button>
                    </div>
                </form>
            }
        </div>
    )
    
}

export default UserCreate
