import React, { Component } from 'react';
import {Button, Container, Form} from "react-bootstrap";
import ReactDOM from "react-dom";
import {Input} from "@material-ui/core";
import NavBar from "./NavBar";
import background from "../Images/AdminBackgroud.jpg";
import axios from "axios";


var sectionstyle ={
    backgroundImage: `url(${background})`
}
const Category = props => (


    <option>{props.category.category}</option>
)

export default class addItem extends Component {
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
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            file: '',
            category : '',
            description : '',
            name : '',
            price : '',
            quantity : '',
            size :'',
            sizes : ['Small','Medium','Large'],
            meterial : '',
            itemlist: [],
            categories : []

        }
    }




    onChangeCategory(e) {
        this.setState({
            category: e.target.value
        })
    }

    // onChangeSubCategory(e) {
    //     this.setState({
    //         category: e.target.value
    //     })
    // }

    onChangeDescription(e){
        this.setState({
            description: e.target.value
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



    componentDidMount() {
        axios.get('http://localhost:5000/additem/' +this.props.match.params.id)
            .then(response => {
                this.setState({
                    file :response.data.filename,
                    category:response.data.category,
                    description:response.data.description,
                    name : response.data.name,
                    price:response.data.price,
                    quantity :response.data.quantity,
                    size : response.data.size,
                    meterial : response.data.meterial,
                    discount : response.data.discount,

                })

            })
            .catch(function (error) {
                console.log(error);
            })
        axios.get('http://localhost:5000/additem/')
            .then(response => {
                if(response.data.length > 0){
                    this.setState({
                        itemlist: response.data.map(additem => additem.name)
                    })
                }
            })

        axios.get('http://localhost:5000/category/')
            .then(response => {
                this.setState({
                    categories: response.data
                })
                console.log(response.data);

            })
            .catch((error) => {
                console.log(error);
            })
        axios.get('http://localhost:5000/category/find')
            .then(res => console.log(res.data))
    }
    onSubmit = (e) => {
        e.preventDefault();


        const item = {
            file: this.state.file,
            category: this.state.category,
            name: this.state.name,
            description: this.state.description,
            price: this.state.price,
            quantity: this.state.quantity,
            size: this.state.size,
            meterial: this.state.meterial,
            discount: this.state.discount,

        }


        console.log(item);

        // axios.post('http://localhost:5000/additem/add', additem)
        //     .then(res => console.log(res.data))
        //     .catch(err => console.log(err))
        axios.post('http://localhost:5000/additem/update/'+this.props.match.params.id,item)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
            alert('Item Updated')

        window.location ='/ItemList';


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
    // componentDidMount() {
    //     axios.get('http://localhost:5000/category/')
    //         .then(response => {
    //             this.setState({
    //                 categories: response.data
    //             })
    //             console.log(response.data);
    //
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         })
    //     axios.get('http://localhost:5000/category/find')
    //         .then(res => console.log(res.data))
    //
    // }
    categoryList(){
        return this.state.categories.map(currentcategory =>{
            return <Category category={currentcategory} key = {currentcategory._id} />;
        })
    }

    render() {
        // const onDrop = (files)=>{
        //
        //     let formData = new FormData();
        //     const config = {
        //         header:{conten}
        //     }
        // }
        let $imagePreview = (<div className="previewText image-container"></div>);
        if (this.state.imagePreviewUrl) {
            $imagePreview = (<div className="image-container" ><img src={this.state.imagePreviewUrl} alt="icon" width="300" height="400" /> </div>);
        }

        return (

            <div>

                <NavBar />
                <section style={sectionstyle}>
                    <Container>
                        <div className="p-3 mb-2 bg-light text-dark">
                            <center><h3>Update Item</h3></center>
                            <form onSubmit={this.onSubmit} enctype="multipart/form-data" >
                                {/*<div style={{display: 'flex', justifyContent:'space-between'}}>*/}
                                {/*    <Dropzone*/}
                                {/*        onDrop={onDrop}*/}
                                {/*        multiple*/}
                                {/*        maxSize*/}
                                {/*    >*/}
                                {/*        {({getRootProps, getInputProps}) =>(*/}
                                {/*            <div style={{width:'300px', height:'240px', border:'1px solid lightgrey', display:'flex',alignItems:'center', justifyContent:'center'}}*/}
                                {/*                 {...getRootProps()}*/}
                                {/*            >*/}
                                {/*                <input{...getInputProps()}/>*/}
                                {/*                <Icon type="plus" style={{fontSize:'3rem',color:'#949494'}}/>*/}

                                {/*            </div>*/}
                                {/*        )}*/}

                                {/*    </Dropzone>*/}

                                {/*    <div style={{  width:'300px', height:'240px', border:'1px solid lightgrey', display:'flex',overflowX:'scroll'}}>*/}

                                {/*        <div>*/}
                                {/*            <img/>*/}
                                {/*        </div>*/}



                                {/*    </div>*/}


                                {/*</div>*/}
                                {/*<p>Upload a new Image</p>*/}
                                {/*<div className="form-group">*/}
                                {/*    <input  type="file" name="file" onChange={this.handleFileChange} />*/}
                                {/*    /!*<button type="button" onClick={this.submit} > Upload </button>*!/*/}
                                {/*    { $imagePreview }*/}

                                {/*</div>*/}

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
                                    <input  type="text"
                                            required
                                            className="form-control"
                                            value={this.state.name}
                                            onChange={this.onChangeName}
                                    />
                                </div>

                                <div className="description">

                                    <label>Description  </label>
                                    <input  type="text"
                                            required
                                            className="form-control"
                                            value={this.state.description}
                                            onChange={this.onChangeDescription}
                                    />
                                </div>


                                <div className="form-group">
                                    <label>Price </label>
                                    <input  type="text"
                                            required
                                            className="form-control"
                                            value={this.state.price}
                                            onChange={this.onChangePrice}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Quantity </label>
                                    <input  type="text"
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
                                            this.state.sizes.map(function(size) {
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
                                    <input  type="text"
                                            required
                                            className="form-control"
                                            value={this.state.meterial}
                                            onChange={this.onChangeMeterial}
                                    />
                                </div>


                                <br />
                                <div className="form-group">
                                    <input type="submit" value="Update" className="btn btn-info" />
                                </div>
                            </form>
                        </div>
                    </Container>
                </section>
            </div>


        )
    }
}
// const rootElement = document.getElementById("root");
// ReactDOM.render(<AddCategories/>, rootElement);
