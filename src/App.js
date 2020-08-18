import React,{Component, useState} from 'react';
import './App.css';


function App() {
  return (
    <div className="container">
      <h1>Functional style vs Class style</h1>
      <FuncComp number={7}></FuncComp>
      <ClassComp number={9}></ClassComp>
    </div>
  );
}



function FuncComp(props){
  let [_num, setNumber] = useState(props.number);
  let [_time,setTime] = useState((new Date()).toString());

  return (
    <div className="container">
      <h2>function style component</h2>
      <p>Number: {_num}</p>
      <input type="button" value="random" 
        onClick={ function(){
          setNumber(Math.random());
        }
      } />
      <p>{_time}</p>
      <input type="button" value="Date" 
        onClick={
          function(){
            setTime((new Date()).toString());
          }
        }/>
    </div>
  );
}



class ClassComp extends Component{
  constructor(props){
    super(props);
    this.state = {
      _num : this.props.number,
      _time : (new Date()).toString()
    }
  }
  render(){
    return (
      <div className="container">
        <h2>class style component</h2>
        <p>Number: {this.state._num}</p>
        <input type="button" value="random" 
          onClick={function(){
            this.setState({
              _num : Math.random()
            })
          }.bind(this)}/>
          <p>{this.state._time}</p>
          <input type="button" value="date" 
            onClick={function(){
              this.setState({
                _time : (new Date()).toString()
              })
            }.bind(this)}/>
      </div>
    )
  }
}


export default App;
