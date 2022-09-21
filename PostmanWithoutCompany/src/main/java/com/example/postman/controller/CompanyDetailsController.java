package com.example.postman.controller;

import com.example.postman.entity.CompanyDetails;
import com.example.postman.exception.IncompleteDetailsProvided;
import com.example.postman.service.CompanyDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@EnableAutoConfiguration
@RequestMapping("company")
public class CompanyDetailsController {

    @Autowired
    private CompanyDetailsService companyDetailsService;

    @PostMapping("/addCompanyInfo")
    public CompanyDetails addEmployee(@RequestBody CompanyDetails companyDetails) throws IncompleteDetailsProvided {
        if(companyDetails.getFile_link()==null || companyDetails.getFile_name()==null
                || companyDetails.getFile_type()==null){
            throw new IncompleteDetailsProvided("Incomplete inputs are provided");
        }
        System.out.println(companyDetails);
        return companyDetailsService.saveData(companyDetails);
    }

    @GetMapping("/getAllDetails")
    public List<CompanyDetails> getEmployees(){
        return companyDetailsService.getAllData();
    }
}
