package com.example.postman.service;


import com.example.postman.entity.CompanyDetails;
import com.example.postman.repository.CompanyDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompanyDetailsService {
    @Autowired
    private CompanyDetailsRepository companyDetailsRepository;

    public CompanyDetails saveData(CompanyDetails companyDetails) {
        return companyDetailsRepository.save(companyDetails);
    }
    public List<CompanyDetails> getAllData() {
        return companyDetailsRepository.findAll();
    }
    public void deleteById(Integer id) {
        companyDetailsRepository.deleteById(id);
    }


}
