package com.example.postman.controller;

import com.example.postman.entity.CompanyDetails;
import com.example.postman.service.CompanyDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@EnableAutoConfiguration
public class CompanyDetailsController {

    @Autowired
    private CompanyDetailsService companyDetailsService;

    @PostMapping("/addCompanyInfo")
    public CompanyDetails addEmployee(@RequestBody CompanyDetails companyDetails){
        System.out.println(companyDetails);
        return companyDetailsService.saveData(companyDetails);
    }

    @GetMapping("/getAllDetails")
    public List<CompanyDetails> getEmployees(){
        return companyDetailsService.getAllData();
    }
}
