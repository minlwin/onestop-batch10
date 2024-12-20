package com.jdc.accounting.domain.repo;

import java.util.Optional;
import java.util.UUID;

import com.jdc.accounting.domain.BaseRepository;
import com.jdc.accounting.domain.entity.Account;

public interface AccountRepo extends BaseRepository<Account, UUID>{

	Optional<Account> findOneByEmail(String email);
}
