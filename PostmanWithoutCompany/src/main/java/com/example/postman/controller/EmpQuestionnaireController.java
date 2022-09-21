package com.example.postman.controller;

import com.example.postman.entity.EmployeeQuestionnaireEntity;
import com.example.postman.exception.APIFailureException;
import com.example.postman.exception.IncompleteDetailsProvided;
import com.example.postman.responseModel.QuestionnaireCompanyResponse;
import com.example.postman.responseModel.QuestionnairePersonalResponse;
import com.example.postman.service.EmpQuestionnaireService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("employee")
public class EmpQuestionnaireController {

    @Autowired
    private EmpQuestionnaireService empQuestionnaireServiceImpl;

    @PostMapping("/addEmpQuestionnaire")
    public EmployeeQuestionnaireEntity addEmpQ(@RequestBody EmployeeQuestionnaireEntity employeeQuestionnaire) throws APIFailureException, IncompleteDetailsProvided {
        System.out.println(employeeQuestionnaire);
        if(employeeQuestionnaire == null) {
            throw new IncompleteDetailsProvided("EmployeeQuestionnaireEntity is not found");
        }
        return empQuestionnaireServiceImpl.create(employeeQuestionnaire);
    }

    @GetMapping("/getAnswers")
    public QuestionnairePersonalResponse getAnswer(@RequestParam(required = true) String question,
                                                   @RequestParam(required = true) String empId) throws APIFailureException, IncompleteDetailsProvided {
        System.out.println(empId);
        if(empId == null){
            throw new IncompleteDetailsProvided("No Employee Id found");
        }
        return empQuestionnaireServiceImpl.getAnswer(question,empId);
    }

}
