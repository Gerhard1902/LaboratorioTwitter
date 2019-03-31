import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
import llama from "./llama.jpg";

class Bar extends Component{ // function sintax
  render(){
  return(
        <div>
          <img className="llama" src={llama} />
        </div> 
  );
  }
}


class InputTweet extends Component{ // function sintax
  constructor(props){
    super(props);
    this.myRef= React.createRef();
    this.state={
      text:"ok",
      };
  }

   handleChange =(e)=>{
   	this.setState({text: e.target.value}) 
}
handleClick=(e)=>{
	
	this.props.handleClick(e, this.myRef);
}

  render(){
  return(
        <div>
          <input className="text"type="text" ref={this.myRef} placeholder="What´s happening?" onChange={(e)=>this.handleChange(e)} value={this.state.text}  />
          <button className="myButton"onClick={(e)=>this.handleClick(e)}>Tweet</button>
        </div> 
  );
  }
}


function Feed(props){
	return(
		props.tweets.map((step, index) => {
        return (
          <Tweets 
                className="actualTweet"
                name={step.name} 
                date={step.date}
                message={step.message} 
              />
        )
       })

	);
}


function Tweets (props){ // function sintax
  return(
    <div className="tweet2">
      <img className="llama" src={llama} />
      <div className="column">
        <div>{props.name}</div>
        <div>{props.message}</div> 
      </div>
      <div className="date">{props.date}</div>
      
    </div>
  );
}





class App extends Component {
  constructor(props){
    super(props);
    this.state={
      tweets: []
      };
      this.myRef= React.createRef();
  }

handleClick =(e, childRef)=>{
 	console.log(e,childRef);
   const tweets = this.state.tweets.slice();
   childRef.current.focus();
    this.setState({
      tweets: [...tweets, {name:"Gerardo", date:"11-03-2019", message:childRef.current.value} ],
    } );
    childRef.current.value="";
    
}


 handleChange =()=>{
   this.myRef.current.focus();
}


    render(){
      const array = this.state.tweets;
     
      return(
          <div >
          <div>
            <div className="tweet">
              <Bar
                ref={this.myRef} 
                onClick={()=> this.handleClick() } 
                onChange={()=> this.handleChange()}
              />
              <div className="upperBar">
                	<InputTweet handleClick={this.handleClick}/>
              </div>
            </div>
            </div>

            <div className="actualTweet">
             	<Feed tweets={array}  />
            </div>
          </div>
      );
    }
}





export default App;



