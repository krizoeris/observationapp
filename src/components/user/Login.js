import React from 'react'
import { 
    Container, Form, FormGroup, FormFeedback, Input, Button, Label,
    Card, CardBody, CardTitle, CardImg, Row, Col
} from 'reactstrap'

const Login = () => {
    return (
        <div>
            <Container style={{marginTop: 'calc(50vh - 220px)'}}>
                <Row>
                    <Col className="pr-md-2 mb-sm-2" md="5" sm="12">
                        <Card className="shadow-sm border-0 p-md-3">
                            <CardBody>
                                <CardTitle><h3>Login</h3></CardTitle>
                                <Form>
                                    <FormGroup>
                                        <Label for="email">Email</Label>
                                        <Input type="email" id="email" placeholder="Email" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="password">Password</Label>
                                        <Input type="password" id="password" placeholder="Password" />
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
        </div>
    )
}

export default Login
