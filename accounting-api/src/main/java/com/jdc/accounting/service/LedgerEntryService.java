package com.jdc.accounting.service;

import static com.jdc.accounting.utils.EntityOperationUtils.safeCall;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.function.Function;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.accounting.api.input.LedgerEntryForm;
import com.jdc.accounting.api.input.LedgerEntryFormItem;
import com.jdc.accounting.api.input.LedgerEntrySearch;
import com.jdc.accounting.api.output.DataModificationResult;
import com.jdc.accounting.api.output.LedgerEntryInfo;
import com.jdc.accounting.api.output.PageResult;
import com.jdc.accounting.domain.consts.BalanceType;
import com.jdc.accounting.domain.embeddable.LedgerEntryItemPk;
import com.jdc.accounting.domain.embeddable.LedgerEntryPk;
import com.jdc.accounting.domain.embeddable.LedgerPk;
import com.jdc.accounting.domain.entity.LedgerEntry;
import com.jdc.accounting.domain.entity.LedgerEntryItem;
import com.jdc.accounting.domain.entity.LedgerEntry_;
import com.jdc.accounting.domain.entity.Member;
import com.jdc.accounting.domain.repo.LedgerEntryItemRepo;
import com.jdc.accounting.domain.repo.LedgerEntryRepo;
import com.jdc.accounting.domain.repo.LedgerRepo;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class LedgerEntryService {

	private final LoginMemberService memberService;
	private final LedgerEntryIdGenerator entryIdGenerator;
	private final LedgerRepo ledgerRepo;
	private final LedgerEntryRepo entryRepo;
	private final LedgerEntryItemRepo entryItemRepo;
	
	public DataModificationResult<LedgerEntryPk> create(LedgerEntryForm form) {
		
		var member = memberService.getLoginUser();
		var ledger = safeCall(ledgerRepo.findById(LedgerPk.from(member.getId(), form.ledgerCode())), "Ledger", form.ledgerCode());
		
		var entry = new LedgerEntry();
		entry.setId(entryIdGenerator.next(member.getId(), LocalDate.now()));
		entry.setLedger(ledger);
		entry.setParticular(form.particular());
		
		var lastBalance = member.getBalance().getBalance();
		var amount = form.items().stream().map(item -> item.unitPrice().multiply(BigDecimal.valueOf(item.quantity())))
				.reduce(BigDecimal.ZERO, (a, b) -> a.add(b));
		
		entry.setAmount(amount);
		entry.setLastBalance(lastBalance);
		
		entry = entryRepo.save(entry);
		
		createItems(entry, form.items());
		
		member.getBalance().setBalance(ledger.getType() == BalanceType.Credit ? lastBalance.add(amount) : lastBalance.subtract(amount));
		
		return new DataModificationResult<LedgerEntryPk>(entry.getId());
	}

	private void createItems(LedgerEntry entry, List<LedgerEntryFormItem> items) {
		
		for(var i = 0; i < items.size(); i ++) {
			var item = items.get(i);
			var entity = new LedgerEntryItem();
			entity.setId(LedgerEntryItemPk.from(entry.getId(), i + 1));
			entity.setItemName(item.itemName());
			entity.setQuantity(item.quantity());
			entity.setUnitPrice(item.unitPrice());
			entryItemRepo.save(entity);
		}
		
	}

	public DataModificationResult<LedgerEntryPk> update(String id, LedgerEntryForm form) {
		// TODO Auto-generated method stub
		return null;
	}

	@Transactional(readOnly = true)
	public PageResult<LedgerEntryInfo> search(LedgerEntrySearch search, int page, int size) {
		var member = memberService.getLoginUser();
		return entryRepo.search(queryFunc(search, member), countFunc(search, member), page, size);
	}

	private Function<CriteriaBuilder, CriteriaQuery<LedgerEntryInfo>> queryFunc(LedgerEntrySearch search, Member member) {
		
		return cb -> {
			var cq = cb.createQuery(LedgerEntryInfo.class);
			var root = cq.from(LedgerEntry.class);
			
			LedgerEntryInfo.select(cq, root);
			cq.where(search.where(cb, root, member.getId()));
			
			cq.orderBy(cb.desc(root.get(LedgerEntry_.createdAt)));
			
			return cq;
		};
	}

	private Function<CriteriaBuilder, CriteriaQuery<Long>> countFunc(LedgerEntrySearch search, Member member) {
		
		return cb -> {
			var cq = cb.createQuery(Long.class);
			var root = cq.from(LedgerEntry.class);
			cq.select(cb.count(root.get(LedgerEntry_.id)));
			cq.where(search.where(cb, root, member.getId()));
			return cq;
		};
	}
}
