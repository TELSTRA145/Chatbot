import React, { Component } from 'react';
import ChatBot from 'react-simple-chatbot';
import CompanyPolicy from './CompanyPolicy';
import GetCompanyAnswer from '../ReactComponents/GetCompanyAnswer'
import GetPersonalAnswer from '../ReactComponents/GetPersonalAnswer'
import emailjs from '@emailjs/browser';
import  FAQs  from './FAQs';
import { ThemeProvider } from 'styled-components';


const theme = {
  background: '#f5f8fb',
  fontFamily: 'monospace',
  headerBgColor: '#6e48aa',
  headerFontColor: '#fff',
  headerFontSize: '18px',
  botBubbleColor: '#6E48AA',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a'
};

class Doownloadtranscript extends Component{

  render(){
    const downloadTxtFile=()=>{
      const element=document.createElement('a');
      const file=new Blob([this.props.myObj.em],{
        type:"text/plain;charset=utf-8"
      });

      element.href=URL.createObjectURL(file);
      element.download='Transcript.txt';
      document.body.appendChild(element);
      element.click();
    }
    return(
      <div>
        <button type="submit" onClick={downloadTxtFile}>Download</button>
      </div>
    )
  }
}

class EmailService extends React.Component{  
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
  }
  render(){
    //const form = useRef();
   //var temp="";
   //temp+={JSON.stringify(this.props.myObj.em)}

   
  const sendEmail = (e) => {
   e.preventDefault();
    emailjs.sendForm('service_ik378iq', 'template_t1t4es3', e.target, 'G36JtlAB904K9xQCs')
      .then((result) => {
          console.log(result.text);
          this.ans=result;
      }, (error) => {
          console.log(error.text);
      });
  };
  
  const { email} = this.state;
    
    return(
        
     <form onSubmit={sendEmail}>
        <textarea name="result" value={(this.props.myObj.em)} hidden/>
        <input type="email" name="email" value={email.value} hidden/>
        <p>Please Click Send</p>
        <input type="submit" value="Send" />
      </form>
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
      
      this.props.obj.temp=(responseJson.result)
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

class Form extends Component {
  render() {
    let v={"temp":""};
    let res={"em":""};
    let pa={"pans":""};
    //let str="";
    return (
      <ThemeProvider theme={theme}>
              <ChatBot
      headerTitle="Telstra ChatBot"
      speechSynthesis={{ enable: true, lang: 'en' }}
        steps={[
            {
                id:'intro',
                message:'Hello, Welcome to Telstra ChatBot!',
                trigger: ({val,steps})=>{
                  res.em+="Chatbot: "+JSON.stringify(steps['intro'].message);
                  res.em+="\n";
                  return '1';
                }
            },
          {
            id: '1',
            message: 'What is your name?',
            trigger: ({val,steps})=>{
              res.em+="Chatbot: "+JSON.stringify(steps['1'].message);
              res.em+="\n";
              return 'name';
            }
          },
          {
            id: 'name',
            user: true,
            trigger: ({val,steps})=>{
              res.em+="User: "+JSON.stringify(steps['name'].message);
              res.em+="\n";
              return '3';
            }
          },
          {
            id: '3',
            message: 'Hi {previousValue}!',
            trigger:'id1'
          },
          {
            id:'id1',
            message:'Please provide Your Employee Id',
            trigger: ({val,steps})=>{
              res.em+="Chatbot: Hi "+JSON.stringify(steps['name'].message)+" "+JSON.stringify(steps['id1'].message);
              res.em+="\n";
              return 'id';
            }
          },
          {
            id: 'id',
            user:true,
            trigger:'checkId'  
          },
          {
              id:'checkId',
              //message:"Hello from check",
              component:<CheckEmpId obj={v}/>,
              trigger:'te'
            },
              {
                id:'te',
                message:"Employee Id check",
              trigger:({val,steps}) =>{
                console.log(v.temp);
              if(v.temp==="Proceed.."){
                return '5';
              }
              else{
                //v.temp = ""
              return 'msg1';}}
          },
          {
            id:'msg1',
           // message:'Entered EmpId is incorrect!',
            options: [
              //{ value: 'yes', label: 'Continue',trigger:'5'},
              { value: 'no', label: 'Click to enter Employee Id again',trigger:'id1'},
            ],
            //trigger:'optionId'
          },
          
          /*{
            id: 'id',
            user:true,
            trigger: ({val,steps})=>{
              res.em+="User: "+JSON.stringify(steps['id'].message);
              res.em+="\n";
              return '5';
            }
          },*/

          {
            id: '5',
            message:'Please provide your Email Address',
            trigger: ({val,steps})=>{
              res.em+="Chatbot: "+JSON.stringify(steps['5'].message);
              res.em+="\n";
              console.log(res.em);
              return 'email';
            }
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
            trigger: ({val,steps})=>{
              res.em+="User: "+JSON.stringify(steps['email'].message);
              res.em+="\n";
              return '6';
            }
          },
          {
            id:'6',
            message:'Please provide your contact info',
            trigger: ({val,steps})=>{
              res.em+="Chatbot: "+JSON.stringify(steps['6'].message);
              res.em+="\n";
              return 'phone';

            }
            
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
            trigger: ({val,steps})=>{
              res.em+="User: "+JSON.stringify(steps['phone'].message);
              res.em+="\n";
              return '7';

            }
            
          },
          {
            id:'7',
            //component:<EmpInput/>,
            message:'Thank you for providing Information!',
            trigger: ({val,steps})=>{
              res.em+="Chatbot: "+JSON.stringify(steps['7'].message);
              res.em+="\n";
              return 'msg';
            }
            
          },
          {
            id:'msg',
            message:'please select option to continue',
            trigger: ({val,steps})=>{
              res.em+="Chatbot: "+JSON.stringify(steps['msg'].message);
              res.em+="\n";
              return 'option';
            }
          },
          {
            id:'option',
            options: [
                { value: 'policy', label: 'Company\'s policy',trigger: ({val,steps})=>{
                  res.em+="User:Company's Policy";
                  res.em+="\n";
                  return 'company';
                }},
                { value: 'Info', label: 'Personal Info',trigger: ({val,steps})=>{
                  res.em+="User: Personal Info";
                  res.em+="\n";
                  return 'personal';
                }},
                {value:'faq',label:'FAQ\'s',trigger:'fqa'}
              ],
          },
          {
              id:'fqa',
              component:<FAQs/>,
              trigger:'secondoption'
          },
          {
            id:'personal',
            message:"Type your Question below",
            trigger: ({val,steps})=>{

              res.em+="Chatbot: "+JSON.stringify(steps['personal'].message);
              res.em+="\n";
              return 'question';
            }
          },
          {
            id:'question',
            user:true,
            trigger: ({val,steps})=>{
              res.em+="User: "+JSON.stringify(steps['question'].message);
              res.em+="\n";
              pa.pans += res.em;
              console.log(pa.pans);
            /*setTimeout(()=>{
              return 'p';
            },2000)*/
            return 'p';
          }
          },
          {
            id:'p',
            component:<GetPersonalAnswer myObj1={pa}/>,
            trigger:(val,steps)=>{
              console.log(pa.pans)

              //str="";
              return 'msg2'}
          },
          {
            id:'msg2',
            message:'Do you want to continue?',
            trigger: ({val,steps})=>{
              res.em+="Chatbot: "+JSON.stringify(steps['msg2'].message);
              res.em+="\n";
              return 'continueoption';
            }
            
          },
          {
            id:'continueoption',
            options: [
                { value: 'continue', label: 'Yes',trigger:'secondoption'},
                { value: 'stop', label: 'No',trigger:'Quitmsg'},
              ],
          },
          {
            id:'secondoption',
            options: [
              { value: 'policy', label: 'Company\'s policy',trigger: ({val,steps})=>{
                res.em+="User:Company's Policy";
                res.em+="\n";
                return 'company';
              }},
              { value: 'Info', label: 'Personal Info',trigger: ({val,steps})=>{
                res.em+="User: Personal Info";
                res.em+="\n";
                return 'personal';
              }},
              {value:'faq',label:'FAQ\'s',trigger:'faqs'},
              {value:'quit',label:'Quit',trigger: ({val,steps})=>{
                res.em+="User: Quit";
                res.em+="\n";
                return 'Quitmsg';
              }}
            ],

          },
          {
            id:'faqs',
            component:<FAQs/>,
            trigger:'msg2'
          },
          {
            id:'Quitoption',
            options:[{value:'yes',label:'Download',trigger:'DownloadTranscript'},
            {value:'No',label:'Email Chat transcript',trigger:'Quit'}]
          },
          {
            id:'DownloadTranscript',
            component:<Doownloadtranscript myObj={res}/>,
            trigger:'endapp'
          },
          {
            id:'Quit',
            component:<GetPersonalAnswer myObj={res}/>,
            trigger:'endapp'
          },
          {
            id:'Quit',
            component:<EmailService myObj={res}/>,
            trigger:'endapp'
          },
          {
            id:'endapp',
            message:'Thank you for visiting Telstra ChatBot!Have a nice day!!',
            trigger: ({val,steps})=>{
              res.em+=JSON.stringify(steps['endapp'].message);
              res.em+="\n";
             console.log(res.em)
              return 'end';
            },
            end:true
          },
          {
            id:'Quitmsg',
            message:'Please select option to download or get the chat transcript as mail',
            trigger:'Quitoption'
          },
            {
                id:'company',
                component:<CompanyPolicy/>,

                //trigger:'msg2'

                trigger:'oq'
              },
              {
                id:'oq',
                options:[{value:'other q',label:'Other Questions',trigger:'oq2'}]
              },
             
          {
            id:'oq2',
            user:true,
            trigger:'otherQues'
          },
          {
            id:'otherQues',
            component:<GetCompanyAnswer/>, 
            trigger:'msg2'
          },
          

        ]}
      />
      </ThemeProvider>
      
    );
  }
}

export default Form;
