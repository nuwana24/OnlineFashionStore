import React,{Component} from "react";
import NavBar from "./NavBar";
import {Link} from 'react-router-dom';
import {Button, Container} from "react-bootstrap";
import axios from 'axios';


const Manager = props => (

    <tr>
        <td>{props.manager.firstName}</td>
        <td>{props.manager.lastName}</td>
        <td>{props.manager.email}</td>
        <td>{props.manager.gender}</td>
        {/*<td>{props.manager.password}</td>*/}
        <td>{props.manager.dateOfBirth}</td>
        <td>{props.manager.Address}</td>
        <td>{props.manager.Address2}</td>
        <td>{props.manager.city}</td>
        <td>{props.manager.zip}</td>
        <td>
            <Link to={"/EditManager/"+props.manager._id} className='actionLink bg-info'>Edit</Link> <a href="#" onClick={() => {props.RemoveManager(props.manager._id)}} className='actionLink bg-danger'>Delete</a>
        </td>
    </tr>
)


export default class ViewManager extends Component{
    constructor(props) {
        super(props);

        this.RemoveManager = this.RemoveManager.bind(this);

        this.state = {
            managers : []
        };

    }

    componentDidMount() {
        axios.get('http://localhost:5000/managers/')
            .then(response => {
                this.setState({
                    managers: response.data
                })
            })
                    .catch((error) => {
                        console.log(error);
                    })

        }

    RemoveManager(id){
        axios.delete('http://localhost:5000/managers/'+id)
            .then(res => console.log(res.data));

        this.setState({
            managers: this.state.managers.filter(el => el._id != id)
        })
    }

    managerList(){
        return this.state.managers.map(currentmanager =>{
            return <Manager manager={currentmanager} RemoveManager={this.RemoveManager} key = {currentmanager._id} />;
        })
    }

    render() {
        return (
            <div>
                <NavBar />
                <Container style={{marginLeft:'8%'}}>

                <h3 className="text-center text-bright">Store Managers</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Gender</th>
                            {/*<th>Password</th>*/}
                            <th>Date of birth</th>
                            <th>Address</th>
                            <th>Adress 2</th>
                            <th>City</th>
                            <th>Zip code</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.managerList()}
                    </tbody>
                </table>
                </Container>
            </div>
        );
    }
}