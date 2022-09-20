package com.example.postman.service;

import com.example.postman.entity.EmployeeEntity;
import com.example.postman.responseModel.ResponseEntity;

import java.util.List;

public interface EmployeeService {
    public EmployeeEntity saveEntity(EmployeeEntity employeeEntity);
    public List<EmployeeEntity> getAll();
    public ResponseEntity checkEmpId(String empId);
}
