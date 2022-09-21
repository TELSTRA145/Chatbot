package com.example.postman.service;

import com.example.postman.entity.EmployeeQuestionnaireEntity;
import com.example.postman.exception.APIFailureException;
import com.example.postman.responseModel.QuestionnaireCompanyResponse;
import com.example.postman.responseModel.QuestionnairePersonalResponse;

public interface EmpQuestionnaireService {
    public EmployeeQuestionnaireEntity create(EmployeeQuestionnaireEntity questionnaireEntity) throws APIFailureException;
        public QuestionnairePersonalResponse getAnswer(String question, String empId) throws APIFailureException;
}
