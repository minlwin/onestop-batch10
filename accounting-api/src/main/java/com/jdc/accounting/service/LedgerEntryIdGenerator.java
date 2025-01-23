package com.jdc.accounting.service;

import java.time.LocalDate;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.jdc.accounting.domain.embeddable.LedgerEntryPk;
import com.jdc.accounting.domain.embeddable.LedgerEntrySeqPk;
import com.jdc.accounting.domain.entity.LedgerEntrySeq;
import com.jdc.accounting.domain.repo.LedgerEntrySeqRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LedgerEntryIdGenerator {
	
	private final LedgerEntrySeqRepo repo;
	
	public LedgerEntryPk next(UUID id, LocalDate now) {
		
		return repo.findById(LedgerEntrySeqPk.from(id, now))
			.orElseGet(() -> {
				var entity = new LedgerEntrySeq();
				entity.setId(LedgerEntrySeqPk.from(id, now));
				return repo.saveAndFlush(entity);
			}).next();
	}

}
