package com.example.postman.service;

import com.example.postman.controller.EmployeeInputController;
import com.example.postman.entity.EmployeeEntity;
import com.example.postman.entity.EmployeeInputEntity;
import com.example.postman.entity.EmployeeQuestionnaireEntity;
import com.example.postman.exception.APIFailureException;
import com.example.postman.porterStemmer;
import com.example.postman.repository.EmpIdRepository;
import com.example.postman.repository.EmpQuestionnaireRepository;
import com.example.postman.repository.EmployeeInputRepository;
import com.example.postman.repository.EmployeeRepository;
import com.example.postman.responseModel.QuestionnaireResponse;
import com.example.postman.stopWordsRemoval;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class EmpQuestionnaireServiceImpl implements EmpQuestionnaireService {

    @Autowired
    private EmpQuestionnaireRepository questionnaireRepository;
    @Autowired
    private EmployeeInputRepository employeeInputRepository;
    public EmployeeInputController employeeInputController;
    @Autowired
    public EmpIdRepository empIdRepository;
    @Autowired
    private EmployeeRepository employeeRepository;

    public EmployeeQuestionnaireEntity create(EmployeeQuestionnaireEntity questionnaireEntity) throws APIFailureException {
        return questionnaireRepository.save(questionnaireEntity);
    }


    public QuestionnaireResponse getAnswerByQuestion(String question) throws APIFailureException {
        QuestionnaireResponse questionnaireResponse = new QuestionnaireResponse();
        question = question.toLowerCase();
        String[] words = question.split(" ");
        stopWordsRemoval stpRemove = new stopWordsRemoval();
        HashSet<String> cleanedWords = stpRemove.removeStopWord(words);
        porterStemmer obj = new porterStemmer();
        String kw = "";
        List<String> rwList = new ArrayList<>();
        List<String> uList = new ArrayList<>();
        String res = " ";
        for (String str : cleanedWords) {

            System.out.println(str + "- > " + obj.stemWord(str));

            rwList.add(obj.stemWord(str));
            kw = questionnaireRepository.searchByRootWord(obj.stemWord(str));
            System.out.println("Keyword:" + kw);
            if (kw == null || uList.contains(kw)) {
                //throw new APIFailureException("Keyword not found in the entered question");
                continue;
            }
            uList.add(kw);
            EmployeeInputEntity inputEntity = employeeInputRepository.searchForInput();
            String empId = inputEntity.getEmpId();
            System.out.println(empId);
            EmployeeEntity employeeEntity = employeeRepository.searchByEmpId(empId);
            if (employeeEntity == null) {
                questionnaireResponse.setAnswer("Please enter the correct Employee Id");
            } else {
                switch (kw) {
                    case "manager":
                        res += "You Manager name is " + employeeEntity.getManagerName() + " ";
                        break;
                    case "chapter_name":
                        res += "You Chapter name is " + employeeEntity.getChapterName() + " ";
                        break;
                    case "nwa_code":
                        res += "Use this NWA Code in your time sheets: " + employeeEntity.getNwaCode() + " ";
                        break;
                    case "location":
                        res += "You are currently located in " + employeeEntity.getLocation() + " office";
                        break;
                    case "role":
                        res += "Your role / designation in telstra is " + employeeEntity.getEmpRole();
                        break;
                    case "onboardingstatus":
                        res += "Your On-boarding status in Telstra is " + employeeEntity.getOnBoardingStatus();
                        break;
                    case "default":
                        throw new APIFailureException("Keyword not found");
                }
                questionnaireResponse.setAnswer(res);
            }
        }
        /*if(res==null){
             questionnaireResponse.setAnswer("Please re-check your question!!");
             return questionnaireResponse;
        }*/
        return questionnaireResponse;
    }

    @Override
    public QuestionnaireResponse getAnswer(String question, String empId) throws APIFailureException {
        QuestionnaireResponse questionnaireResponse = new QuestionnaireResponse();
        String[] words = question.toLowerCase().split(" ");
        stopWordsRemoval stpRemove = new stopWordsRemoval();
        HashSet<String> cleanedWords = stpRemove.removeStopWord(words);
        porterStemmer obj = new porterStemmer();
        String kw = "";
        List<String> rwList = new ArrayList<>(),uList = new ArrayList<>();
        String res = " ";
        for (String str : cleanedWords) {
            System.out.println(str + "- > " + obj.stemWord(str));
            rwList.add(obj.stemWord(str));
            kw = questionnaireRepository.searchByRootWord(obj.stemWord(str));
            System.out.println("Keyword:" + kw);
            int count=0;
            if (kw == null ) {
                count+=1;
                if(count == cleanedWords.size()){
                    questionnaireResponse.setAnswer("Keyword not found in the entered question");
                }
                //throw new APIFailureException("Keyword not found in the entered question");
                continue;
            }
            if ( uList.contains(kw)) {
                continue;
            }
            uList.add(kw);
            System.out.println(empId);
            EmployeeEntity employeeEntity = employeeRepository.searchByEmpId(empId);
            System.out.println(employeeEntity);
            if (employeeEntity == null) {
                questionnaireResponse.setAnswer("Please enter the correct Employee Id");
            } else {
                switch (kw) {
                    case "manager":
                        res += "You Manager name is " + employeeEntity.getManagerName() + " ";
                        break;
                    case "chapter_name":
                        res += "You Chapter name is " + employeeEntity.getChapterName() + " ";
                        break;
                    case "nwa_code":
                        res += "Use this NWA Code in your time sheets: " + employeeEntity.getNwaCode() + " ";
                        break;
                    case "location":
                        res += "You are currently located in " + employeeEntity.getLocation() + " office";
                        break;
                    case "role":
                        res += "Your role / designation in telstra is " + employeeEntity.getEmpRole();
                        break;
                    case "onboardingstatus":
                        res += "Your On-boarding status in Telstra is " + employeeEntity.getOnBoardingStatus();
                        break;
                    case "default":
                        throw new APIFailureException("Keyword not found");
                }

                questionnaireResponse.setAnswer(res);
            }
        }
        /*if(res==null){
             questionnaireResponse.setAnswer("Please re-check your question!!");
             return questionnaireResponse;
        }*/
        return questionnaireResponse;
    }

}
