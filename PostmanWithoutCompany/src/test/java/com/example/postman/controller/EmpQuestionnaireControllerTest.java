package com.example.postman.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@SpringBootTest
@AutoConfigureMockMvc
class EmpQuestionnaireControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Test
    void getAnswer() throws Exception {
        mockMvc.perform(get("http://localhost:8080/employee/getAnswers?question=who is my manager and where am I located in Telstra&empId=49917346")).andExpect(status().isOk())
                .andExpect(content().contentType("application/json"))
                .andExpect(jsonPath("$.answer").value(" You Manager name is Abhishek Harsh You are currently located in Bangalore office"));

    }
}