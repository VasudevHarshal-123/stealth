import React,{Component} from 'react';
import ReactDOM from 'react-dom';


export default class SendDate extends Component{
    constructor(){
        super();

        this.state = {
            name:"",
            age:0,
            file:[]
        }

        this.onSubmit = this.onSubmit.bind(this);
        // this.myName = this.myName(this);
    }

    myFile = e =>{
        // console.log(e.target.files[0]);
        this.setState({file:e.target.files[0]})
    }

    myAge = e => {
        this.setState({age:e.target.value});
    }

    myName = (e) =>{
        // console.log("dcdc",e.target.value);
        this.setState({name:e.target.value});
    }

    onSubmit = (e) =>{
        e.preventDefault();
        let data = {
            name:this.state.name,
            age: this.state.age,
            file:this.state.file
        }
        // console.log("Submiteed",data);
        fetch('http://localhost:8080/inputReceived',{
            method:'POST',
            body:JSON.stringify(data)
        })
        .then(respose => Response.json())
        .then((value) =>{
            console.log("Send Successfully",value)
        })
        .catch(err => console.log("error",err));
    }



    render(){
        let header = '';
        if(this.state.name){
        header = <h1>{this.state.age}</h1>
        }

        return(
            <div className='sendData'>
                {header}
                <div>
                    <form onSubmit={this.onSubmit}>
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