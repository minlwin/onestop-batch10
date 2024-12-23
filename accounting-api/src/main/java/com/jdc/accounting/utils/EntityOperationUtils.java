package com.jdc.accounting.utils;

import java.util.Optional;

import com.jdc.accounting.exceptions.ApiBusinessException;

public class EntityOperationUtils {

	public static<T> T safeCall(Optional<T> optional, String message) {
		return optional.orElseThrow(() -> new ApiBusinessException(message));
	}
}
