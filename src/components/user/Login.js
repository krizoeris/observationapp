// Dependencies
import React, { useState, useEffect, useContext} from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { 
    Container, Form, FormGroup, FormFeedback, Input, Button, Label,
    Card, CardBody, CardTitle, CardImg, Row, Col
} from 'reactstrap'

// Local 
import AppContext from '../../AppContext';

const Login = () => {
    const [loading, setLoading] = useState(false)
    const [inputs, setInputs] = useState({
        emailInput: '',
        passwordInput: ''
    })

    const [errors, setErrors] = useState({
        emailError: '', 
        passwordError: ''
    })

    const [globalState, setGlobalState] = useContext(AppContext);

    let history = useHistory()
    let location = useLocation()

    const validate = () => {
        let emailError = ""
        let passwordError = ""

        if(!inputs.emailInput) {
            emailError = "Email must not be empty"
        }

        if(!inputs.passwordInput) {
            passwordError = "Password must not be empty"
        }

        if(emailError || passwordError) {
            setErrors({
                ...errors,
                emailError: emailError,
                passwordError: passwordError,
            })
            return false
        } else {
            return true
        }
    }

    const loginUser = async (e) => {
        e.preventDefault()
        
        if(validate()) {
            let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
                method: 'POST',
                body: JSON.stringify(
                    {
                        email: inputs.emailInput,
                        password: inputs.passwordInput,
                    }
                ),
                headers: {
                    "Content-Type": "application/json"
                }
            });
    
            let json = await response.json();
    
            if(json.success && !json.user.type.includes('admin')) {
                sessionStorage.setItem('token', json.token);
                sessionStorage.setItem('userAccess', JSON.stringify(json.user));
                sessionStorage.setItem('isUser', true);
                history.push("/", { message: 'Successfully Logged In!' })
            } else {
                NotificationManager.error('Invalid User Login!');
                setErrors({
                    emailError: '',
                    passwordError: ''
                })
            }
            
        }
    }

    useEffect(() => {
        console.log(location)
        if(location.state) {
            NotificationManager.success(location.state.message);
            history.replace({ ...history.location, state: undefined });
        }
    }, [location])

    return (
        <div>
            <Container style={{marginTop: 'calc(50vh - 245px)'}}>
                <Row>
                    <Col className="pr-md-2 mb-sm-2" md="5" sm="12">
                        <Card className="shadow-sm border-0 p-md-3">
                            <CardBody>
                                <CardTitle><h3>Login</h3></CardTitle>
                                <Form onSubmit={loginUser}>
                                    <FormGroup>
                                        <Label for="email">Email</Label>
                                        <Input type="email" id="email" placeholder="Email" invalid={(!errors.emailError) ? false : true} onChange={e => setInputs({...inputs, emailInput: e.target.value})}  />
                                        <FormFeedback>{errors.emailError}</FormFeedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="password">Password</Label>
                                        <Input type="password" id="password" placeholder="Password" invalid={(!errors.passwordError) ? false : true} onChange={e => setInputs({...inputs, passwordInput: e.target.value})} />
                                        <FormFeedback>{errors.passwordError}</FormFeedback>
                                    </FormGroup>
                                    <FormGroup className="custom-control custom-checkbox" check>
                                        <Input  type="checkbox" id="inviteUser" className="custom-control-input" />
                                        <Label for="inviteUser" className="custom-control-label" check>Keep me logged in</Label>
                                    </FormGroup>
                                    <Row className="mt-2">
                                        <Col className="pr-1"><Button type="submit" size="sm" className="action bg-main w-100">Login</Button></Col>
                                        <Col className="pl-1"><Button color="light" size="sm" className="action w-100">Forgot Password</Button></Col>
                                    </Row>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                
                    <Col className="pl-md-2">
                        <Card className="shadow-sm border-0">
                            <CardImg height="352px" width="100%" src="https://stmarysmuhaisnah.com/wp-content/uploads/2019/02/school-front.jpg" alt="SMM" />
                        </Card>
                    </Col>
                </Row>
            </Container>
            <p className="text-center" style={{position: "absolute", bottom: "0", width: '100%'}}>&copy;Observation App v1 2020</p>
            <NotificationContainer />
        </div>
    )
}

export default Login
