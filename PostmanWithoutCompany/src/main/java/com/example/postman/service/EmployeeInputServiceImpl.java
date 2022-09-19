package com.example.postman.service;


import com.example.postman.entity.EmployeeEntity;
import com.example.postman.entity.EmployeeInputEntity;
import com.example.postman.exception.APIFailureException;
import com.example.postman.repository.EmployeeInputRepository;
import com.example.postman.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeInputServiceImpl implements EmployeeInputService{

        @Autowired
        private EmployeeInputRepository repository;
        @Autowired
        private EmployeeRepository employeeRepository;

        public EmployeeInputEntity saveProduct(EmployeeInputEntity employeeInputEntity) {
                return repository.save(employeeInputEntity);
        }

        public EmployeeEntity checkEmployeeId(EmployeeInputEntity employeeInput) throws APIFailureException {
                System.out.println(employeeInput.getEmpId()+" "+employeeInput.getEmpName());
                EmployeeEntity employee = employeeRepository.searchByEmpId((employeeInput.getEmpId()));
                //Integer employeeId = employeeRepository.searchByEmpId(employeeInput.getEmpId());
                System.out.println("EmployeeId found: "+employee);
                if(employee == null) {
                        throw new APIFailureException("EmployeeEntity is null");
                }
                if ((employee.getEmpId()).equals(employeeInput.getEmpId())) {
                        return employee;
                }
                return null;
        }
}