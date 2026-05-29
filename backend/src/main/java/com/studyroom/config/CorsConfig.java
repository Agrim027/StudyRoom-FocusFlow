package com.studyroom.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
public class CorsConfig {

    @Value("${app.frontendUrl}")
    private String frontendUrl;

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        
        // 1. Allow credentials (required for JWT authentication)
        config.setAllowCredentials(true);
        
        // 2. Allow ONLY the specified frontend domain. 
        // We strip any trailing slashes to ensure exact origin matching.
        String cleanFrontendUrl = frontendUrl != null && frontendUrl.endsWith("/") 
                ? frontendUrl.substring(0, frontendUrl.length() - 1) 
                : frontendUrl;
        config.setAllowedOrigins(Arrays.asList(cleanFrontendUrl));
        
        // 3. Ensure compatibility with Preflight OPTIONS requests and required headers
        config.setAllowedHeaders(Arrays.asList(
            "Authorization", 
            "Content-Type", 
            "Accept", 
            "Origin", 
            "X-Requested-With"
        ));
        
        // 4. Allowed Methods including OPTIONS for preflight
        config.setAllowedMethods(Arrays.asList(
            "GET", 
            "POST", 
            "PUT", 
            "DELETE", 
            "OPTIONS"
        ));
        
        // 5. Expose headers if frontend needs to read them
        config.setExposedHeaders(Arrays.asList("Authorization"));
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // 6. Apply globally to all endpoints
        source.registerCorsConfiguration("/**", config);
        
        return source;
    }
}
