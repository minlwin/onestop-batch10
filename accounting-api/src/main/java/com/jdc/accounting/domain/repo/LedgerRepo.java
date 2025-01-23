package com.jdc.accounting.domain.repo;

import com.jdc.accounting.domain.BaseRepository;
import com.jdc.accounting.domain.embeddable.LedgerPk;
import com.jdc.accounting.domain.entity.Ledger;

public interface LedgerRepo extends BaseRepository<Ledger, LedgerPk>{

}
