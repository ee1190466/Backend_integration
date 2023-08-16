import axios from 'axios'

const EMPLOYEE_BASE_REST_API_URL = 'http://localhost:8001/users';

class EmployeeService{

    getAllEmployees(){
        return axios.get(EMPLOYEE_BASE_REST_API_URL)
    }

    createEmployee(employee){
        return axios.post(EMPLOYEE_BASE_REST_API_URL, employee)
    }

    getEmployeeById(employee_id){
        return axios.get(EMPLOYEE_BASE_REST_API_URL + '/' + employee_id);
    }

    updateEmployee(employee_id, employee){
        return axios.put(EMPLOYEE_BASE_REST_API_URL + '/' +employee_id, employee);
    }

    deleteEmployee(employee_id){
        return axios.delete(EMPLOYEE_BASE_REST_API_URL + '/' + employee_id);
    }
}

export default new EmployeeService();