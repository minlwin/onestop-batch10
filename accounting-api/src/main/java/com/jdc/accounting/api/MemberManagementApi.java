package com.jdc.accounting.api;

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
import com.jdc.accounting.service.MemberAccessService;
import com.jdc.accounting.service.MemberManagementService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/members")
public class MemberManagementApi {

	private final MemberManagementService managemetService;
	private final MemberAccessService accessService;
	
	@GetMapping
	PageResult<MemberInfo> search(MemberSearch form, 
			@RequestParam(required = false, defaultValue = "0") int page, 
			@RequestParam(required = false, defaultValue = "10") int size) {
		return managemetService.search(form, page, size);
	}
	
	@PutMapping("{id}")
	MemberInfo updateStatus(@PathVariable String id, 
			@Validated @RequestBody MemberStatusForm form, BindingResult result) {
		return managemetService.update(id, form);
	}
	
	@GetMapping("{id}")
	MemberInfo findById(@PathVariable String id) {
        return managemetService.findById(id);
    }
	
	@GetMapping("{id}/access")
	PageResult<MemberAccessInfo> searchAccessForMember(
			MemberAccessSearch form,
			@RequestParam(required = false, defaultValue = "0") int page, 
			@RequestParam(required = false, defaultValue = "10") int size) {
		return accessService.search(form, page, size);
	}
	
}
