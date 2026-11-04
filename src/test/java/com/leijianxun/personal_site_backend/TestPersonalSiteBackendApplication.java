package com.leijianxun.personal_site_backend;

import org.springframework.boot.SpringApplication;

public class TestPersonalSiteBackendApplication {

	public static void main(String[] args) {
		SpringApplication.from(PersonalSiteBackendApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
