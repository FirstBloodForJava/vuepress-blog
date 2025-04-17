# spring-kafka



## SpringBoot快速使用Kafka

添加依赖：

~~~xml
<dependency>
  <groupId>org.springframework.kafka</groupId>
  <artifactId>spring-kafka</artifactId>
</dependency>

~~~



~~~java
@Bean
CommandLineRunner myCommandLineRunner(CustomerRepository repository) {
    return (String... args) -> {
        // 向kafka发送消息
        template.send("org.test1", "foo1");
        template.send("org.test1", "foo2");
        template.send("org.test1", "foo3");
        // 等待直到 超时或计数器为0
        latch.await(60, TimeUnit.SECONDS);
        log.info("All received");
    };
}

// 消费者
@KafkaListener(topics = "org.test1")
public void listen(ConsumerRecord<?, ?> cr) throws Exception {
    log.info("consumer: " + cr.toString());
    latch.countDown();
}

~~~

springboot配置：

~~~yaml
spring:
  kafka:
    bootstrapServers: 47.101.155.205:9092
    consumer:
      group-id: spring-kafka
      auto-offset-reset: earliest

~~~

