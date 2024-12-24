package com.jdc.accounting.security;

import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.stream.Collectors;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import com.jdc.accounting.exceptions.InvalidTokenException;
import com.jdc.accounting.exceptions.TokenExpirationForAccessException;
import com.jdc.accounting.exceptions.TokenExpirationForRefreshException;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;

@Service
public class SecurityTokenProvider {

	public enum Type {
		Access, Refresh
	}

	@Value("${app.token.issuer}")
	private String issuer;
	@Value("${app.token.access}")
	private int access;
	@Value("${app.token.refresh}")
	private int refresh;

	private static final SecretKey secret = Jwts.SIG.HS512.key().build();

	public String generate(Type type, Authentication authentication) {

		Date issueAt = new Date();

		return Jwts.builder().issuer(issuer).issuedAt(issueAt).expiration(getExpiration(type, issueAt))
				.subject(authentication.getName()).claim("type", type.name()).claim("rol", authentication
						.getAuthorities().stream().map(a -> a.getAuthority()).collect(Collectors.joining(",")))
				.signWith(secret).compact();
	}

	public Authentication parse(Type type, String token) {

		try {
			var jws = Jwts.parser().requireIssuer(issuer)
					.require("type", type.name())
					.verifyWith(secret).build()
					.parseSignedClaims(token);

			var username = jws.getPayload().getSubject();
			var role = jws.getPayload().get("rol", String.class);
			var authorities = Arrays.stream(role.split(",")).map(a -> new SimpleGrantedAuthority(a)).toList();

			return UsernamePasswordAuthenticationToken.authenticated(username, null, authorities);
		} catch (ExpiredJwtException e) {
			throw type == Type.Access ? new TokenExpirationForAccessException() : 
				new TokenExpirationForRefreshException();
		} catch (JwtException e) {
			throw new InvalidTokenException();
		}

	}

	private Date getExpiration(Type type, Date issueAt) {
		var calendar = Calendar.getInstance();
		calendar.setTime(issueAt);
		calendar.add(Calendar.MINUTE, type == Type.Access ? access : refresh);
		return calendar.getTime();
	}

}
