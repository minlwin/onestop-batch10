package com.jdc.accounting.service;

import static com.jdc.accounting.utils.EntityOperationUtils.safeCall;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.accounting.api.input.LedgerForm;
import com.jdc.accounting.api.input.LedgerSearch;
import com.jdc.accounting.api.output.DataModificationResult;
import com.jdc.accounting.api.output.LedgerInfo;
import com.jdc.accounting.domain.embeddable.LedgerPk;
import com.jdc.accounting.domain.entity.Ledger;
import com.jdc.accounting.domain.repo.LedgerRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class LedgerManagementService {
	
	private final LoginMemberService loginMemberService;
	private final LedgerIdGenerator idGenerator;
	private final LedgerRepo ledgerRepo;
	
	@Transactional
	public DataModificationResult<LedgerPk> create(LedgerForm form) {
		
		var member = loginMemberService.getLoginUser();

		var entity = form.entity();
		entity.setId(idGenerator.next(member.getId()));
		entity.setMember(member);
		entity = ledgerRepo.save(entity);
		
		return new DataModificationResult<>(entity.getId());
	}

	@Transactional
	public DataModificationResult<LedgerPk> update(String id, LedgerForm form) {
		
		var entity = safeCall(ledgerRepo.findById(getLedgerId(id)), "Ledger", id);
		entity.setType(form.type());
		entity.setName(form.name());
		entity.setDescription(form.description());
		
		return new DataModificationResult<>(entity.getId());
	}

	public LedgerInfo findById(String id) {
		return safeCall(ledgerRepo.findById(getLedgerId(id))
				.map(LedgerInfo::from)
				, "Ledger", id);
	}
	
	public List<LedgerInfo> search(LedgerSearch form) {
		
		var member = loginMemberService.getLoginUser();
		
		return ledgerRepo.search(cb -> {
			var cq = cb.createQuery(LedgerInfo.class);
			var root = cq.from(Ledger.class);
			LedgerInfo.select(cq, root);
			cq.where(form.where(cb, root, member.getId()));
			return cq;
		});
	}

	private LedgerPk getLedgerId(String id) {
		var member = loginMemberService.getLoginUser();
		return LedgerPk.from(member.getId(), id);
	}


}
