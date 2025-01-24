package com.jdc.accounting.service;

import static com.jdc.accounting.utils.EntityOperationUtils.safeCall;

import java.time.LocalDateTime;
import java.util.UUID;
import java.util.function.Function;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.accounting.api.input.MemberSearch;
import com.jdc.accounting.api.input.MemberStatusForm;
import com.jdc.accounting.api.output.MemberInfo;
import com.jdc.accounting.api.output.PageResult;
import com.jdc.accounting.domain.entity.Member;
import com.jdc.accounting.domain.entity.Member_;
import com.jdc.accounting.domain.repo.MemberRepo;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberManagementService {
	
	private final MemberRepo repo;

	@Transactional
	public MemberInfo update(String id, MemberStatusForm form) {
		
		var member = safeCall(repo.findById(UUID.fromString(id)), "Member", id);
		
		member.setActivated(form.status());
		if(form.status()) {
			member.setActivatedAt(LocalDateTime.now());
		} else {
			member.setActivatedAt(null);
		}
		
		return MemberInfo.from(member);
	}

	@Transactional(readOnly = true)
	public MemberInfo findById(String id) {
		return safeCall(repo.findById(UUID.fromString(id))
				.map(MemberInfo::from), "Member", id);
	}

	@Transactional(readOnly = true)
	public PageResult<MemberInfo> search(MemberSearch form, int page, int size) {
		return repo.search(queryFunc(form), countFunc(form), page, size);
	}

	private Function<CriteriaBuilder, CriteriaQuery<MemberInfo>> queryFunc(MemberSearch form) {
		return cb -> {
			var cq = cb.createQuery(MemberInfo.class);
			var root = cq.from(Member.class);
			MemberInfo.select(cq, root);
			cq.where(form.where(cb, root));
			
			cq.orderBy(cb.desc(root.get(Member_.registeredAt)));
			
			return cq;
		};
	}

	private Function<CriteriaBuilder, CriteriaQuery<Long>> countFunc(MemberSearch form) {
		return cb -> {
			var cq = cb.createQuery(Long.class);
			var root = cq.from(Member.class);
			cq.select(cb.count(root));
			cq.where(form.where(cb, root));
			return cq;
		};
	}
}
