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

const FormsForm = ({loadForms, toggle, action, id}) => {
    const [loading, setLoading] = useState(false)
    const [inputs, setInputs] = useState({
        titleInput: '',
        descInput: ''
    })

    const [errors, setErrors] = useState({
        titleError: "", 
    })

    const [state, setState] = useState({
        btnLabel: (action === 'add') ? 'Create Title' : 'Save',
        btnIcon: (action === 'add') ? faPlusCircle : faSave
    })

    const getFormsData = async () => {
        let url = `${process.env.REACT_APP_BACKEND_URL}/forms/${id}`
        let response = await fetch(url)
        response = await response.json()
        response = response.data

        let data = {
            id: response.id,
            titleInput: response.title,
            descInput: response.description,
        }
        
        setInputs(data)
    }

    const postFormData = async () => {
        setLoading(true)
        if(validate()) {
            let data = {
                title: inputs.titleInput,
                description: inputs.descInput,
            }
    
            const createForm = await fetch(process.env.REACT_APP_BACKEND_URL+'/forms', {
                method: 'POST',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(data)
            })
            
            const response = await createForm.json()
            
            if(response.success) {
                NotificationManager.success(`${data.title}`, 'Successfully Added Form');
                setLoading(false)
                setInputs([])
                loadForms()
                toggle()
           }
        } else {
            setLoading(false)
        }
    }

    const updateFormData = async () => {
        setLoading(true)
        if(validate()) {
            let data = {
                id: id,
                title: inputs.titleInput,
                description: inputs.descInput,
            }
    
            const updateForm = await fetch(process.env.REACT_APP_BACKEND_URL+'/forms', {
                method: 'PUT',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(data)
            })
            
            const response = await updateForm.json()

            if(response.success) {
                NotificationManager.success(`${data.title}`, 'Updated Successfully');
                setLoading(false)
                setInputs([])
                loadForms()
                toggle()
           }
        } else {
            setLoading(false)
        }
    }

    const validate = () => {
        let titleError = ""

        if(!inputs.titleInput) {
            titleError = "Form Title must not be empty"
        }

        if(titleError ) {
            setErrors({
                titleError: titleError,
            })
            return false
        } else {
            return true
        }
    }

    const handleSubmit = e => {
        e.preventDefault()

        if(action === 'add') {
            postFormData()
        } else if(action === 'edit') {
            updateFormData()
        }
    }

    useEffect(()=>{
        if(id !== 0) { getFormsData() }
    }, [])

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Title</Label>
                    <Input  type="text" placeholder="Title" value={inputs.titleInput}
                            onChange={e => setInputs({...inputs, titleInput: e.target.value})} 
                            invalid={(!errors.titleError) ? false : true} />
                    <FormFeedback>{errors.titleError}</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label>Description</Label>
                    <Input  type="text" placeholder="Description" value={inputs.descInput}
                            onChange={e => setInputs({...inputs, descInput: e.target.value})} />
                    <FormFeedback>{errors.descError}</FormFeedback>
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

export default FormsForm
