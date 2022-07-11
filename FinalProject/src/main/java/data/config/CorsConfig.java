package data.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {

   @Bean
   public CorsFilter corsFilter() {
      UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
      CorsConfiguration config = new CorsConfiguration();
      config.setAllowCredentials(true);
      config.addAllowedOriginPattern("*");
      config.addAllowedHeader("*");
      config.addAllowedMethod("*");

      config.addExposedHeader("Authorization");
      source.registerCorsConfiguration("/auth/**", config);
      source.registerCorsConfiguration("/cityinfo/**", config);
      source.registerCorsConfiguration("/review/**", config);
      source.registerCorsConfiguration("/plan/**", config);
      source.registerCorsConfiguration("/member/**", config);
      source.registerCorsConfiguration("/mypage/**", config);
      source.registerCorsConfiguration("/searchauto", config);
      source.registerCorsConfiguration("/review_photo/**", config);
      
      return new CorsFilter(source);
   }

}
