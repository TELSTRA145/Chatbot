import React, { Component } from 'react';
import ChatBot from 'react-simple-chatbot';
import CompanyPolicy from './CompanyPolicy'

class Update extends Component {
  constructor(props) {
    super(props);

    this.state = {
      empName: '',
      empId:'',
      emailId: '',
      phone: '',
      p:''
    };
    this.addDetails=this.addDetails.bind(this);
  }

  /*componentWillMount() {
    const { steps } = this.props;
    const { name,id,email,phone } = steps;
    this.setState({ name, id,email,phone});
  }*/

  addDetails=()=>{
    const {name,id,email,phone}=this.state;
    /*const info={
      name:name.value,
      id:id.value,
      email:email.value,
      phone:phone.value
    }*/
    
    /*axios({
      method: "post",
      url: "http://localhost:8080/addEmployeeInputEntity",
      //data:info,
      body:JSON.stringify(info),
      headers:{"Content-Type":"application/json"}
    })
    .then(response=>{
      alert("Done")
    })
    return(
      <div>Function Called</div>)*/
      const baseURL = "http://localhost:8080/addEmployeeInputEntity";
      const info={
        name:name.value,
        id:id.value,
        email:email.value,
        phone:phone.value
      };
  //MOVIE_DATA[MOVIE_DATA.length]=movieData
  //post request to add movie through react
  fetch(baseURL,
  {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(info)
  }).then(response=>{
    alert("Done")
  })
  return(
    <div>Function Called</div>)
  }


  render(){
    return(
      /*<script>
        addDetails()
      </script>*/
      <div> {this.addDetails()} </div>
        
    )

    }

}

class SimpleForm extends Component {
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
            message: 'Great',
            message:'What is your Email Address?',
            trigger: 'email',
          },
          {
            id:'email',
            user:true,
            trigger:'6'
          },
          {
            id:'6',
            message:'Cool',
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
            trigger:'7'
          },
          {
            id:'7',
            message:"Please select the option below",
            trigger:'option'
          },
          {
            id:'option',
            options: [
                { value: 'policy', label: 'Company\'s policy', trigger:'company' },
                { value: 'Info', label: 'Personal Info', trigger:'personal'},
                {value:'faq',label:'FAQ\'s',end:true}
              ],
            
          },
          {
            id:'personal',
            message:"Type your Question below",
            trigger:'8'
          },
          {
            id:'8',
            user:true,
            trigger:'p'
          },
          {
            id:'p',
            component:<Update/>,
            //message:"hia",
            trigger:'company'

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
            end:true

          }

        ]}
      />
    );
  }
}

export default SimpleForm;