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
        // this.myName = this.myName(this);
    }

    myAge = e => {
        this.setState({age:e.target.value});
    }

    myName = (e) =>{
        // console.log("dcdc",e.target.value);
        this.setState({name:e.target.value});
    }

    myFile = e =>{
        // console.log(e.target.files[0]);
        this.setState({file:e.target.files[0]})
    }

    onSubmit = (e) =>{
        e.preventDefault();
        const data = new FormData(); 
     
        data.append("file",this.state.file);
        data.append("name",this.state.name);
        data.append("age",this.state.age); 
    
        // console.log("Submiteed",data);

        axios.post("http://localhost:8081/inputReceived", data, { // receive two parameter endpoint url ,form data 
        })
        .then(res => {
        console.log(res.statusText)
        })

        // fetch('http://localhost:8081/inputReceived',{
        //     mode: "no-cors",
        //     method:"POST",
        //     // headers: {
        //     //     "Content-Type": "multipart/form-data"
        //     // },
        //     body:JSON.stringify(data)
        // })
        // .then(response => response.text())
        // .then((value) =>{
        //     console.log("Send Successfully",value)
        // })
        // .catch(err => console.log("error",err));
    }



    render(){
        return(
            <div className='sendData'>
                <div>
                    <form onSubmit={this.onSubmit} encType="multipart/form-data">
                        <label>
                            <h3>Name:</h3>  
                            <input type="text" onChange={this.myName} required/>
                        </label>
                        <label>
                            Age:
                            <input type="text" name="age" onChange={this.myAge} required/>
                        </label>
                        <label>
                            file:
                            {/*Add required below  */}
                            <input type="file" name="file" onChange = {this.myFile}/>   
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        )
    }
}