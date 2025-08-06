package com.example.TuniFinance.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:4200") // Update this for production
                .allowedMethods("GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("Content-Type", "Authorization", "X-Requested-With") // Specify necessary headers
                .allowCredentials(true) // Set to false if credentials aren’t needed
                .maxAge(3600); // Cache preflight requests for 1 hour
        // .exposedHeaders("Custom-Header1", "Custom-Header2") // Uncomment if needed
    }
}
