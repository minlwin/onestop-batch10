package com.jdc.accounting.api;

import java.util.List;

import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.accounting.api.input.MemberAccessSearch;
import com.jdc.accounting.api.input.MemberSearch;
import com.jdc.accounting.api.input.MemberStatusForm;
import com.jdc.accounting.api.output.MemberAccessInfo;
import com.jdc.accounting.api.output.MemberInfo;
import com.jdc.accounting.api.output.PageResult;
import com.jdc.accounting.service.MemberManagementService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/members")
public class MemberManagementApi {

	private final MemberManagementService service;
	
	@GetMapping
	List<MemberInfo> search(MemberSearch form) {
		return service.search(form);
	}
	
	@PutMapping("{id}")
	MemberInfo updateStatus(String id, 
			@Validated @RequestBody MemberStatusForm form, BindingResult result) {
		return service.update(id, form);
	}
	
	@GetMapping("{id}")
	MemberInfo findById(@PathVariable String id) {
        return null;
    }
	
	@GetMapping("{id}/access")
	PageResult<MemberAccessInfo> searchAccessForMember(
			MemberAccessSearch form,
			@RequestParam(required = false, defaultValue = "0") int page, 
			@RequestParam(required = false, defaultValue = "10") int size) {
		return null;
	}
	
}
