package com.jdc.accounting.utils;

import java.util.Optional;

import com.jdc.accounting.exceptions.ApiBusinessException;

public class EntityOperationUtils {

	public static<T, ID> T safeCall(Optional<T> optional, String domain, ID id) {
		return optional.orElseThrow(() -> new ApiBusinessException("There is no %s with id %s.".formatted(domain, id)));
	}
}
