package com.jdc.accounting.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.accounting.api.input.BalanceSearch;
import com.jdc.accounting.api.output.BalanceInfo;
import com.jdc.accounting.api.output.LedgerEntryDetails;
import com.jdc.accounting.api.output.PageResult;

@RestController
@RequestMapping("balance")
public class BalanceManagementApi {

	@GetMapping
	PageResult<BalanceInfo> search(BalanceSearch search, 
			@RequestParam(required = false, defaultValue = "0") int page, 
			@RequestParam(required = false, defaultValue = "10") int size) {
		return null;
	}
	
	@GetMapping("{id}")
	LedgerEntryDetails findBalanceDetails(@PathVariable String id) {
		return null;
	}
}
