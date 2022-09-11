import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatBot from 'react-simple-chatbot';
import CompanyPolicy from './CompanyPolicy'

/*
class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      id:'',
      email: '',
      phone: '',
    };
  }

  componentWillMount() {
    const { steps } = this.props;
    const { name,id,email,phone } = steps;

    this.setState({ name, id,email,phone});
  }

  
}

Review.propTypes = {
  steps: PropTypes.object,
};

Review.defaultProps = {
  steps: undefined,
};
*/
class SimpleForm extends Component {
  render() {
    return (
      <ChatBot
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
            message:'What is your Email Addrss?',
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
            trigger:'7'
          },
          {
            id:'7',
            message:"Please select the option below",
            trigger:'option'
          },
        

          {
            id:'option',
            //message:'please select option to continue',
            options: [
                { value: 'policy', label: 'Company\'s policy', trigger:'company' },
                { value: 'Info', label: 'Personal Info', end:true },
                {value:'faq',label:'FAQ\'s',end:true}
              ],
              

          },
          {
            id:'company',
            component:(
              <div>
                 <CompanyPolicy/>
					
               </div>
            ),
            end:true
            
          }

        ]}
      />
    );
  }
}

export default SimpleForm;