import React, { useState, useEffect } from 'react'
import Select from 'react-select'

const UserCreate = () => {
    const [state, setState] = useState({
        loading: true,
        subjects: []
    })

    const roles = [
        { value: 'admin', label: 'Admin' },
        { value: 'observer', label: 'Observer' },
        { value: 'facilitator', label: 'Facilitator' },
        { value: 'teacher', label: 'Teacher' }
    ]

    let subjects =[]

    let fnameInput, lnameInput, emailInput, passwordInput, rolesInput, subjectsInput, inviteInput

    const getSubjectsData = async () => {
        let url = `${process.env.REACT_APP_BACKEND_URL}/subjects`
        let response = await fetch(url)
        response = await response.json()

        response = response.data

        setState({
            loading: false,
            subjects: response
        })
    }

    const handleChangeRoles = newValue => { rolesInput = newValue }
    const handleChangeSubjects = newValue => { subjectsInput = newValue }

    const handleCreateUser = async e => {
        e.preventDefault()
        let data = {
            first_name: fnameInput.value,
            last_name: lnameInput.value,
            email: emailInput.value,
            password: passwordInput.value,
            type: []
        }

        rolesInput.map(role => {
            data.type = [ ...data.type, role.value]
        })

        console.log(data)

        const submitUser = await fetch(process.env.REACT_APP_BACKEND_URL+'/users', {
            method: 'POST',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(data)
        })
        
        const response = submitUser.json()

        console.log(response)
    }

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
        <form onSubmit={handleCreateUser}>
            <div className="form-group">
                <div className="form-row">
                    <div className="col">
                        <label>First Name</label>
                        <input type="text" className="form-control" placeholder="First name" ref={e => fnameInput = e}/>
                    </div>
                    <div className="col">
                        <label>Last Name</label>
                        <input type="text" className="form-control" placeholder="Last name" ref={e => lnameInput = e}/>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <label>Email address</label>
                <input type="email" className="form-control" placeholder="Enter email" ref={e => emailInput = e}/>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Password" ref={e => passwordInput = e}/>
            </div>
            <div className="form-group">
                <label>Roles</label>
                <Select options={roles} isMulti onChange={handleChangeRoles}/>
            </div>
            <div className="form-group">
                <label>Subjects</label>
                <Select options={subjects} isMulti onChange={handleChangeSubjects}/>
            </div>
            <div className="form-group">
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" id="inviteUser" className="custom-control-input" ref={e => inviteInput = e} />
                    <label className="custom-control-label" for="inviteUser" >Invite User</label>
                </div>
            </div>
            <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-primary">Add New User</button>
                <button className="btn btn-secondary ml-1" data-dismiss="modal" aria-label="Close">Cancel</button>
            </div>
        </form>
    )
}

export default UserCreate
