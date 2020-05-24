import React, { Component } from 'react';
import {Button, Container, Form} from "react-bootstrap";
import ReactDOM from "react-dom";
import {Input} from "@material-ui/core";
import NavBar from "./NavBar";
import Footer from "../AdminComponents/Footer"
import background from "../Images/AdminBackgroud.jpg";
import axios from "axios";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";


const mapStateToProps = ({session}) => ({
    session
})


var sectionstyle ={
    backgroundImage: `url(${background})`
}
const Category = props => (


        <option>{props.category.category}</option>
)

class addItem extends Component {
    constructor(props) {
        super(props);

        this.handleFileChange = this.handleFileChange.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onChangeSize = this.onChangeSize.bind(this);
        this.onChangeMeterial = this.onChangeMeterial.bind(this);
        this.onChangeDiscount = this.onChangeDiscount.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            file: '',
            category : '',
            description : '',
            name : '',
            price : '',
            quantity : '',
            size :'',
            sizes : ['Select','Small','Medium','Large'],
            meterial : '',
            discount : 0,
            categories : []

        }
    }




    onChangeCategory(e) {
        this.setState({
            category: e.target.value
        })
    }

    onChangeDescription(e){
        this.setState({
            description: e.target.value
        })
    }
    onChangeDiscount(e){
        this.setState({
            discount: e.target.value
        })
    }

    onChangeName(e){
        this.setState({
            name: e.target.value
        })
    }

    onChangePrice(e){
        this.setState({
            price: e.target.value
        })
    }

    onChangeQuantity(e){
        this.setState({
            quantity: e.target.value
        })
    }

    onChangeSize(e){
        this.setState({
            size: e.target.value
        })
    }

    onChangeMeterial(e){
        this.setState({
            meterial: e.target.value
        })
    }


    onSubmit = (e) => {
        e.preventDefault();

        const additem = new FormData();

        additem.append('file', this.state.file)
        additem.append('category', this.state.category)
        additem.append('name', this.state.name)
        additem.append('description', this.state.description)
        additem.append('price', this.state.price)
        additem.append('quantity', this.state.quantity)
        additem.append('size', this.state.size)
        additem.append('meterial', this.state.meterial)
        additem.append('comment',[])
        additem.append('rating',[])
        // additem.append('discount', this.state.discount)



        console.log(additem);

        axios.post('/additem/add', additem)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
            alert('Item Added')



        // axios.post('http://localhost:5000/users/add', additem)
        //     .then(res => console.log(res.data));

        this.setState({
            file: 'null',
            category: '',
            description:'',
            name : '',
            price : '',
            quantity : '',
            size : '',
            meterial : '',
            discount: 0
        })
        this.props.history.push({
            pathname: '/ItemList',
            details: axios.get('http://localhost:5000/additem/')
                .then(response => {
                    if(response.data.length > 0){
                        this.setState({
                            itemlist: response.data.map(additem => additem.name)
                        })
                    }
                })
        });

    }
    state =  {
        selectedFile: null,
        imagePreviewUrl: null
    };

    handleFileChange = event => {
        this.setState({
            file: event.target.files[0]
        })

        let reader = new FileReader();

        reader.onloadend = () => {
            this.setState({
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(event.target.files[0])

    }

    componentDidMount() {
        axios.get('/category/')
            .then(response => {
                this.setState({
                    categories: response.data
                })
                console.log(response.data);

            })
            .catch((error) => {
                console.log(error);
            })
        axios.get('/category/find')
            .then(res => console.log(res.data))

    }
    categoryList(){
        return this.state.categories.map(currentcategory =>{
            return <Category category={currentcategory} key = {currentcategory._id} />;
        })
    }



    render() {

        let $imagePreview = (<div className="previewText image-container"></div>);
        if (this.state.imagePreviewUrl) {
            $imagePreview = (<div className="image-container" ><img src={this.state.imagePreviewUrl} alt="icon" width="300" height="400" /> </div>);
        }
        if (this.props.session.username !== null) {

            return (

                <div>

                    <NavBar/>
                    <section style={sectionstyle}>
                        <Container>
                            <div className="p-3 mb-2 bg-light text-dark">
                                <center><h3>Add Item</h3></center>
                                <form onSubmit={this.onSubmit} enctype="multipart/form-data">


                                    <div className="form-group">
                                        <input type="file" name="file" onChange={this.handleFileChange}/>
                                        {/*<button type="button" onClick={this.submit} > Upload </button>*/}
                                        {$imagePreview}

                                    </div>

                                    <div className="form-group">
                                        <label>Category </label>

                                        <select
                                            type="text"
                                            required
                                            className="form-control"
                                            value={this.state.category}
                                            onChange={this.onChangeCategory}>
                                            options={this.categoryList()}

                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Name </label>
                                        <input type="text"
                                               required
                                               className="form-control"
                                               value={this.state.name}
                                               onChange={this.onChangeName}
                                        />
                                    </div>

                                    <div className="description">

                                        <label>Description </label>
                                        <input type="text"
                                               required
                                               className="form-control"
                                               value={this.state.description}
                                               onChange={this.onChangeDescription}
                                        />
                                    </div>


                                    <div className="form-group">
                                        <label>Price </label>
                                        <input type="text"
                                               required
                                               className="form-control"
                                               value={this.state.price}
                                               onChange={this.onChangePrice}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Quantity </label>
                                        <input type="text"
                                               required
                                               className="form-control"
                                               value={this.state.quantity}
                                               onChange={this.onChangeQuantity}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Size </label>
                                        <select
                                            type="text"
                                            required
                                            className="form-control"
                                            value={this.state.size}
                                            onChange={this.onChangeSize}>
                                            {
                                                this.state.sizes.map(function (size) {
                                                    return <option
                                                        key={size}
                                                        value={size}>{size}
                                                    </option>;
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Meterial </label>
                                        <input type="text"
                                               required
                                               className="form-control"
                                               value={this.state.meterial}
                                               onChange={this.onChangeMeterial}
                                        />
                                    </div>


                                    <br/>
                                    <div className="form-group">
                                        <input type="submit" value="Add Item" className="btn btn-info"/>
                                    </div>
                                </form>
                            </div>
                        </Container>
                    </section>


                </div>


            )
        }
        else {
            return (
                <Redirect to="/AdLog"/>
            );
        }
    }
}
export default connect(
    mapStateToProps
)(addItem);

// const rootElement = document.getElementById("root");
// ReactDOM.render(<AddCategories/>, rootElement);
