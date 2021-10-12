import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { accountService } from '@/_services';
import { AddReportModal } from './AddReportModal';
import { EditReportModal } from './EditReportModal';
import { Role } from '@/_helpers';


export class Report extends Component {

    constructor(props) {
        super(props);
        this.state = { reps: [], addModalShow: false, editModalShow: false }
    }

    refreshList() {
        fetch('http://localhost:5000/api/reportabug', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ reps: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate() {
        this.refreshList();
    }

    deleteReport(repid) {
        if (window.confirm('Are you sure?')) {
            fetch('http://localhost:5000/api/reportabug/' + repid, {
                method: 'DELETE',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        }
    }


    render() {
        const { reps, repid, repname, repbugtype, repdescription } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });

        return (
            <div className="container">
                <h1>This is the Report section!</h1>
                <p>If you have trouble using our application please let us know by submiting a report below</p>

                <ButtonToolbar>

                    <Button variant='primary'
                        onClick={() => this.setState({ addModalShow: true })}>
                        Add Report</Button>

                    <AddReportModal show={this.state.addModalShow}
                        onHide={addModalClose} />

                </ButtonToolbar>

                {accountService.userValue.role === Role.Admin &&
                    <Table className="mt-4" striped bordered hover size="sm" >
                        <thead>
                            <tr>
                                <th>Report Name</th>
                                <th>Bug Type</th>
                                <th>Description</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reps.map(rep =>
                                <tr key={rep.ReportID}>
                                    <td>{rep.ReportName}</td>
                                    <td>{rep.ReportBugType}</td>
                                    <td>{rep.ReportDescription}</td>
                                    <td>
                                        <ButtonToolbar>
                                            <Button className="mr-2" variant="info"
                                                onClick={() => this.setState({
                                                    editModalShow: true,
                                                    repid: rep.ReportID, repname: rep.ReportName, repbugtype: rep.ReportBugType,
                                                    repdescription: rep.ReportDescription
                                                })}>
                                                Edit
                                            </Button>

                                            <Button className="mr-2" variant="danger"
                                                onClick={() => this.deleteReport(rep.ReportID)}>
                                                Delete
                                            </Button>

                                            <EditReportModal show={this.state.editModalShow}
                                                onHide={editModalClose}
                                                repid={repid}
                                                repname={repname}
                                                repbugtype={repbugtype}
                                                repdescription={repdescription}
                                            />
                                        </ButtonToolbar>
                                    </td>

                                </tr>
                            )}
                        </tbody>
                    </Table>
                }

            </div>
        )
    }
}