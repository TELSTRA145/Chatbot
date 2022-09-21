package com.example.postman.controller;

import com.example.postman.entity.EmployeeEntity;
import com.example.postman.responseModel.ResponseEntity;
import com.example.postman.service.EmployeeService;
import com.example.postman.service.EmployeeServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@EnableAutoConfiguration
@CrossOrigin("http://localhost:3000")
@RequestMapping("employee")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeServiceImpl;

    @PostMapping("/addEmployee")
    public EmployeeEntity addEmployee(@RequestBody EmployeeEntity employeeEntity){
        System.out.println(employeeEntity);
        return employeeServiceImpl.saveEntity(employeeEntity);
    }

    @GetMapping("/getAllEmployees")
    public List<EmployeeEntity> getEmployees(){
        return employeeServiceImpl.getAll();
    }

    @GetMapping("/checkEmpId")
    public ResponseEntity checkEmpId(@RequestParam String empId){
        return employeeServiceImpl.checkEmpId(empId);
    }
}

