// Dependecies
import React, { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Card, CardBody, Badge, Container, Input } from 'reactstrap';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderOpen, faUser } from '@fortawesome/free-solid-svg-icons'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

// Shared
import Table from '../../../shared/components/Table'

const Observations = () => {
    return (
        <div style={{minHeight: '100%', width: '100%', position: 'relative'}}>
            <div className="p-3" style={{width: '300px', minHeight: '100%', position: 'absolute', backgroundColor: '#fff', borderRight: '1px solid #e6e6e6'}}>
                <Input type="text" placeholder="Search" className="mb-2" />
                <Table borderless size='sm' columns={['Subjects']}>
                    <tr>
                        <td className="d-flex">
                            <Link className="btn text-left bg-light-2 action border-0 mr-2 w-100" to={`/observations/sample`}>
                                <FontAwesomeIcon icon={faUser} /> Juan Dela Cruz
                            </Link>
                        </td>
                    </tr>
                    <tr>
                        <td className="d-flex">
                            <Link className="btn text-left bg-light-2 action border-0 mr-2 w-100" to={`/observations/sample`}>
                                <FontAwesomeIcon icon={faUser} /> Juan Dela Cruz
                            </Link>
                        </td>
                    </tr>
                    <tr>
                        <td className="d-flex">
                            <Link className="btn text-left bg-light-2 action border-0 mr-2 w-100" to={`/observations/sample`}>
                                <FontAwesomeIcon icon={faUser} /> Juan Dela Cruz
                            </Link>
                        </td>
                    </tr>
                </Table>
                <Table borderless size='sm' columns={['Subjects']}>
                    <tr>
                        <td className="d-flex">
                            <Link className="btn text-left bg-light-2 action border-0 mr-2 w-100" to={`/observations/sample`}>
                                <FontAwesomeIcon icon={faUser} /> Juan Dela Cruz
                            </Link>
                        </td>
                    </tr>
                    <tr>
                        <td className="d-flex">
                            <Link className="btn text-left bg-light-2 action border-0 mr-2 w-100" to={`/observations/sample`}>
                                <FontAwesomeIcon icon={faUser} /> Juan Dela Cruz
                            </Link>
                        </td>
                    </tr>
                    <tr>
                        <td className="d-flex">
                            <Link className="btn text-left bg-light-2 action border-0 mr-2 w-100" to={`/observations/sample`}>
                                <FontAwesomeIcon icon={faUser} /> Juan Dela Cruz
                            </Link>
                        </td>
                    </tr>
                </Table>
            </div>

            <div style={{width: 'calc(100% - 300px)', height: '100%', marginLeft: '300px'}}>
                <Container>
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
                </Container>
            </div>
        </div>
    )
}

export default Observations
