// Dependecies
import React, { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Card, CardBody, Badge, Button } from 'reactstrap';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderOpen, faChevronLeft, faChevronRight, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

// Shared
import Table from '../../shared/components/Table'
import './Home.css';

const Home = () => {
    let history = useHistory()
    let location = useLocation()

    useEffect(() => {
        if(location.state) {
            NotificationManager.success(location.state.message);
            history.replace({ ...history.location, state: undefined });
        }
    }, [location])

    let arr = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth']

    return (
        <div>
            <div className="bg-white p-2 d-flex">
                <div className="container">
                    <Button color="success"><FontAwesomeIcon icon={faPlusCircle} /> Start Observation</Button>
                </div>
            </div>  
            <div className="Home container mt-4">
                <h3>Overall Assessments</h3>
                <CarouselProvider
                    visibleSlides={3}
                    totalSlides={6}
                    naturalSlideWidth={200}
                    naturalSlideHeight={70}
                >
                    <Slider>
                        {arr.map(a => 
                            <Slide index={a-1}>
                                <Card className="shadow-sm border-0 m-2" style={{height: '120px'}}>
                                    <CardBody className="text-center">
                                        <strong>Evidence Gathering: Lesson Observation Rubric 2 19-20 Overall</strong>
                                        <h5 className="mt-2"><Badge color="success">Outstanding</Badge></h5>
                                    </CardBody>
                                </Card>
                            </Slide>
                        )}
                    </Slider>
                    <ButtonBack className="btn btn-carousel-left"><FontAwesomeIcon icon={faChevronLeft} /></ButtonBack>
                    <ButtonNext className="btn btn-carousel-right"><FontAwesomeIcon icon={faChevronRight} /></ButtonNext>
                </CarouselProvider>
                
                <hr />
                <h3>Recent Observations</h3>
                <Table className="m-0" columns={['Teacher', 'Observer', 'Form', 'Date', 'Status', '']}>
                    <tr>
                        <td>John Smith</td>
                        <td>Juan Dela Cruz</td>
                        <td>Evidence Gathering: Lesson Observation Rubric 2 19-20</td>
                        <td>Jan. 20, 2020</td>
                        <td><Badge color="success">Finished</Badge></td>
                        <td style={{minWidth: '120px'}}>
                            <Link className="btn-sm bg-main text-light action border-0 mr-2" to={`/observations/sample`}>
                                <FontAwesomeIcon icon={faFolderOpen} /> Open
                            </Link>
                        </td>
                    </tr>
                    <tr>
                        <td>John Smith</td>
                        <td>Juan Dela Cruz</td>
                        <td>Evidence Gathering: Lesson Observation Rubric 2 19-20</td>
                        <td>Jan. 20, 2020</td>
                        <td><Badge color="success">Finished</Badge></td>
                        <td>
                            <Link className="btn-sm bg-main text-light action border-0 mr-2" to={`/observations/sample`}>
                                <FontAwesomeIcon icon={faFolderOpen} /> Open
                            </Link>
                        </td>
                    </tr>
                    <tr>
                        <td>John Smith</td>
                        <td>Juan Dela Cruz</td>
                        <td>Evidence Gathering: Lesson Observation Rubric 2 19-20</td>
                        <td>Jan. 20, 2020</td>
                        <td><Badge color="success">Finished</Badge></td>
                        <td>
                            <Link className="btn-sm bg-main text-light action border-0 mr-2" to={`/observations/sample`}>
                                <FontAwesomeIcon icon={faFolderOpen} /> Open
                            </Link>
                        </td>
                    </tr>
                    <tr>
                        <td>John Smith</td>
                        <td>Juan Dela Cruz</td>
                        <td>Evidence Gathering: Lesson Observation Rubric 2 19-20</td>
                        <td>Jan. 20, 2020</td>
                        <td><Badge color="success">Finished</Badge></td>
                        <td>
                            <Link className="btn-sm bg-main text-light action border-0 mr-2" to={`/observations/sample`}>
                                <FontAwesomeIcon icon={faFolderOpen} /> Open
                            </Link>
                        </td>
                    </tr>
                    <tr>
                        <td>John Smith</td>
                        <td>Juan Dela Cruz</td>
                        <td>Evidence Gathering: Lesson Observation Rubric 2 19-20</td>
                        <td>Jan. 20, 2020</td>
                        <td><Badge color="success">Finished</Badge></td>
                        <td>
                            <Link className="btn-sm bg-main text-light action border-0 mr-2" to={`/observations/sample`}>
                                <FontAwesomeIcon icon={faFolderOpen} /> Open
                            </Link>
                        </td>
                    </tr>
                </Table>

                <div className="text-center mt-4">
                    <Link className="btn bg-main text-light action border-0" to={`/observations/`}>
                        Load Observations
                    </Link>
                </div>

                <NotificationContainer />
            </div>
        </div>
    )
}

export default Home
