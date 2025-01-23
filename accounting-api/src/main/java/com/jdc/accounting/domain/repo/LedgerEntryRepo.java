package com.jdc.accounting.domain.repo;

import com.jdc.accounting.domain.BaseRepository;
import com.jdc.accounting.domain.embeddable.LedgerEntryPk;
import com.jdc.accounting.domain.entity.LedgerEntry;

public interface LedgerEntryRepo extends BaseRepository<LedgerEntry, LedgerEntryPk>{

}
