package com.example.postman.controller;

import com.example.postman.entity.EmployeeQuestionnaireEntity;
import com.example.postman.exception.APIFailureException;
import com.example.postman.responseModel.QuestionnaireResponse;
import com.example.postman.service.EmpQuestionnaireService;
import com.example.postman.service.EmpQuestionnaireServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:3000")
public class EmpQuestionnaireController {

    @Autowired
    private EmpQuestionnaireService empQuestionnaireServiceImpl;

    @PostMapping("/addEmpQuestionnaire")
    public EmployeeQuestionnaireEntity addEmpQ(@RequestBody EmployeeQuestionnaireEntity employeeQuestionnaire) throws APIFailureException
    {
        System.out.println(employeeQuestionnaire);
        if(employeeQuestionnaire == null) {
            throw new APIFailureException("EmployeeQuestionnaireEntity is not found");
        }
        return empQuestionnaireServiceImpl.create(employeeQuestionnaire);
    }

    @PostMapping("/getAnswer")
    public QuestionnaireResponse getAnswerByQuestion(@RequestParam String question) throws APIFailureException{
        System.out.println(question);
        if(question == null) {
            throw new APIFailureException("Question is empty");
        }
        return empQuestionnaireServiceImpl.getAnswerByQuestion(question);
    }

    @GetMapping("/getAnswers")
    public QuestionnaireResponse getAnswer(@RequestParam(required = true) String question,
                                           @RequestParam(required = true) String empId) throws APIFailureException{
        System.out.println(empId);
        if(empId == null){
            throw new APIFailureException("No Employee Id found");
        }
        return empQuestionnaireServiceImpl.getAnswer(question,empId);
    }

}
