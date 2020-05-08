// Dependencies
import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import {NotificationManager} from 'react-notifications';
import Select from 'react-select'
import {
    Button, Form, FormGroup, Label, 
    Input, FormFeedback, Col, Row 
} from 'reactstrap';

// Shared
import { ReactComponent as LoadingAnimation} from '../../../shared/images/spinWhite.svg'

const compareArrays = (sideA, sideB) => {
    let count = 0
    sideA.map(a => {
        if(sideB.includes(a)) {
            count = count + 1
        }
    })

    if(count === sideA.length && sideA.length === sideB.length) {
        return true
    } else {
        return false
    }
}

const SubjectForm = ({loadSubjects, toggle, action, id}) => {
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState({
        observers: [],
        teachers: [],
        facilitators: []
    })
    const [inputs, setInputs] = useState({
        nameInput: '', 
        descInput: '', 
        observersInput: [], 
        teachersInput: [], 
        facilitatorsInput: [],
        oldUsers: {
            observers: [], 
            teachers: [], 
            facilitators: [],
            all: []
        }
    })
    const [errors, setErrors] = useState({
        nameError: "", 
    })
    const [state, setState] = useState({
        btnLabel: (action === 'add') ? 'Create Subject' : 'Save',
        btnIcon: (action === 'add') ? faPlusCircle : faSave
    })

    const getUsersData = async () => {
        let url = `${process.env.REACT_APP_BACKEND_URL}/users`
        let response = await fetch(url)
        response = await response.json()
        response = response.data

        let observers = []
        let teachers = []
        let facilitators = []

        response.map(data => {
            if(data.type.includes('observer')) {
                observers.push({
                    value: data.id,
                    label: `${data.first_name} ${data.last_name}`
                })
            }

            if(data.type.includes('teacher')) {
                teachers.push({
                    value: data.id,
                    label: `${data.first_name} ${data.last_name}`
                })
            }

            if(data.type.includes('facilitator')) {
                facilitators.push({
                    value: data.id,
                    label: `${data.first_name} ${data.last_name}`
                })
            }
        })

        setUsers({
            observers: observers,
            teachers: teachers,
            facilitators: facilitators
        })
    }

    const getSubjectsData = async () => {
        let url = `${process.env.REACT_APP_BACKEND_URL}/subjects/${id}`
        let response = await fetch(url)
        response = await response.json()
        response = response.data

        let data = {
            id: response.id,
            nameInput: response.name,
            descInput: response.description, 
            observersInput: [], 
            teachersInput: [], 
            facilitatorsInput: [],
            oldUsers: {
                observers: [], 
                teachers: [], 
                facilitators: [],
                all: []
            }
        }

        response.users.map(u => {
            if(u.subject_users.user_type.includes('observer')) {
                let user = users.observers[users.observers.findIndex(user => user.value === u.id)]
                data.observersInput.push(user)
                data.oldUsers.observers.push({id: u.id, subjectUserId: u.subject_users.id})
            }

            if(u.subject_users.user_type.includes('teacher')) {
                let user = users.teachers[users.teachers.findIndex(user => user.value === u.id)]
                data.teachersInput.push(user)
                data.oldUsers.teachers.push({id: u.id, subjectUserId: u.subject_users.id})
            }

            if(u.subject_users.user_type.includes('facilitator')) {
                let user = users.facilitators[users.facilitators.findIndex(user => user.value === u.id)]
                data.facilitatorsInput.push(user)
                data.oldUsers.facilitators.push({id: u.id, subjectUserId: u.subject_users.id})
            }
            data.oldUsers.all.push({id: u.subject_users.id, user_id: u.id, type: u.subject_users.user_type})
        })
        
        setInputs(data)
    }

    const postSubjectData = async () => {
        setLoading(true)
        if(validate()) {
            let data = {
                name: inputs.nameInput,
                description: inputs.descInput,
            }
    
            const createSubject = await fetch(process.env.REACT_APP_BACKEND_URL+'/subjects', {
                method: 'POST',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(data)
            })
            
            const response = await createSubject.json()
            const subjectId = response.message.id
    
            if(subjectId) {
                let suInputs = []
    
                inputs.observersInput.map(user => {
                    suInputs.push({
                        id: user.value,
                        type: ['observer']
                    })
                })
                inputs.teachersInput.map(user => {
                    suInputs.push({
                        id: user.value,
                        type: ['teacher']
                    })
                })
                inputs.facilitatorsInput.map(user => {
                    suInputs.push({
                        id: user.value,
                        type: ['facilitator']
                    })
                })
        
                let userId = []
                let subjectUsers = []
        
                suInputs.map(su => {
                    if(userId.includes(su.id)) {
                        let suId = subjectUsers[userId.indexOf(su.id)]
                        suId.user_type = [...suId.user_type, ...su.type]
                    } else {
                        userId.push(su.id)
                        subjectUsers.push({
                            user_id: su.id,
                            subject_id: subjectId,
                            user_type: su.type
                        })
                    }
                })
    
                await fetch(process.env.REACT_APP_BACKEND_URL+'/subject-users', {
                    method: 'POST',
                    headers: {"Content-type": "application/json"},
                    body: JSON.stringify(subjectUsers)
                })
            }
            
            if(response.success) {
                NotificationManager.success(`${data.name}`, 'Successfully Added Subject');
                setLoading(false)
                setInputs([])
                loadSubjects()
                toggle()
           }
        } else {
            setLoading(false)
        }
    }

    const updateSubjectUserData = async (data) => {
        let suInputs = [] // Raw Combined Users Output
        let userId = [] // user ID collection
        let suInputsCombined = [] // Combined Users Output
        let oldSuCombined = inputs.oldUsers.all // Old Combined users

        // actions
        let deleteUsers = {id: []}
        let updateUsers = []
        let addUsers = []

        // Raw Combine User
        if(inputs.observersInput) {
            inputs.observersInput.map(user => {
                suInputs.push({
                    id: user.value,
                    type: ['observer']
                })
            })
        }
        if(inputs.teachersInput) {
            inputs.teachersInput.map(user => {
                suInputs.push({
                    id: user.value,
                    type: ['teacher']
                })
            })
        }
        if(inputs.facilitatorsInput) {
            inputs.facilitatorsInput.map(user => {
                suInputs.push({
                    id: user.value,
                    type: ['facilitator']
                })
            })
        }
        // Combine User
        suInputs.map(su => {
            if(userId.includes(su.id)) {
                let suId = suInputsCombined[userId.indexOf(su.id)]
                suId.user_type = [...suId.user_type, ...su.type]
            } else {
                userId.push(su.id)
                suInputsCombined.push({
                    user_id: su.id,
                    user_type: su.type
                })
            }
        })

        //Delete SubjectUser Format
        oldSuCombined.map(os => {
            if(!userId.includes(os.user_id)) {
                deleteUsers.id.push(os.id)
            }
        })

        // Allocate actions
        suInputsCombined.map(su => {
            let oldSu = oldSuCombined[oldSuCombined.findIndex(os => os.user_id === su.user_id)]
            // Update SubjectUser Format
            if(oldSu && !compareArrays(su.user_type, oldSu.type)) {
                updateUsers.push({
                    id: oldSu.id,
                    user_type: (oldSu.type.length > su.user_type.length) ? oldSu.type.filter(os => su.user_type.includes(os)) : su.user_type
                })
            }
            // Add SubjectUser Format
            if(!oldSu) {
                addUsers.push({
                    user_id: su.user_id,
                    subject_id: data.id,
                    user_type: su.user_type
                })
            }
        })
        
        // REQUEST BACKEND
        if(addUsers.length > 0) {
            await fetch(process.env.REACT_APP_BACKEND_URL+'/subject-users', {
                method: 'POST',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(addUsers)
            })
        }
        if(updateUsers.length > 0) {
            await fetch(process.env.REACT_APP_BACKEND_URL+'/subject-users', {
                method: 'PUT',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(updateUsers)
            })
        }
        //console.log(updateUsers)
        if(deleteUsers.id.length > 0) {
            await fetch(process.env.REACT_APP_BACKEND_URL+'/subject-users', {
                method: 'DELETE',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(deleteUsers)
            })
        }

        loadSubjects()
    }

    const updateSubjectData = async () => {
        setLoading(true)
        if(validate()) {
            let data = {
                id: inputs.id,
                name: inputs.nameInput,
                description: inputs.descInput,
            }
    
            const updateSubject = await fetch(process.env.REACT_APP_BACKEND_URL+'/subjects', {
                method: 'PUT',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(data)
            })
            
            const response = await updateSubject.json()

            // UPDATE SUBJECT-USER
            updateSubjectUserData(data)

            if(response.success) {
                NotificationManager.success(`${data.name}`, 'Updated Successfully');
                setLoading(false)
                setInputs([])
                loadSubjects()
                toggle()
           }
        } else {
            setLoading(false)
        }
    }

    const validate = () => {
        let nameError = ""

        if(!inputs.nameInput) {
            nameError = "Subject Name must not be empty"
        }

        if(nameError ) {
            setErrors({
                nameError: nameError,
            })
            return false
        } else {
            return true
        }
    }

    const handleSubmit = e => {
        e.preventDefault()

        if(action === 'add') {
            postSubjectData()
        } else if(action === 'edit') {
            updateSubjectData()
        }
    }

    useEffect(()=>{
        getUsersData()
    }, [])

    useEffect(() => {
        if(id !== 0) { getSubjectsData() }
    }, [users])
    
    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Name</Label>
                    <Input  type="text" placeholder="Name" value={inputs.nameInput}
                            onChange={e => setInputs({...inputs, nameInput: e.target.value})} 
                            invalid={(!errors.nameError) ? false : true} />
                    <FormFeedback>{errors.nameError}</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label>Description</Label>
                    <Input  type="text" placeholder="Description" value={inputs.descInput}
                            onChange={e => setInputs({...inputs, descInput: e.target.value})} />
                </FormGroup>
                <FormGroup>
                    <Label>Observers</Label>
                    <Select value={inputs.observersInput} options={users.observers} 
                            isMulti onChange={e => setInputs({ ...inputs, observersInput: e })} />
                </FormGroup>
                <FormGroup>
                    <Label>Teachers</Label>
                    <Select value={inputs.teachersInput} options={users.teachers} 
                            isMulti onChange={e => setInputs({ ...inputs, teachersInput: e })} />
                </FormGroup>
                <FormGroup>
                    <Label>Facilitators</Label>
                    <Select value={inputs.facilitatorsInput} options={users.facilitators} 
                            isMulti onChange={e => setInputs({ ...inputs, facilitatorsInput: e })} />
                </FormGroup>
                <div className="d-flex justify-content-between mt-2">
                    {(loading) 
                        ? <Button type="submit" color="success" style={{width: 127.55}} disabled><LoadingAnimation style={{margin: '0 auto', height: 20, width: '100%'}} /></Button>
                        : <Button type="submit" color="success"><FontAwesomeIcon icon={state.btnIcon} /> {state.btnLabel}</Button>
                    }
                    <Button onClick={() => toggle()} color="secondary">Cancel</Button>
                </div>
            </Form>
        </div>
    )
}

export default SubjectForm
