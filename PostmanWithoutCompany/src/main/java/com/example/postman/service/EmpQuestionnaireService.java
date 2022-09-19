package com.example.postman.service;

import com.example.postman.entity.EmployeeQuestionnaireEntity;
import com.example.postman.exception.APIFailureException;
import com.example.postman.responseModel.QuestionnaireResponse;

public interface EmpQuestionnaireService {
    public EmployeeQuestionnaireEntity create(EmployeeQuestionnaireEntity questionnaireEntity) throws APIFailureException;
    public QuestionnaireResponse getAnswerByQuestion(String question) throws APIFailureException;
    public QuestionnaireResponse getAnswer(String question,String empId) throws APIFailureException;
}
