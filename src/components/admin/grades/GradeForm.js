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

const GradeForm = ({loadGrades, toggle, action, id}) => {
    const [loading, setLoading] = useState(false)
    const [inputs, setInputs] = useState({
        nameInput: ''
    })

    const [errors, setErrors] = useState({
        nameError: "", 
    })

    const [state, setState] = useState({
        btnLabel: (action === 'add') ? 'Create Grade' : 'Save',
        btnIcon: (action === 'add') ? faPlusCircle : faSave
    })

    const getGradesData = async () => {
        let url = `${process.env.REACT_APP_BACKEND_URL}/grades/${id}`
        let response = await fetch(url)
        response = await response.json()
        response = response.data

        let data = {
            id: response.id,
            nameInput: response.name,
        }
        
        setInputs(data)
    }

    const postGradeData = async () => {
        setLoading(true)
        if(validate()) {
            let data = {
                name: inputs.nameInput,
            }
    
            const createGrade = await fetch(process.env.REACT_APP_BACKEND_URL+'/grades', {
                method: 'POST',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(data)
            })
            
            const response = await createGrade.json()
            
            if(response.success) {
                NotificationManager.success(`${data.name}`, 'Successfully Added Grade');
                setLoading(false)
                setInputs([])
                loadGrades()
                toggle()
           }
        } else {
            setLoading(false)
        }
    }

    const updateGradeData = async () => {
        setLoading(true)
        if(validate()) {
            let data = {
                id: inputs.id,
                name: inputs.nameInput,
            }
    
            const updateGrade = await fetch(process.env.REACT_APP_BACKEND_URL+'/grades', {
                method: 'PUT',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(data)
            })
            
            const response = await updateGrade.json()

            if(response.success) {
                NotificationManager.success(`${data.name}`, 'Updated Successfully');
                setLoading(false)
                setInputs([])
                loadGrades()
                toggle()
           }
        } else {
            setLoading(false)
        }
    }

    const validate = () => {
        let nameError = ""

        if(!inputs.nameInput) {
            nameError = "Grade Name must not be empty"
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
            postGradeData()
        } else if(action === 'edit') {
            updateGradeData()
        }
    }

    useEffect(()=>{
        if(id !== 0) { getGradesData() }
    }, [])

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

export default GradeForm
