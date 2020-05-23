import React,{Component} from "react";
import NavBar from "./NavBar";
import {Link, Redirect} from 'react-router-dom';
import {Button, Container, Spinner, Table} from "react-bootstrap";
import axios from 'axios';
import {connect} from "react-redux";

const mapStateToProps = ({ session}) => ({
    session
});

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


 class ViewManager extends Component{
    constructor(props) {
        super(props);

        this.RemoveManager = this.RemoveManager.bind(this);

        this.state = {
            managers : [],
            loading:true
        };

    }

    componentDidMount() {
        axios.get('/managers/')
            .then(response => {
                this.setState({
                    managers: response.data,
                    loading:false
                })
            })
                    .catch((error) => {
                        console.log(error);
                    })

        }

    RemoveManager(id){
        axios.delete('/managers/'+id)
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
        if(this.props.session.username !== null) {
            return (
                <div id="page-container">
                    <NavBar/>
                    <center>
                    <Container style={{marginTop:'2%'}}>

                        <h3 className="text-center text-bright">Store Managers</h3>
                        <Table responsive>
                            <thead className="thead-light">
                            {this.state.loading ?
                                <center><Spinner animation='border'/></center>
                                :
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
                            }
                            </thead>

                                    <tbody>
                                    {this.managerList()}
                                    </tbody>


                        </Table>
                    </Container>
                    </center>
                </div>

            );
        }
        else{
            return(
                <Redirect to="/AdLog" />
            );
        }
    }
}
export default connect(
    mapStateToProps
)(ViewManager);