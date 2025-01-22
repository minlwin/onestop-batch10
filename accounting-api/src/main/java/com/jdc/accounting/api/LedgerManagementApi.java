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

@RestController
@RequestMapping("ledger")
public class LedgerManagementApi {

	@GetMapping
	List<LedgerInfo> search(LedgerSearch form) {
		return null;
	}
	
	@PostMapping
	DataModificationResult<String> create(
			@Validated @RequestBody LedgerForm form, BindingResult result) {
		return null;
	}
	
	@PutMapping("{id}")
	DataModificationResult<String> update(@PathVariable String id, 
			@Validated @RequestBody LedgerForm form, BindingResult result) {
		return null;
	}
	
	@GetMapping("{id}")
	LedgerInfo findById(String id) {
		return null;
	}
}
