package com.example.postman.service;

import com.example.postman.entity.CompanyDetails;
import com.example.postman.entity.CompanyDetailsQuestionnaire;
import com.example.postman.exception.APIFailureException;
import com.example.postman.porterStemmer;
import com.example.postman.stopWordsRemoval;
import com.example.postman.repository.CompanyDetailsQuestionnaireRepository;
import com.example.postman.repository.CompanyDetailsRepository;
import com.example.postman.responseModel.QuestionnaireResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

@Service
public class CompanyDetailsQuestionnaireService {
    @Autowired
    private CompanyDetailsQuestionnaireRepository companyQuestionnaireRepository;

    @Autowired
    private CompanyDetailsRepository companyDetailsRepository;

    public CompanyDetailsQuestionnaire saveData(CompanyDetailsQuestionnaire companyDetailsQuestionnaire) {
        return companyQuestionnaireRepository.save(companyDetailsQuestionnaire);
    }
    public List<CompanyDetailsQuestionnaire> getAllData() {
        return companyQuestionnaireRepository.findAll();
    }
    public void deleteById(Integer id) {
        companyQuestionnaireRepository.deleteById(id);
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
        String desc=" ";
        for (String str : cleanedWords) {

            System.out.println(str + "- > " + obj.stemWord(str));

            rwList.add(obj.stemWord(str));
            kw = companyQuestionnaireRepository.searchByRootWord(obj.stemWord(str));
            System.out.println("Keyword:" +kw);
            if (kw == null || uList.contains(kw)) {
                //throw new APIFailureException("Keyword not found in the entered question");
                continue;
            }
            uList.add(kw);
            CompanyDetails companyDetails = companyDetailsRepository.searchByFileName(kw);

            switch (kw) {
                case "Code_Of_Conduct":
                    res += companyDetails.getFile_link() ;
                    desc += "Code Of Conduct";
                    break;
                case "Hr_Policies":
                    res += companyDetails.getFile_link();
                    desc += "Hr Policies";
                    break;
                case "Telstra_Job_Description":
                    res += " Job description at Telstra is  " + companyDetails.getFile_link() +" ";
                    desc += "Telstra Job Description";
                    break;
                case "Welcome_Video":
                    res += " Welcome Video->  " + companyDetails.getFile_link() + " office";
                    desc += "Welcome Video";
                    break;
                case "default":
                    throw new APIFailureException("Keyword not found");
            }
            questionnaireResponse.setAnswer(res);
            questionnaireResponse.setDescription(desc);
        }

        return questionnaireResponse;
    }


}
