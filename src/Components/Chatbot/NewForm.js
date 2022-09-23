import React, { Component } from 'react';
import ChatBot from 'react-simple-chatbot';
import CompanyPolicy from './CompanyPolicy'


let pa="";
class EmpInput extends Component 
{
  constructor(props) {
    super(props);
    this.state = {
      name: '', 
      id:'',
      email: '',
      phone: '',
      p:''
    };
  }
  componentWillMount() {
    const { steps } = this.props;
    const { name,id,email,phone } = steps;
    this.setState({ name, id,email,phone});
    const info={
        empName:name.value,
        empId:id.value,
        emailId:email.value,
        phone:phone.value
      } 
      fetch("http://localhost:8080/addEmployeeInputEntity",
          {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(info)
          }).then(response=>response.json())
  }
  render(){
    return(
        <div> Entered in DB </div>  
    )
  }

}

class GetAnswer extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        question:[],
        flag:false 
      };
    }

    componentWillMount() {
      const { steps } = this.props;
      const { question } = steps;
      fetch (`http://localhost:8080/getAnswer?question=${question.value}`,{method:"POST",})
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
            question:responseJson,
            flag:true
        });
        console.log(responseJson.answer)
      })
    }
    
    render(){
        const {flag,question} = this.state;
        if(!flag) return <div>
           <p> Wait for some time....</p>
        </div>
      return(
          <div className='NewForm'>
            <p>{question.answer}</p> 
              </div>  
      )
    }
  
  }

  class GetAnswerById extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        question:[],
        flag:false 
      };
    }

    componentWillMount() {
      const { steps } = this.props;
      const { question,id } = steps;
      fetch (`http://localhost:8081/employee/getAnswers?question=${question.value}&empId=${id.value}`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
            question:responseJson,
            flag:true
        });
        console.log(responseJson.answer)
      })
    }
    
    render(){
      const {flag,question} = this.state;
      if(!flag) return <div>
         <p> Wait for some time....</p>
      </div>
    return(
        <div className='NewForm'>
          <p>{question.answer}</p> 
            </div>  
    )
  }
  
  }

  class GetCompanyAnswer extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        question:[],
        flag:false 
      };
    }

    componentWillMount() {
      const { steps } = this.props;
      const { otherQues } = steps;
      fetch (`http://localhost:8081/getAnswer?question=${otherQues.value}`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
            question:responseJson,
            flag:true
        });
        console.log(responseJson.answer)
      })
    }
    
    render(){
      const {flag,question} = this.state;
      if(!flag) return <div>
         <p> Wait for some time....</p>
      </div>
    return(
        <div className='NewForm'>
          <p>{question.description}</p>
          <a href={question.answer} target={question.answer} rel="noreferrer">
        Open Pdf
      </a>
          
            </div>  
    )
  }
  
  }
  class GetPersonalAnswer extends React.Component {

    constructor(props) {
      super(props);
  
      this.state = {
        question:[],
        flag:false 
      };
    }

    componentWillMount() {
      const { steps } = this.props;
      const { question,id } = steps;
      fetch (`http://localhost:8081/employee/getAnswers?question=${question.value}&empId=${id.value}`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
            question:responseJson,
            flag:true
        });
        console.log(responseJson.answer)
        pa=responseJson.answer
      })
      
      //console.log(this.props.myObj.em)
    }
    
    
    render(){

      const {flag,question} = this.state;
      //this.props.myObj.em += question.answer;
      //console.log(this.props.myObj.em)
      if(!flag) return <div>
         <p> Wait for some time....</p>
      </div>
    return(
        <div className='NewForm'>
          <p>{question.answer}</p> 
            </div>  
    ) 
  }
  
  }
  class CheckEmpId extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        id:[],
        flag:false 
      };
    }

    componentWillMount() {
      const { steps } = this.props;
      const { id } = steps;
      fetch (`http://localhost:8081/employee/checkEmpId?empId=${id.value}`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
            id:responseJson,
            flag:true
        });
        console.log(responseJson.result)
        
        this.props.obj.temp+=(responseJson.result)
        console.log(this.props.obj.temp)
      })
    }
    
    render(){
      const {flag,id} = this.state;
      if(!flag) return <div>
      <p> Wait for some time....</p>
   </div>
 return(
     <div className='NewForm'>
       <p>{id.result}</p> 
         </div>  
 ) 
    }
}

class NewForm extends Component {
  render() {
    let v={"temp":""};
    return (
      <ChatBot
      headerTitle="Telstra ChatBot"
      //speechSynthesis={{ enable: true, lang: 'en' }}
        steps={[
            {
                id:'intro',
                message:'Hello, Welcome to Telstra ChatBot!',
                trigger:'1',
                //alert(JSON.stringify(steps))
            },
          {
            id: '1',
            message: 'What is your name?',
            trigger: 'name',
          },
          {
            id: 'name',
            user: true,
            trigger: '3',
          },
          {
            id: '3',
            message: 'Hi {previousValue}!',
            trigger: 'id1',
          },
          {
            id: 'id1',
            message: 'Please provide Your Employee Id?',
            trigger: 'id',
          },
          {
            id: 'id',
            user:true,
            trigger:'checkId'  
          },
          {
              id:'checkId',
              component:<CheckEmpId obj={v}/>,
              trigger:'te'
            },
              {
                id:'te',
                message:"Employee Id check",
              trigger:(val,steps) =>{
                console.log(v.temp);
              if(v.temp==="Proceed.."){
                return '5'
              }
              else{
                v.temp = ""
              return 'msg1'}}
          },
          {
            id:'msg1',
           // message:'Entered EmpId is incorrect!',
            options: [
              //{ value: 'yes', label: 'Continue',trigger:'5'},
              { value: 'no', label: 'Click to enter Id again',trigger:'id1'},
            ],
            //trigger:'optionId'
          },
          /*{
            id:'optionId',
            options: [
                //{ value: 'yes', label: 'Continue',trigger:'5'},
                { value: 'no', label: 'Enter Id again',trigger:'id1'},
              ],
          },*/
          {
            id: '5',
            message:'What is your Email Address?',
            trigger: 'email',
          },
          {
            id:'email',
            user:true,
            validator:(value)=>{
            if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
                return 'Invalid email address'
              }
              return true
            },
            trigger:'6'
          },
          {
            id:'6',
            message:'Please provide your contact info',
            trigger:'phone'
          },
          {
            id:'phone',
            user:true,
            validator:(value)=>{
              if(value.length!==10){
                return 'Please provide valid contact info'
              }
              return true;
            },
            trigger:'7',
          },
          {
            id:'7',
            //component:<EmpInput/>,
            message:'Thank you for providing Information!',
            trigger:'msg',
          },
          {
            id:'msg',
            message:'please select option to continue',
            trigger:'option'
          },
          {
            id:'option',
            options: [
                { value: 'policy', label: 'Company\'s policy',trigger:'company'},
                { value: 'Info', label: 'Personal Info',trigger:'personal'},
                {value:'faq',label:'FAQ\'s',end:true}
              ],
          },
          {
            id:'personal',
            message:"Type your Question below",
            trigger:'question'
          },
          {
            id:'question',
            user:true, 
            trigger:'p'
          },
          {
            id:'p',
            component:<GetPersonalAnswer/>, 
            trigger:(val,steps)=>{
              console.log(pa)
              return 'msg2'}
          },
          {
            id:'msg2',
            message:'Do you want to continue?',
            trigger:'continueoption'
          },
          {
            id:'continueoption',
            options: [
                { value: 'continue', label: 'Yes',trigger:'option'},
                { value: 'stop', label: 'No',trigger:'endapp'},
              ],
          },
          {
            id:'endapp',
            message:'Thank you for visiting Telstra ChatBot!Have a nice day!!',
            end:true
          },
            {
                id:'company',
               component:<CompanyPolicy/>,
                trigger:'msg2'
              },
          /*{
              id:'oq',
              options:[{value:'other',label:'Other Questions',trigger:'other ques'}],
              
          },*/
          
          {
            id:'other ques',
            message:'Please Enter Your Question',
            trigger:'otherQues'
          },
          {
            id:'otherQues',
            user:true,
            trigger:'p1'
          },
          {
            id:'p1',
            component:<GetCompanyAnswer/>, 
            trigger:'msg2'
          },
          {
            id:'9',
            user:true,
            trigger:'10'
          },
          {
            id:'10',
            component:<GetAnswerById/>, 
            end:true
          }

        ]}
      />
    );
  }
}

  /*<FeedBack
	style={{zIndex:'2', marginLeft:'20px', position:'fixed'}}
	position="left"
	numberOfStars={5}
	headerText="Hello"
	bodyText="Custom Body test"
	buttonText="This is also custom"
	handleClose={() => console.log("handleclose")}
	handleSubmit={(data) => 
		fetch('https://formspree.io/xxxxxx', {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			method: 'POST', // or 'PUT'
			body: JSON.stringify(data),
		}).then((response) => { 
			if (!response.ok) {
				return Promise.reject('Our servers are having issues! We couldn\'t send your feedback!');
			}
			response.json()
		}).then(() => {
			alert('Success!');
		}).catch((error) => {
			alert('Our servers are having issues! We couldn\'t send your feedback!', error);
		})
	}
	handleButtonClick={() => console.log("handleButtonClick")}

/>*/

export default NewForm;

