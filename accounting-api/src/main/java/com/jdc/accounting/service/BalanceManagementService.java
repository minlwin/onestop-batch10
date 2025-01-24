package com.jdc.accounting.service;

import static com.jdc.accounting.utils.EntityOperationUtils.safeCall;

import java.util.function.Function;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.accounting.api.input.BalanceSearch;
import com.jdc.accounting.api.output.BalanceInfo;
import com.jdc.accounting.api.output.LedgerEntryDetails;
import com.jdc.accounting.api.output.PageResult;
import com.jdc.accounting.domain.embeddable.LedgerEntryPk;
import com.jdc.accounting.domain.embeddable.LedgerEntryPk_;
import com.jdc.accounting.domain.entity.LedgerEntry;
import com.jdc.accounting.domain.entity.LedgerEntry_;
import com.jdc.accounting.domain.entity.Member;
import com.jdc.accounting.domain.repo.LedgerEntryRepo;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BalanceManagementService {
	
	private final LedgerEntryRepo entryRepo;
	private final LoginMemberService memberService;
	
	public LedgerEntryDetails findById(String id) {
		var member = memberService.getLoginUser();
		return safeCall(entryRepo.findById(LedgerEntryPk.from(member.getId(), id))
				.map(LedgerEntryDetails::from), "Ledger Entry", id);
	}

	public PageResult<BalanceInfo> search(BalanceSearch search, int page, int size) {
		var member = memberService.getLoginUser();
		return entryRepo.search(queryFunc(search, member), countFunc(search, member), page, size);
	}

	private Function<CriteriaBuilder, CriteriaQuery<BalanceInfo>> queryFunc(BalanceSearch search, Member member) {
		return cb -> {
			var cq = cb.createQuery(BalanceInfo.class);
            var root = cq.from(LedgerEntry.class);
            BalanceInfo.select(cb, cq, root);
            cq.where(search.where(cb, root, member.getId()));
            cq.orderBy(
            	cb.asc(root.get(LedgerEntry_.id).get(LedgerEntryPk_.useDate)),
                cb.asc(root.get(LedgerEntry_.id).get(LedgerEntryPk_.entryNumber))
            );
            return cq;
		};
	}

	private Function<CriteriaBuilder, CriteriaQuery<Long>> countFunc(BalanceSearch search, Member member) {
		return cb -> {
			var cq = cb.createQuery(Long.class);
            var root = cq.from(LedgerEntry.class);
            
            cq.select(cb.count(root));
            cq.where(search.where(cb, root, member.getId()));

            return cq;
		};
	}

}
