package com.jdc.accounting.service;

import static com.jdc.accounting.utils.EntityOperationUtils.safeCall;

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
import com.jdc.accounting.exceptions.ApiBusinessException;

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
		
		var amount = form.getAmount();
		var lastBalance = member.getBalance().getBalance();
		
		entry.setAmount(amount);
		entry.setLastBalance(lastBalance);
		
		entry = entryRepo.save(entry);
		
		createItems(entry, form.items());
		
		member.getBalance().setBalance(entry.getBalance());
		
		return new DataModificationResult<LedgerEntryPk>(entry.getId());
	}

	public DataModificationResult<LedgerEntryPk> update(String code, LedgerEntryForm form) {
		
		if(!LedgerEntryPk.canUpdate(code)) {
			throw new ApiBusinessException("You can't update old data.");
		}
		
		var member = memberService.getLoginUser();
		var ledger = safeCall(ledgerRepo.findById(LedgerPk.from(member.getId(), form.ledgerCode())), "Ledger", form.ledgerCode());

		var pk = LedgerEntryPk.from(member.getId(), code);
		
		var entry = safeCall(entryRepo.findById(pk), "Ledger Entry", code);
		entry.setLedger(ledger);
		entry.setParticular(form.particular());
		entry.setAmount(form.getAmount());
		
		entry.getItems().clear();
		createItems(entry, form.items());
		
		var balance = entry.getBalance();
		
		var nextEntries = getNextEntries(pk);
		
		for(var next : nextEntries) {
			next.setLastBalance(balance);
			balance = next.getBalance();
		}
		
		entry.getMember().getBalance().setBalance(balance);

		return new DataModificationResult<LedgerEntryPk>(entry.getId());
	}

	private List<LedgerEntry> getNextEntries(LedgerEntryPk pk) {
		// TODO Auto-generated method stub
		return null;
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
