// Dependencies
import React, { useEffect, useState, useContext} from 'react'
import { Form, FormGroup, FormFeedback, Input, Label, Button} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'

// Local
import AppContext from '../../../AppContext'

const StartObservation = ({ subjectTeacher }) => {
    // Global State
    const [globalState, setGlobalState] = useContext(AppContext)

    // Local State
    const [formState, setFormState] = useState([])
    const [teacherState, setTeacherState] = useState([])
    const [subjectState, setSubjectState] = useState([])
    const [gradeState, setGradeState] = useState([])
    const [inputs, setInputs] = useState({
        form: 0,
        teacher: 0,
        subject: 0,
        grade: 0,
    })

    const [errors, setErrors] = useState({
        formError: "",
        teacherError: "",
        subjectError: "",
        gradeError: "",
    })

    const getFormsData = async () => {
        let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/forms`, {
            headers: {'Authorization': 'Bearer '.concat(sessionStorage.getItem('token'))}
        })
        response = await response.json()
        response = response.data
        setFormState(response)
    }

    const getSubjecteachersData = () => {
        let subjects = []
        let teachers = []

        subjectTeacher.map(subject => {
            // Set Subjects
            subjects.push({
                id: subject.id,
                name: subject.name
            })

            // Set Teachers
            subject.users.map(user => {
                if(teachers.findIndex(t => t.id === user.id)) {
                    teachers = teachers.slice(teachers.findIndex(t => t.id === user.id)+1)
                }

                teachers.push({
                    id: user.id,
                    name: `${user.first_name} ${user.last_name}`
                })
            })
        })

        setSubjectState(subjects)
        setTeacherState(teachers)
    }

    const getGradesData = async () => {
        let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/grades`, {
            headers: {'Authorization': 'Bearer '.concat(sessionStorage.getItem('token'))}
        })
        response = await response.json()
        response = response.data
        setGradeState(response)
    }

    const validate = () => {
        let formError = ""
        let teacherError = ""
        let subjectError = ""
        let gradeError = ""

        if(inputs.form === 0) {
            formError = "Form must be selected"
        }
        
        if(inputs.teacher === 0) {
            teacherError = "Teacher must be selected"
        }

        if(inputs.subject === 0) {
            subjectError = "Subject must be selected"
        }

        if(inputs.grade === 0) {
            gradeError = "Grade must be selected"
        }

        if(formError || teacherError || subjectError || gradeError) {
            setErrors({
                formError: formError,
                teacherError: teacherError,
                subjectError: subjectError,
                gradeError: gradeError
            })
            return false
        } else {
            return true
        }
    }

    const handleStart = e => {
        e.preventDefault()
        if(validate()) {
            console.log('shoot')
        }
    }

    useEffect(() => {
        getFormsData()
        getSubjecteachersData()
        getGradesData()
    }, [])

    console.log(inputs)
    console.log(errors)

    return (
        <div>
            <Form onSubmit={handleStart}>
                <FormGroup>
                    <Label for="form">Form</Label>
                    <Input  id="form" type="select" invalid={(!errors.formError) ? false : true}
                            onChange={e => setInputs({...inputs, form: e.target.value})} >
                        <option disabled selected hidden>Select Form or Framework</option>
                        {formState &&
                            formState.map(form => <option value={form.id}>{form.title}</option>)
                        }
                    </Input>
                    <FormFeedback>{errors.formError}</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label for="teacher">Teacher</Label>
                    <Input  id="teacher" type="select" invalid={(!errors.teacherError) ? false : true}
                            onChange={e => setInputs({...inputs, teacher: e.target.value})}>
                        <option disabled selected hidden>Select Teacher to Observe</option>
                        {teacherState &&
                            teacherState.map(teacher => <option value={teacher.id}>{`${teacher.name}`}</option>)
                        }
                    </Input>
                    <FormFeedback>{errors.teacherError}</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label for="subject">Subject</Label>
                    <Input  id="subject" type="select" invalid={(!errors.subjectError) ? false : true}
                            onChange={e => setInputs({...inputs, subject: e.target.value})}>
                        <option disabled selected hidden>Select Subject</option>
                        {subjectState &&
                            subjectState.map(subject => <option value={subject.id}>{subject.name}</option>)
                        }
                    </Input>
                    <FormFeedback>{errors.subjectError}</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label for="grade">Grade</Label>
                    <Input  id="grade" type="select" invalid={(!errors.gradeError) ? false : true}
                            onChange={e => setInputs({...inputs, grade: e.target.value})}>
                        <option disabled selected hidden>Select Grade</option>
                            {gradeState &&
                                gradeState.map(grade => <option value={grade.id}>{grade.name}</option>)
                            }
                    </Input>
                    <FormFeedback>{errors.gradeError}</FormFeedback>
                </FormGroup>
                <Button color="success" type="submit">
                    <FontAwesomeIcon icon={faPlayCircle} /> Start Observation
                </Button>
            </Form>
        </div>
    )
}

export default StartObservation
