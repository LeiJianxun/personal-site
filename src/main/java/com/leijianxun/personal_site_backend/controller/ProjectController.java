package com.leijianxun.personal_site_backend.controller;

import com.leijianxun.personal_site_backend.repository.ProjectRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectRepository projects;

    public ProjectController(ProjectRepository projects) {
        this.projects = projects;
    }

    @GetMapping
    public List<ProjectRepository.Summary> list() {
        return projects.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectRepository.Detail> detail(@PathVariable("id") long id) {
        return ResponseEntity.of(projects.findById(id));
    }

}
