// Dependencies
import React from 'react'
import { Container, Form, FormGroup, FormFeedback, Input, Button } from 'reactstrap'

const Login = () => {
    return (
        <div>
            <Container style={{width: '450px', marginTop: 'calc(50vh - 200px)'}}>
                <h1 className="text-center">Administrator</h1>
                <Form>
                    <FormGroup>
                        <Input type="email" size="lg" placeholder="Email" />
                    </FormGroup>
                    <FormGroup>
                        <Input type="password" size="lg" placeholder="Password" />
                    </FormGroup>
                    <Button type="submit" size="lg" className="w-100 bg-main action">Login</Button>
                </Form>
            </Container>
            <p className="text-center" style={{position: "absolute", bottom: "0", width: '100%'}}>&copy;Observation App v1 2020</p>
        </div>
    )
}

export default Login
