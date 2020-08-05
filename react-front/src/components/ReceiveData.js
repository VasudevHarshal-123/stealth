import React, { Component } from 'react'

export class ReceiveData extends Component {
    constructor(){
        super();
        this.state={
            count:0
        }
        this.onClick = this.onClick.bind(this);
    }

    onClick = ()=>{

         fetch('http://localhost:8080/')
        .then(response => response.json())
        .then(data =>{
            console.log("Receuved Successfully",data.flag[data.flag.length-1].count);
            let c = data.flag[data.flag.length-1].count;
            this.setState({
                count:c
            })
        })
        .catch(err => console.log("error",err));

    }

    render() {
        let count=0;
        if(this.state.count){
            count=this.state.count;
        }
        return (
            <div>
                {count}
                <button onClick={this.onClick}>Refresh</button>
            </div>
        )
    }
}

export default ReceiveData
