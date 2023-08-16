import React, {useState, useEffect} from 'react'
import {Link, useHistory, useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService'

const AddEmployeeComponent = () => {

    const [employee_id, setEmployee_id] = useState('')
    const [password, setPassword] = useState('')
    const [isAdmin, setIsAdmin] = useState('')
    const history = useHistory();
    const {id} = useParams();

    const saveOrUpdateEmployee = (e) => {
        e.preventDefault();

        const employee = {employee_id,password,isAdmin}

        if(id){
            EmployeeService.updateEmployee(id, employee).then((response) => {
                history.push('/users')
            }).catch(error => {
                console.log(error)
            })

        }else{
            EmployeeService.createEmployee(employee).then((response) =>{

                console.log(response.data)
    
                history.push('/users');
    
            }).catch(error => {
                console.log(error)
            })
        }
        
    }

    useEffect(() => {

        EmployeeService.getEmployeeById(id).then((response) =>{
            setPassword(response.data.password)
            setIsAdmin(response.data.isAdmin)
            setEmployee_id(response.data.id)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    const title = () => {

        if(id){
            return <h2 className = "text-center">Update Employee</h2>
        }else{
            return <h2 className = "text-center">Add Employee</h2>
        }
    }

    return (
        <div>
           <br /><br />
           <div className = "container">
                <div className = "row">
                    <div className = "card col-md-6 offset-md-3 offset-md-3">
                       {
                           title()
                       }
                        <div className = "card-body">
                            <form>
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Password :</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter your password"
                                        name = "password"
                                        className = "form-control"
                                        value = {password}
                                        onChange = {(e) => setPassword(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Are you an Admin :</label>
                                    <input
                                        type = "text"
                                        placeholder = "T or F"
                                        name = "isAdmin"
                                        className = "form-control"
                                        value = {isAdmin}
                                        onChange = {(e) => setIsAdmin(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <button className = "btn btn-success" onClick = {(e) => saveOrUpdateEmployee(e)} >Submit </button>
                                <Link to="/users" className="btn btn-danger" 
                                style = {{marginLeft:"10px"}}> Cancel </Link>
                            </form>

                        </div>
                    </div>
                </div>
           </div>
        </div>
    )
}

export default AddEmployeeComponent
