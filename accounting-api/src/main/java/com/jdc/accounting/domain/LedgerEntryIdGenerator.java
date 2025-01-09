package com.jdc.accounting.domain;

import static com.jdc.accounting.utils.EntityOperationUtils.safeCall;

import java.time.LocalDate;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.accounting.domain.entity.LedgerEntryPk;
import com.jdc.accounting.domain.entity.LedgerEntrySeq;
import com.jdc.accounting.domain.entity.LedgerEntrySeqPk;
import com.jdc.accounting.domain.repo.LedgerEntrySeqRepo;
import com.jdc.accounting.domain.repo.MemberRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LedgerEntryIdGenerator {
	
	private final LedgerEntrySeqRepo seqRepo;
	private final MemberRepo memberRepo;

	@PreAuthorize(value = "hasAuthority('Member')")
	@Transactional(isolation = Isolation.SERIALIZABLE, propagation = Propagation.REQUIRES_NEW)
	public LedgerEntryPk next(LocalDate date) {
		
		var username = SecurityContextHolder.getContext().getAuthentication().getName();
		var member = safeCall(memberRepo.findOneByAccountEmail(username), "Member", username);
		
		var seqId = new LedgerEntrySeqPk();
		seqId.setMemberId(member.getId());
		seqId.setIssueAt(date);
		
		var seq = seqRepo.findById(seqId).orElseGet(() -> {
			var entity = new LedgerEntrySeq();
			entity.setId(seqId);
			return seqRepo.save(entity);
		});
		
		return seq.next();
	}
}
