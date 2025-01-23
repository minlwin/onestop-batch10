package com.jdc.accounting.api;

import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.accounting.api.input.LedgerEntryForm;
import com.jdc.accounting.api.input.LedgerEntrySearch;
import com.jdc.accounting.api.output.DataModificationResult;
import com.jdc.accounting.api.output.LedgerEntryInfo;
import com.jdc.accounting.api.output.PageResult;
import com.jdc.accounting.aspects.AccessInfo;
import com.jdc.accounting.domain.embeddable.LedgerEntryPk;
import com.jdc.accounting.service.LedgerEntryService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("entries")
public class LedgerEntryManagementApi {
	
	private final LedgerEntryService service;

	@GetMapping
	@AccessInfo("Search Ledger Entry")
	PageResult<LedgerEntryInfo> search(LedgerEntrySearch search, 
			@RequestParam(required = false, defaultValue = "0") int page, 
			@RequestParam(required = false, defaultValue = "10") int size) {
		return service.search(search, page, size);
	}
	
	@PostMapping
	@AccessInfo("Create Ledger Entry")
	DataModificationResult<LedgerEntryPk> create(
			@Validated @RequestBody LedgerEntryForm form, BindingResult result) {
		return service.create(form);
	}
	
	@PutMapping("{id}")
	@AccessInfo("Update Ledger Entry")
	DataModificationResult<LedgerEntryPk> update(@PathVariable String id,
			@Validated @RequestBody LedgerEntryForm form, BindingResult result) {
		return service.update(id, form);
	}	
}
