package com.jdc.accounting.api.output;

import java.util.ArrayList;
import java.util.List;

public record PageResult<T>(
		List<T> contents,
		long totalItems,
		int size,
		int currentPage) {

	public int getTotalPages() {
		return (int) Math.ceil((double) totalItems / size);
	}
	
	public Integer[] getLinks() {
		
		var lastPage = getTotalPages() - 1;
		
		var links = new ArrayList<Integer>();
		links.add(currentPage);
		
		while (links.size() < 3 && links.getFirst() > 0) {
			links.addFirst(links.getFirst() - 1);
		}
		
		while (links.size() < 5 && links.getLast() < lastPage) {
			links.add(links.getLast() + 1);
		}
		
		while (links.size() < 5 && links.getFirst() > 0) {
			links.addFirst(links.getFirst() - 1);
		}

		return links.toArray(size -> new Integer[size]);
	}
}
