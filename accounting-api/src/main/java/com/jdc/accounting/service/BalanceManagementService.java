package com.jdc.accounting.service;

import org.springframework.stereotype.Service;

import com.jdc.accounting.api.input.BalanceSearch;
import com.jdc.accounting.api.output.BalanceInfo;
import com.jdc.accounting.api.output.LedgerEntryDetails;
import com.jdc.accounting.api.output.PageResult;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BalanceManagementService {
	
	public PageResult<BalanceInfo> search(BalanceSearch search, int page, int size) {
		// TODO Auto-generated method stub
		return null;
	}

	public LedgerEntryDetails findById(String id) {
		// TODO Auto-generated method stub
		return null;
	}

}
