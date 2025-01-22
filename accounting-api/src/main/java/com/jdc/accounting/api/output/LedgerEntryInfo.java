package com.jdc.accounting.api.output;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import com.jdc.accounting.domain.consts.BalanceType;

public record LedgerEntryInfo(
    String id,
    BalanceType type,
    LocalDate useDate,
    LocalDateTime issueAt,
    String ledgerCode,
    String ledgerName,
    String particular,
    BigDecimal amount,
    BigDecimal lastBalance
) {}