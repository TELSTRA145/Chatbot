import React, { Component } from 'react';
import ChatBot from 'react-simple-chatbot';
import CompanyPolicy from './CompanyPolicy'

class EmpInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '', 
      id:'',
      email: '',
      phone: '',
      p:''
    };
    //this.addDetails=this.addDetails.bind(this);
  }
  componentWillMount() {
    const { steps } = this.props;
    const { name,id,email,phone } = steps;
    this.setState({ name, id,email,phone});
  }
  
  addDetails=()=>{
    const baseURL = "http://localhost:8080/addEmployeeInputEntity";
    const {name,id,email,phone}=this.state;
    const info={
      empName:name.value,
      empId:id.value,
      emailId:email.value,
      phone:phone.value
      /*empName:"manasa",
      empId:"7895",
      emailId:"manasa@gmail.com",
      phone:"2222222222"*/
    } 
    fetch(baseURL,
        {
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(info)
        }).then(response=>response.json())
        
        return( 
          <div>Entered in DB</div>) 
  }
  
 
  render(){
    return(
        <div> {this.addDetails()} </div>  
    )
  }

}

class GetAnswer extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        question:''
      };
     
      this.answer="Hello"
      this.addDetails=this.addDetails.bind(this);
    }
    
    async componentWillMount() {
      
      const { steps } = this.props;
      //const {question}=this.state;
      const { question } = steps;
      const baseURL = `http://localhost:8080/getAnswer?question=${question.value}`;
      //this.setState({ question});
      await fetch (baseURL,{method:"POST",}).then((response) => response.json())
      .then((responseJson) => {
        this.answer=responseJson.answer
        console.log(responseJson.answer)
      })
      //const body = await response.json(); //string to json object
      console.log(this.answer)
      return(  
            <div> The answer is : {this.answer}
            </div>)
    }
    
    addDetails=()=>{
    const {question}=this.state;
    console.log("Question is ",question)
    //var answer = "Hello"
    //const baseURL = `http://localhost:8080/getAnswer?question=${question.value}`;
      /*const info={
        question:question.value
      }*/
      /*fetch(baseURL,  
          {
            method:"POST", 
            //headers:{"Content-Type":"application/json"},
            //body:JSON.stringify(info)
          })
          .then((response) => response.json())
          .then((responseJson) => {
            //this.setState({question:responseJson.answer})
            //console.log(responseJson)
            //console.log("With answer",responseJson.answer)
            this.answer=JSON.stringify(responseJson.answer)
            //responseJson.answer
            
    }).catch(Error=>{
      console.log(Error)
        alert(Error) 
      })*/
      //console.log("The answer is",this.answer)
          return(  
            <div> The answer is : {this.answer}
            </div>)
    }
    
    render(){
      return(
          <div> {this.addDetails()} </div>  
      )
    }
  
  }

class SimpleForm1 extends Component {
  render() {
    return (
      <ChatBot
      //headerTitle="Speech Synthesis"
      //speechSynthesis={{ enable: true, lang: 'en' }}
        steps={[
          {
            id: '1',
            message: 'What is your name?',
            trigger: 'name',
          },
          {
            id: 'name',
            user: true,
            trigger: '3',
            //end:true,
          },
          {
            id: '3',
            message: 'Hi {previousValue}! Please provide Your Employee Id?',
            trigger: 'id',
          },
          {
            id: 'id',
            user:true,
            trigger:'5'
            
          },
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
            //end:true,
            trigger:'7',
            
          },
          {
            id:'7',
            message:"Mobile no entered is {previousValue}",
            //message:"Please choose an option",
            trigger:'xyz'
          },
          {
            id:'xyz',
            component:<EmpInput/>,
            trigger:'option',
            
          },
          {
            id:'option',
            //message:'please select option to continue',
            //component:<Update/>,
            options: [
                { value: 'policy', label: 'Company\'s policy',trigger:'company'},
                { value: 'Info', label: 'Personal Info',trigger:'personal'},
             //   {value:'other',label:'Other Questions',trigger:'other ques'},
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
            component:<GetAnswer/>, 
            //trigger:'company'
            end:true

          },
          {
            id:'company',
            component:(
              <div>
                 <CompanyPolicy/>
               </div>
            ),
            trigger:'oq'
            
          }, 
          {
              id:'oq',
              options:[{value:'other',label:'Other Questions',trigger:'other ques'}],
              
          },
          {
            id:'other ques',
            message:'Please Enter Your Question',
            trigger:'9'
          },
          {
            id:'9',
            user:true,
            trigger:'10'
          },
          {
            id:'10',
            component:<GetAnswer/>, 
            end:true
          }

        ]}
      />
    );
  }
}

export default SimpleForm1;
