// Dependencies
import React, {useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import {NotificationManager} from 'react-notifications';
import { FormFeedback, Button, Input } from 'reactstrap';

// Shared
import Table from '../../../shared/components/Table'
import { ReactComponent as LoadingAnimation} from '../../../shared/images/spinWhite.svg'

const QuestionForm = ({formId, questions, ratings, ratingsTable, toggle, loadQuestion}) => {
    const [loading, setLoading] = useState(false)
    const [allQuestions, setAllQuestions] = useState([...questions, 'new'])
    const [inputs, setInputs] = useState({
        titleInput: '',
        orderInput: allQuestions.length,
        typeInput: 'rubric',
        attrInputs: []
    })

    const [errors, setErrors] = useState({
        titleError: "", 
    })

    const setAttrInputs = () => {
        if(ratings) {
            let attrInputs = ratings.map(r => {
                let attr = {
                    rating_id: parseInt(r.id),
                    description: ''
                }
                return attr
            })

            setInputs({...inputs, attrInputs: attrInputs})
        }
    }

    const validate = () => {
        let titleError = ""

        if(!inputs.titleInput) {
            titleError = "Question Title must not be empty"
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

    const handleAttrChange = (index, value) => {
        let attr = inputs.attrInputs
        attr[index].description = value
        setInputs({
            ...inputs, 
            attrInputs: attr
        })
    }

    const handleCreate = async () => {
        setLoading(true)
        if(validate()) {
            let data = {
                form_id: parseInt(formId),
                title: inputs.titleInput,
                type: inputs.typeInput,
                order: inputs.orderInput
            }

            if(inputs.orderInput !== allQuestions.length) {
                let qIndex = questions.findIndex(q => q.order === parseInt(inputs.orderInput))
                let qFiltered = questions.filter((q, index) => index >= qIndex)
                
                let request = qFiltered.map(q => {
                    return {
                        id: q.id,
                        order: q.order+1
                    }
                })

                await fetch(process.env.REACT_APP_BACKEND_URL+'/questions/bulk', {
                    method: 'PUT',
                    headers: {"Content-type": "application/json"},
                    body: JSON.stringify(request)
                })
            }
    
            const createQuestion = await fetch(process.env.REACT_APP_BACKEND_URL+'/questions', {
                method: 'POST',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(data)
            })
            
            const response = await createQuestion.json()
            const resQuestion = response.message
            
            // Rubric
            if(response.success && inputs.typeInput === 'rubric') {
                let attrInput = []
                inputs.attrInputs.map(attr => {
                    attrInput.push({...attr, question_id: resQuestion.id})
                })

                const createAttribute = await fetch(process.env.REACT_APP_BACKEND_URL+'/attributes/bulk', {
                    method: 'POST',
                    headers: {"Content-type": "application/json"},
                    body: JSON.stringify(attrInput)
                })
                
                const resAttr = await createAttribute.json()

                if(resAttr.success) {
                    NotificationManager.success(`${data.title}`, 'Successfully Added Question');
                    setLoading(false)
                    setInputs([])
                    loadQuestion()
                    toggle()
                }
            }
            
            // Rating
            if(response.success && inputs.typeInput === 'rating') {
                NotificationManager.success(`${data.title}`, 'Successfully Added Question');
                setLoading(false)
                setInputs([])
                loadQuestion()
                toggle()
            }

        } else {
            setLoading(false)
        }
    }

    useEffect(() => {
        setAttrInputs()
    }, [])

    return (
        <div>
            <strong>Question</strong>
            <Input  type="text" placeholder="Title"
                    onChange={e => setInputs({...inputs, titleInput: e.target.value})} 
                    invalid={(!errors.titleError) ? false : true} />
            <FormFeedback>{errors.titleError}</FormFeedback>
            <Table class="table-bordered table-sm mt-4" columns={ratingsTable} width={`${100/ratings.length}%`}>
                {inputs.typeInput === 'rubric' &&
                    <tr>
                        {ratings.map((r, index) => 
                            <td width={`${100/ratings.length}%`}>
                                <Input  type="textarea" 
                                        size="sm"
                                        className="p-1"
                                        rows="5"
                                        onChange={e => handleAttrChange(index, e.target.value)}
                                />
                            </td>
                        )}
                    </tr>
                }
            </Table>
            <hr />
            <div className="d-flex justify-content-between">
                <div>
                    <div className="d-inline mr-2">
                        <strong className="d-inline mr-1">Order</strong>
                        <Input  className="d-inline form-control-sm" type="select" 
                                value={inputs.orderInput} style={{width: "50px"}}
                                onChange={e => setInputs({...inputs, orderInput: e.target.value})} >
                            {allQuestions.map((q, index) => 
                                <option>{index+1}</option>
                            )}
                        </Input>
                    </div>
                    <div className="d-inline">
                        <strong className="d-inline mr-1">Type</strong>
                        <Input className="d-inline form-control-sm" type="select" 
                                value={inputs.typeInput} style={{width: "100px"}}
                                onChange={e => setInputs({...inputs, typeInput: e.target.value})} >
                            <option value='rubric'>Rubric</option>
                            <option value='rating'>Rating</option>
                        </Input>
                    </div>
                </div>
                <div>
                    <Button color="secondary" className="ml-2 mt-1" onClick={toggle}>
                        Cancel
                    </Button>
                    {(loading) 
                     ?  <Button className="ml-1 mt-1" color="success" style={{width: 127.55}} disabled><LoadingAnimation style={{margin: '0 auto', height: 20, width: '100%'}} /></Button>
                     :  <Button color="success" className="ml-1 mt-1" onClick={handleCreate} ><FontAwesomeIcon icon={faPlusCircle} /> Create Question</Button>
                    }
                </div>
            </div>
        </div>
    )
}

export default QuestionForm
