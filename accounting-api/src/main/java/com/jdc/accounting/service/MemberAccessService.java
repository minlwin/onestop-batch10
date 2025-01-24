package com.jdc.accounting.service;

import static com.jdc.accounting.utils.EntityOperationUtils.safeCall;

import java.time.LocalDateTime;
import java.util.UUID;
import java.util.function.Function;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.accounting.api.input.MemberAccessSearch;
import com.jdc.accounting.api.output.MemberAccessInfo;
import com.jdc.accounting.api.output.PageResult;
import com.jdc.accounting.domain.consts.AccessStatus;
import com.jdc.accounting.domain.entity.MemberAccessHistory;
import com.jdc.accounting.domain.entity.MemberAccessHistory_;
import com.jdc.accounting.domain.repo.MemberAccessHistoryRepo;
import com.jdc.accounting.utils.AccessInfo;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberAccessService {
	
	private final MemberAccessHistoryRepo accessHistoryRepo;
	private final LoginMemberService loginMemberService;
	
	@Transactional(readOnly = true)
	public PageResult<MemberAccessInfo> search(MemberAccessSearch form, int page, int size) {
		return accessHistoryRepo.search(queryFunc(form), countFunc(form), page, size);
	}

	private Function<CriteriaBuilder, CriteriaQuery<MemberAccessInfo>> queryFunc(MemberAccessSearch form) {
		return cb -> {
			var cq = cb.createQuery(MemberAccessInfo.class);
			var root = cq.from(MemberAccessHistory.class);
			
			MemberAccessInfo.select(cq, root);
			cq.where(form.where(cb, root));
			
			cq.orderBy(cb.desc(root.get(MemberAccessHistory_.accessAt)));
			
			return cq;
		};
	}

	private Function<CriteriaBuilder, CriteriaQuery<Long>> countFunc(MemberAccessSearch form) {
		return cb -> {
			var cq = cb.createQuery(Long.class);
			var root = cq.from(MemberAccessHistory.class);
			cq.select(cb.count(root.get(MemberAccessHistory_.id)));
			cq.where(form.where(cb, root));
			return cq;
		};
	}

	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public UUID initiate(AccessInfo info) {
		
		var member = loginMemberService.getLoginUser();
		
		var entity = new MemberAccessHistory();
		entity.setMember(member);
		entity.setActivity(info.value());
		entity.setAccessAt(LocalDateTime.now());
		entity.setStatus(AccessStatus.Initiate);
		
		entity = accessHistoryRepo.save(entity);
		
		return entity.getId();
	}

	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void success(UUID id) {

		var entity = safeCall(accessHistoryRepo.findById(id), "Access History", id);
		entity.setStatus(AccessStatus.Success);
		entity.setEndAt(LocalDateTime.now());
	}

	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void fails(UUID id, String message) {
		var entity = safeCall(accessHistoryRepo.findById(id), "Access History", id);
		entity.setStatus(AccessStatus.Fail);
		entity.setMessage(message);
		entity.setEndAt(LocalDateTime.now());
	}

}
