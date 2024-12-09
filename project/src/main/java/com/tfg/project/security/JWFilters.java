package com.tfg.project.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;


import io.jsonwebtoken.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class JWFilters extends OncePerRequestFilter{
	
	@Autowired
	private TokenUtils tokenUtils = new TokenUtils();
	
	   @Override
	    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
	            throws ServletException, IOException, java.io.IOException {
	        System.out.println("Do filter" + request);
	        String bearerToken = request.getHeader("Authorization");

			System.out.println("Token do filter : "+bearerToken);
			
	        if(bearerToken !=null && bearerToken.startsWith("Bearer ")) {
	            String token = bearerToken.replace("Bearer ","");
				System.out.println("Token: " + token);
				try {
	                TokenUtils.validateToken(token);
	                System.out.println("1---"+token);
	                UsernamePasswordAuthenticationToken authentication = tokenUtils.getAuthentication(token);
	                System.out.println("2---");
	                SecurityContextHolder.getContext().setAuthentication(authentication);
	                System.out.println("3---");
	                filterChain.doFilter(request, response);
	            } catch (Exception e) {
	            	System.out.println("ERROR: " + e.getMessage());
	            	for (StackTraceElement item : e.getStackTrace()) {
	            		System.out.println("ERROR: " + item.toString());
					}
	            	
	                response.sendError(401, "Invalid token");
	            }
	        }else {
	            response.sendError(401, ALREADY_FILTERED_SUFFIX);
	        }
	    }
	

		@Override
protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
    // Permitir todas las solicitudes OPTIONS
    if (request.getMethod().equals("OPTIONS")) {
        return true;
    } else if (request.getRequestURI().equals("/api/usuario/login") && request.getMethod().equals("POST")) {
        System.out.println("/True Estás en la Request URI: " + request.getRequestURL());
        return true;
    }else if (request.getRequestURI().equals("/api/usuario/createUser") && request.getMethod().equals("POST")) {
        System.out.println("/True Estás en la Request URI: " + request.getRequestURL());
        return true;
    }else if (request.getRequestURI().startsWith("/api/img/") && request.getMethod().equals("GET")) {
        System.out.println("/True Estás en la Request URI: " + request.getRequestURL());
        return true;
    } 
	else {
        System.out.println("/False Estás en la Request URI: " + request.getRequestURL());
		return false;
    }
}

		 
			/*@Override
	 protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
		      throws ServletException, IOException, java.io.IOException {
    	System.out.println("Do filter");
    	String bearerToken = request.getHeader("Authorization");

    	if(bearerToken !=null && bearerToken.startsWith("Bearer ")) {
    		String token = bearerToken.replace("Bearer","");
    		try {
                TokenUtils.validateToken(token);
                filterChain.doFilter(request, response);
            } catch (Exception e) {
                response.sendError(401, "Invalid token");
            }    		
    	}else {
        	response.sendError(401, ALREADY_FILTERED_SUFFIX);

    	}
    	

		  }*/
}
