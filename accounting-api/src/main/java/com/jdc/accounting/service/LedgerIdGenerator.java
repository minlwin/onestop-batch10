package com.jdc.accounting.service;

import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.accounting.domain.embeddable.LedgerPk;
import com.jdc.accounting.domain.entity.LedgerSeq;
import com.jdc.accounting.domain.repo.LedgerSeqRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LedgerIdGenerator {
	
	private final LedgerSeqRepo seqRepo;
	
	@Transactional(propagation = Propagation.REQUIRES_NEW, isolation = Isolation.SERIALIZABLE)
	public LedgerPk next(UUID id) {
		
		return seqRepo.findById(id).orElseGet(() -> {
			var newSeq = new LedgerSeq();
			newSeq.setMemberId(id);
			return seqRepo.saveAndFlush(newSeq);
		}).next();
	}

}
