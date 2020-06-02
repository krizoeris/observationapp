// Dependencies
import React, { useState, useEffect, useContext} from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Container, Form, FormGroup, FormFeedback, Input, Button } from 'reactstrap'
import { NotificationContainer, NotificationManager } from 'react-notifications';

// Local 
import AppContext from '../../AppContext';

const Login = () => {
    // Global State
    const [globalState, setGlobalState] = useContext(AppContext);

    // Local State
    const [loading, setLoading] = useState(false)
    const [inputs, setInputs] = useState({
        emailInput: '',
        passwordInput: ''
    })

    const [errors, setErrors] = useState({
        emailError: '', 
        passwordError: ''
    })

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
    
            if(json.success && json.user.type.includes('admin')) {
                sessionStorage.setItem('token', json.token);
                sessionStorage.setItem('userAccess', JSON.stringify(json.user));
                sessionStorage.setItem('isAdmin', true);

                setGlobalState({
                    ...globalState,
                    user: json.user
                })

                history.push("/admin/", { message: 'Successfully Logged In!' })
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
            <Container style={{width: '450px', marginTop: 'calc(50vh - 200px)'}}>
                <h1 className="text-center">Administrator</h1>
                <Form onSubmit={loginUser}>
                    <FormGroup>
                        <Input type="email" size="lg" placeholder="Email" invalid={(!errors.emailError) ? false : true} onChange={e => setInputs({...inputs, emailInput: e.target.value})}  />
                        <FormFeedback>{errors.emailError}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Input type="password" size="lg" placeholder="Password" invalid={(!errors.passwordError) ? false : true} onChange={e => setInputs({...inputs, passwordInput: e.target.value})} />
                        <FormFeedback>{errors.passwordError}</FormFeedback>
                    </FormGroup>
                    <Button type="submit" size="lg" className="w-100 bg-main action">Login</Button>
                </Form>
            </Container>
            <p className="text-center" style={{position: "absolute", bottom: "0", width: '100%'}}>&copy;2020 Observation App v1</p>
            <NotificationContainer />
        </div>
    )
}

export default Login
