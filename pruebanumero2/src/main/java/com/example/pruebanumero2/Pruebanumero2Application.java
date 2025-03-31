package com.example.pruebanumero2;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
@EnableDiscoveryClient
public class Pruebanumero2Application {

    public static void main(String[] args) {
        SpringApplication.run(Pruebanumero2Application.class, args);
    }

}
