package com.jdc.accounting.domain.repo;

import com.jdc.accounting.domain.BaseRepository;
import com.jdc.accounting.domain.embeddable.LedgerEntrySeqPk;
import com.jdc.accounting.domain.entity.LedgerEntrySeq;

public interface LedgerEntrySeqRepo extends BaseRepository<LedgerEntrySeq, LedgerEntrySeqPk>{

}
