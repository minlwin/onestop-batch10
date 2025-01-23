package com.jdc.accounting.service;

import static com.jdc.accounting.utils.EntityOperationUtils.safeCall;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.accounting.api.input.MemberSearch;
import com.jdc.accounting.api.input.MemberStatusForm;
import com.jdc.accounting.api.output.MemberInfo;
import com.jdc.accounting.domain.entity.Member;
import com.jdc.accounting.domain.entity.Member_;
import com.jdc.accounting.domain.repo.MemberRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberManagementService {
	
	private final MemberRepo repo;

	@Transactional(readOnly = true)
	public List<MemberInfo> search(MemberSearch form) {
		return repo.search(cb -> {
			var cq = cb.createQuery(MemberInfo.class);
			
			var root = cq.from(Member.class);
			MemberInfo.select(cq, root);
			cq.where(form.where(cb, root));
			
			cq.orderBy(cb.desc(root.get(Member_.registeredAt)));
			
			return cq;
		});
	}

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

}
