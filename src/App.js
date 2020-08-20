import React,{Component, useState, useEffect} from 'react';
import './App.css';


function App() {
  let [funcShow, setFuncShow] = useState(true);
  let [classShow , setClassShow] = useState(true);

  return (
    <div className="container">
      <h1>Functional style vs Class style</h1>
      <input type="button" 
        value={ funcShow ? "remove func" : "make func"} 
        onClick={function(){
          setFuncShow( funcShow ? false : true );
        }}
      />
      <input type="button" 
        value={ classShow ? "remove class" : "make class"}
        onClick={function(){
          setClassShow( classShow ? false : true );
        }}
      />
      <hr style={{ backgroundColor: "black", height: "3px" }}/>
      {funcShow ? <FuncComp number={7}></FuncComp> : null}
      {classShow ? <ClassComp number={9}></ClassComp> : null}
    </div>
  );
}


let classStyle = 'color:red';
let funcStyle = 'color:blue';
let funcId = 0;

function FuncComp(props){
  let [_num, setNumber] = useState(props.number);
  let [_time,setTime] = useState((new Date()).toString());

  // componentDidMount, componentWillUnMount
  useEffect(function(){
    console.log('%cfunc => useEffect (componentDidMount) '+(++funcId), funcStyle);
    return function(){
      console.log('%cfunc => useEffect return (componentWillUnMount) '+(++funcId), funcStyle);
    }
  }, []);
  
  //side effect
  useEffect(function(){
    console.log('%cfunc => useEffect _num (componentDidMount & componentDidUpdate) '+(++funcId), funcStyle);
    document.title = _num;
    return function(){
      console.log('%cfunc => useEffect _num return (componentDidMount & componentDidUpdate) '+(++funcId), funcStyle);
    }
  }, [_num]);

  useEffect(function(){
    console.log('%cfunc => useEffect _time (componentDidMount & componentDidUpdate) '+(++funcId), funcStyle);
    document.title = _time;
    return function(){
      console.log('%cfunc => useEffect _time return (componentDidMount & componentDidUpdate) '+(++funcId), funcStyle);
    }
  }, [_time]);

  console.log('%cfunc => render '+(++funcId), funcStyle);

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

  // Class Component의 LifeCycle 이해하기
  componentDidMount(){
    console.log('%cclass => componentDidMount', classStyle);
  }
  shouldComponentUpdate(nextProps, nextState){
    console.log('%cclass => shouldComponentUpdate', classStyle);
    return true;
  }
  componentDidUpdate(nextProps, nextState){
    console.log('%cclass => componentDidUpdate', classStyle);
  }
  componentWillUnmount(){
    console.log('%cclass => componentWillUnMount', classStyle);
  }

  render(){
    console.log('%cclass => render', classStyle);
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
