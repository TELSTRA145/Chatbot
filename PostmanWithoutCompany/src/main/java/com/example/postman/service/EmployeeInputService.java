package com.example.postman.service;

import com.example.postman.entity.EmployeeEntity;
import com.example.postman.entity.EmployeeInputEntity;
import com.example.postman.exception.APIFailureException;

public interface EmployeeInputService {
    public EmployeeInputEntity saveProduct(EmployeeInputEntity employeeInputEntity);
    public EmployeeEntity checkEmployeeId(EmployeeInputEntity employeeInput) throws APIFailureException;
}
