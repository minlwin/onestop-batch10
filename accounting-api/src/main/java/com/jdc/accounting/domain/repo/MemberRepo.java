package com.jdc.accounting.domain.repo;

import java.util.Optional;
import java.util.UUID;

import com.jdc.accounting.domain.BaseRepository;
import com.jdc.accounting.domain.entity.Member;

public interface MemberRepo extends BaseRepository<Member, UUID>{

	Optional<Member> findOneByAccountEmail(String username);

}
