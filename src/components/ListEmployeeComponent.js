import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import EmployeeService from '../services/EmployeeService'
import '../styleSheets/ListEmployeeComponent.css'

const ListEmployeeComponent = () => {

    const [employees, setEmployees] = useState([])

    useEffect(() => {
        getAllEmployees();
    }, [])

    const getAllEmployees = () => {
        EmployeeService.getAllEmployees().then((response) => {
            setEmployees(response.data)
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    const deleteEmployee = (employee_id) => {
        EmployeeService.deleteEmployee(employee_id).then((response) => {
            getAllEmployees();

        }).catch(error => {
            console.log(error);
        })

    }

    return (
        <div class="container-lg">
            <div class="table-responsive">
                <div class="table-wrapper">
                    <div class="table-title">
                        <div class="row">
                            <div class="col-sm-8"><h2>Employee <b>Details</b></h2></div>
                            <div class="col-sm-4">
                                <Link to="/add_employee" className="btn" >
                                    <button type="button" class="btn btn-info add-new">
                                        <i class="fa fa-plus"></i> Add New</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th> Employee Id </th>
                                <th> Password </th>
                                <th> Is Admin </th>
                                <th> Actions </th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                employees.map(
                                    employee =>
                                        <tr key={employee.id}>
                                            <td> {employee.employee_id} </td>
                                            <td> {employee.password} </td>
                                            <td>{employee.isAdmin}</td>
                                            <td>
                                                <Link className="inlineLink" to={`/edit_employee/${employee.employee_id}`} ><i class="material-icons">&#xE254;</i></Link>
                                                <button className="inlineButton" onClick={() => deleteEmployee(employee.employee_id)}
                                                ><i class="material-icons">&#xE872;</i> </button>
                                            </td>
                                        </tr>
                                )
                            }
                            </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}

export default ListEmployeeComponent
