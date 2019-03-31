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
                image={step.avatar}
                name={step.user_name} 
                date={step.created_at}
                message={step.description} 
              />
        )
       })

	);
}







function Tweets (props){ // function sintax
  return(
    <div className="tweet2">
      
      <div className="row">
      	<img className="llama" src={props.image} />
        <div>
	        <div>{props.name}</div>
	        
	        <div>{props.message}</div> 
        </div>

      </div>
       <div className="date">{props.date}</div>
     
      
    </div>
  );
}





class App extends Component {
  constructor(props){
    super(props);
    this.state={
      tweets: [],
      error:null,
      isLoaded:false,
      };
      this.myRef= React.createRef();
  }

  componentDidMount(){
	fetch("https://still-garden-88285.herokuapp.com/draft_tweets")
		.then(response=> response.json())
		.then(
			(result)=>{
				console.log(result);
				this.setState({
					isLoaded:true,
					tweets:result.draft_tweets
				})
			},
			(error)=>{
				this.setState({
					isLoaded:true,
					error:error
				})
			}
		)
}



handleClick =(e, childRef)=>{
 	console.log(e,childRef);
 	childRef.current.focus();
 	const post2={
 		
 	};
  
    fetch("https://still-garden-88285.herokuapp.com/draft_tweets",
    	{method:"POST", 
    	body: JSON.stringify({
    		avatar:"http://notiultimas.com/digital/wp-content/uploads/2018/11/Llamas.jpg",
 			user_name: "anonymous user",
 			description: childRef.current.value
 		}), 
 		headers:{'Content-Type': 'application/json'}})
    .then(res => res.json())
	.then((response) => //{
	console.log('Success:', JSON.stringify({response}))
	/*
	 this.setState({
					isLoaded:true,
					tweets:response.draft_tweets
				})}*/

	)
.catch(error => console.error('Error:', error));
childRef.current.value="";
    
    
}


 handleChange =()=>{
   this.myRef.current.focus();
}


    render(){
     const {error, isLoaded, tweets}=this.state;
     let content;
     if(error){
      		content=<div>Error:{error.message}</div>;
      	} else {
      return(
      	content=(
      	<Fragment >
          <div >
          <div>
            <div className="tweet">
            <Bar />
              <div className="upperBar">
                	<InputTweet handleClick={this.handleClick}/>
              </div>
            </div>

          </div>

            <div className="actualTweet" isLoaded={this.state.isLoaded /*hacer variable const al principio y utilizar variables*/}>
             	<Feed tweets={tweets}  />
            </div>
          </div>
         </Fragment>
         )
      );
    }
    return (
      <div className="App">
        { content }
      </div>
	)
	}
}





export default App;



