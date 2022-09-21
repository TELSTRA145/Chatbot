package com.example.postman.controller;

import com.example.postman.entity.CompanyDetailsQuestionnaire;
import com.example.postman.exception.APIFailureException;
import com.example.postman.responseModel.QuestionnaireCompanyResponse;
import com.example.postman.service.CompanyDetailsQuestionnaireService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@EnableAutoConfiguration
@CrossOrigin("http://localhost:3000")
@RequestMapping("company")
public class CompanyDetailsQuestionnaireController {

    @Autowired
    private CompanyDetailsQuestionnaireService companyQuestionnaireService;

    @PostMapping("/addCompanyQuestionnaire")
    public CompanyDetailsQuestionnaire addEmployee(@RequestBody CompanyDetailsQuestionnaire companyDetailsQuestionnaire){
        System.out.println(companyDetailsQuestionnaire);
        return companyQuestionnaireService.saveData(companyDetailsQuestionnaire);
    }

    @GetMapping("/getAllDetailsQuestionnaire")
    public List<CompanyDetailsQuestionnaire> getEmployees(){
        return companyQuestionnaireService.getAllData();
    }


    @GetMapping("/getAnswer")
    public QuestionnaireCompanyResponse getAnswerByQuestion(@RequestParam String question) throws APIFailureException{
        System.out.println(question);
        if(question == null) {
            throw new APIFailureException("Question is empty");
        }
        QuestionnaireCompanyResponse response = companyQuestionnaireService.getAnswerByQuestion(question);
        return response;
    }

}