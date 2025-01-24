package com.jdc.accounting.events;

public record AccessEvent(String email, AccessType type) {

	public enum AccessType {
		Generate("Generate Tokens"), 
		Refresh("Refresh Tokens"), 
		SignUp("Sign Up");
		
		private String action;
		
		private AccessType(String action) {
			this.action = action;
		}
		
		public String getAction() {
			return action;
		}
	}
}
