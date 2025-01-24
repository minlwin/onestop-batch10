package com.jdc.accounting.api;

import java.util.List;

import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.accounting.api.input.LedgerForm;
import com.jdc.accounting.api.input.LedgerSearch;
import com.jdc.accounting.api.output.DataModificationResult;
import com.jdc.accounting.api.output.LedgerInfo;
import com.jdc.accounting.domain.embeddable.LedgerPk;
import com.jdc.accounting.service.LedgerManagementService;
import com.jdc.accounting.utils.AccessInfo;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("ledger")
public class LedgerManagementApi {
	
	private final LedgerManagementService service;

	@GetMapping
	@AccessInfo("Search Ledger")
	List<LedgerInfo> search(LedgerSearch form) {
		return service.search(form);
	}
	
	@PostMapping
	@AccessInfo("Create Ledger")
	DataModificationResult<LedgerPk> create(
			@Validated @RequestBody LedgerForm form, BindingResult result) {
		return service.create(form);
	}
	
	@PutMapping("{id}")
	@AccessInfo("Update Ledger")
	DataModificationResult<LedgerPk> update(@PathVariable String id, 
			@Validated @RequestBody LedgerForm form, BindingResult result) {
		return service.update(id, form);
	}
	
	@GetMapping("{id}")
	@AccessInfo("Find Ledger by id")
	LedgerInfo findById(@PathVariable String id) {
		return service.findById(id);
	}
}
