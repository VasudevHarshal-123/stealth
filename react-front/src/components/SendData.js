import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


export default class SendDate extends Component{
    constructor(){
        super();

        this.state = {
            name:"",
            age:0,
            file:null
        }

        this.onSubmit = this.onSubmit.bind(this);
    }

    myAge = e => {
        this.setState({age:e.target.value});
    }

    myName = (e) =>{
        this.setState({name:e.target.value});
    }

    myFile = e =>{
        this.setState({file:e.target.files[0]})
    }

    onSubmit = (e) =>{
        e.preventDefault();
        const data = new FormData(); 
     
        data.append("file",this.state.file);
        data.append("name",this.state.name);
        data.append("age",this.state.age); 
    
        axios.post("http://localhost:8081/inputReceived", data, {       })
        .then(res => {
        console.log(res.statusText)
        })
       
    }



    render(){
        return(
            <div className='sendData'>
                <div>
                    <form onSubmit={this.onSubmit} encType="multipart/form-data">
                        <label className="padd">
                            Name: 
                            <input type="text" onChange={this.myName} required/>
                        </label>
                        <label className="padd">
                            Age:
                            <input type="text" name="age" onChange={this.myAge} required/>
                        </label>
                        <label className="padd">
                            file:
                            <input type="file" name="file" onChange = {this.myFile} required/>   
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        )
    }
}