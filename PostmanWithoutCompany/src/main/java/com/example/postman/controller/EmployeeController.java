package com.example.postman.controller;

import com.example.postman.entity.EmployeeEntity;
import com.example.postman.exception.IncompleteDetailsProvided;
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
    public EmployeeEntity addEmployee(@RequestBody EmployeeEntity employeeEntity) throws IncompleteDetailsProvided {
        if(employeeEntity.getOnBoardingStatus()==null || employeeEntity.getChapterName()==null || employeeEntity.getManagerName()==null
            || employeeEntity.getLocation()==null || employeeEntity.getEmpRole()==null || employeeEntity.getEmailId()==null
            || employeeEntity.getEmpId()==null || employeeEntity.getEmpName()==null || employeeEntity.getNwaCode()==null ||employeeEntity.getPhone()==null){
            throw new IncompleteDetailsProvided("Incomplete inputs are provided");
        }
        System.out.println(employeeEntity);
        return employeeServiceImpl.saveEntity(employeeEntity);
    }

    @GetMapping("/getAllEmployees")
    public List<EmployeeEntity> getEmployees(){
        return employeeServiceImpl.getAll();
    }

    @GetMapping("/checkEmpId")
    public ResponseEntity checkEmpId(@RequestParam String empId) throws IncompleteDetailsProvided {
        if(empId==null){
            throw new IncompleteDetailsProvided("EmpId input is missing");
        }
        return employeeServiceImpl.checkEmpId(empId);
    }
}

