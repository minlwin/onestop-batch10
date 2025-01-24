package com.jdc.accounting.events;

import static com.jdc.accounting.utils.EntityOperationUtils.safeCall;

import java.time.LocalDateTime;

import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.accounting.domain.consts.AccessStatus;
import com.jdc.accounting.domain.entity.MemberAccessHistory;
import com.jdc.accounting.domain.repo.MemberAccessHistoryRepo;
import com.jdc.accounting.domain.repo.MemberRepo;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AccessEventListener {

	private final MemberRepo memberRepo;
	private final MemberAccessHistoryRepo accessHistoryRepo;
	
	@Async
	@EventListener
	@Transactional
	public void handle(AccessEvent event) {
		var member = safeCall(memberRepo.findOneByAccountEmail(event.email()), "Member", event.email());
		var history = new MemberAccessHistory();
		history.setMember(member);
		history.setActivity(event.type().getAction());
		history.setAccessAt(LocalDateTime.now());
		history.setEndAt(LocalDateTime.now());
		history.setStatus(AccessStatus.Success);
		accessHistoryRepo.save(history);
	}
}
