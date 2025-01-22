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

@RestController
@RequestMapping("entries")
public class LedgerEntryManagementApi {

	@GetMapping
	PageResult<LedgerEntryInfo> search(LedgerEntrySearch search, 
			@RequestParam(required = false, defaultValue = "0") int page, 
			@RequestParam(required = false, defaultValue = "10") int size) {
		return null;
	}
	
	@PostMapping
	DataModificationResult<?> create(
			@Validated @RequestBody LedgerEntryForm form, BindingResult result) {
		return null;
	}
	
	@PutMapping("{id}")
	DataModificationResult<?> update(@PathVariable String id,
			@Validated @RequestBody LedgerEntryForm form, BindingResult result) {
		return null;
	}	
}
