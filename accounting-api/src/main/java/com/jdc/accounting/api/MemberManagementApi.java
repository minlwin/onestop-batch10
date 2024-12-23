package com.jdc.accounting.api;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/members")
public class MemberManagementApi {

	@GetMapping
	List<String> demo() {
		return List.of("Hello Admin");
	}
}
