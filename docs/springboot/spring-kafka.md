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



## Spring-Kafka



### 1.Topic

在Spring的上下文中添加`KafkaAdmin` Bean，可以通过定义`NewTopic` Bean创建Topic。

**SpringBoot应用自动注册KafkaAdmin Bean。**

可以通过`spring.kafka.admin.failFast=true/false`配置是否快速失败，当Kafka Broker不可用时。

**使用Bean创建Topic：**

~~~java
@Bean
public KafkaAdmin admin() {
    Map<String, Object> configs = new HashMap<>();
    configs.put(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG, ...);
    return new KafkaAdmin(configs);
}

@Bean
public NewTopic topic1() {
    return TopicBuilder.name("thing1")
            .partitions(10)
            .replicas(3)
            .compact()
            .build();
}

@Bean
public NewTopic topic2() {
    return TopicBuilder.name("thing2")
            .partitions(10)
            .replicas(3)
            .config(TopicConfig.COMPRESSION_TYPE_CONFIG, "zstd")
            .build();
}

@Bean
public NewTopic topic3() {
    return TopicBuilder.name("thing3")
            .assignReplicas(0, Arrays.asList(0, 1))
            .assignReplicas(1, Arrays.asList(1, 2))
            .assignReplicas(2, Arrays.asList(2, 0))
            .config(TopicConfig.COMPRESSION_TYPE_CONFIG, "zstd")
            .build();
}

~~~



### 2.发送消息



#### KafkaTemplate

API支持添加时间戳作为参数存储在记录中。时间戳是否使用在于Kafka主题的Topic配置，如果设置为`CreateTime`，则会使用消息的时间戳(未设置则自动生成)。配置为`LogAppendTime`则忽略消息的时间戳，使用日志追加时间。



**自定义创建KafkaTempalate方式：**

~~~java
@Bean
public ProducerFactory<Integer, String> producerFactory() {
    return new DefaultKafkaProducerFactory<>(producerConfigs());
}

@Bean
public Map<String, Object> producerConfigs() {
    Map<String, Object> props = new HashMap<>();
    props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
    props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
    props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
    // See https://kafka.apache.org/documentation/#producerconfigs for more properties
    return props;
}

@Bean
public KafkaTemplate<Integer, String> kafkaTemplate() {
    return new KafkaTemplate<Integer, String>(producerFactory());
}

~~~



发送消息回调机制，默认Template配置ProducerListener实现LoggingProducerListener，在发送失败时记录日志。

如果需要阻塞发送线程等待结果，可以调用Feature.get()方法。

**非阻塞等待：**

~~~java
public void sendToKafka(final Data data) {
    final ProducerRecord<String, String> record = createRecord(data);

    ListenableFuture<SendResult<Integer, String>> future = template.send(record);
    future.addCallback(new ListenableFutureCallback<SendResult<Integer, String>>() {

        @Override
        public void onSuccess(SendResult<Integer, String> result) {
            handleSuccess(data);
        }

        @Override
        public void onFailure(Throwable ex) {
            handleFailure(data, record, ex);
        }

    });
}

~~~

**阻塞等待：**

~~~java
public void sendToKafka(final Data data) {
    final ProducerRecord<String, String> record = createRecord(data);

    try {
        template.send(record).get(10, TimeUnit.SECONDS);
        handleSuccess(data);
    }
    catch (ExecutionException e) {
        handleFailure(data, record, e.getCause());
    }
    catch (TimeoutException | InterruptedException e) {
        handleFailure(data, record, e);
    }
}

~~~



#### DefaultKafkaProducerFactory

DefaultKafkaProducerFactory是ProducerFactory实现，用于创建生产者。

当不适用事务的情况下，DefaultKafkaProducerFactory为所有的线程提供单例生产者。工厂新增属性producerPerThread=true时，支持通过ThreadLocal为每个线程创建一个当都的生产者。

**producerPerThread=true时，不再需要生产者时，需要调用closeThreadBoundProducer()关闭连接，清空缓存。**



通过构造方法设置Key/Value的序列化方式：

~~~java
@Bean
public ProducerFactory<Integer, CustomValue> producerFactory() {
    return new DefaultKafkaProducerFactory<>(producerConfigs(), null, () -> new CustomValueSerializer());
}

@Bean
public KafkaTemplate<Integer, CustomValue> kafkaTemplate() {
    return new KafkaTemplate<Integer, CustomValue>(producerFactory());
}

~~~



#### ReplyingKafkaTemplate

ReplyingKafkaOperations接口提供了两个方法：

~~~java
public interface ReplyingKafkaOperations<K, V, R> {

	// 发送消息，并等待默认时间(默认5s)的响应
	RequestReplyFuture<K, V, R> sendAndReceive(ProducerRecord<K, V> record);

	
	RequestReplyFuture<K, V, R> sendAndReceive(ProducerRecord<K, V> record, @Nullable Duration replyTimeout);

}

~~~

请求+应答模式，生产者将消息发送到Kafka，消费者消费后，将消息推送另外的topic；生产者可以等待消费者推送的消息。

**如果生产者中配置的消费者的方法存在返回值，默认会导致启动失败。**

::: tabs

@tab 生产者

配置：

~~~java
// 创建Kafka消费者
@Bean
public ConcurrentMessageListenerContainer<String, String> repliesContainer(
    ConcurrentKafkaListenerContainerFactory<String, String> containerFactory) {
    ConcurrentMessageListenerContainer<String, String> repliesContainer =
        containerFactory.createContainer("reply");
    repliesContainer.getContainerProperties().setGroupId("replyGroup");
    repliesContainer.setAutoStartup(false);
    return repliesContainer;
}

// 创建 ReplyingKafkaTemplate
@Bean
public ReplyingKafkaTemplate<String, String, String> replyingTemplate(
            ProducerFactory<String, String> pf,
            ConcurrentMessageListenerContainer<String, String> repliesContainer) {
    ReplyingKafkaTemplate<String, String, String> replyTemplate = new ReplyingKafkaTemplate<>(pf, repliesContainer);
    // 覆盖默认的超时时间
    replyTemplate.setDefaultReplyTimeout(Duration.ofSeconds(30));
    return replyTemplate;
}

~~~

发送消息并等待：

~~~java
@Service
public class ReplyKafkaService {
    private static final Logger logger = LoggerFactory.getLogger(ReplyKafkaService.class);
    private final ReplyingKafkaTemplate<String, String, String> replyingKafkaTemplate;

    public ReplyKafkaService(ReplyingKafkaTemplate<String, String, String> replyingKafkaTemplate) {
        this.replyingKafkaTemplate = replyingKafkaTemplate;
    }

    public String sendAndReceive(String message) throws Exception{

        // 创建消息
        ProducerRecord<String, String> record = new ProducerRecord<>("request", message);

        // todo 可以去掉 两个头，这个会根据发送者的配置自动添加
        // 添加回复的主题
        record.headers().add(new RecordHeader(KafkaHeaders.REPLY_TOPIC, "reply".getBytes()));
        // 关联id
        record.headers().add(new RecordHeader(KafkaHeaders.CORRELATION_ID, record.value().getBytes()));

        // 发送
        RequestReplyFuture<String, String, String> replyFuture = replyingKafkaTemplate.sendAndReceive(record);

        // 获取发送结果
        SendResult<String, String> sendResult = replyFuture.getSendFuture().get(10, TimeUnit.SECONDS);
        logger.info("Sent ok: " + sendResult.getRecordMetadata());
        logger.info("Sent json: " + JsonUtils.objToString(sendResult.getRecordMetadata()));

        // 获取回答结果
        ConsumerRecord<String, String> consumerRecord = replyFuture.get(10, TimeUnit.SECONDS);
        logger.info("Return value: " + consumerRecord.value());

        return consumerRecord.value();
    }

}

~~~



@tab 消费者

~~~java
@KafkaListener(topics = "request")
@SendTo
public String listen(String in) {
    logger.info("request: message: {}", in);
    return in.toUpperCase();
}

~~~

:::

#### AggregatingReplyingKafkaTemplate

https://www.enterpriseintegrationpatterns.com/patterns/messaging/BroadcastAggregate.html



### 3.接收消息

可以通过`MessageListenerContainer`配置消息监听器或`@KafkaListener`注解来消费消息。

消息监听器类型：超类(GenericMessageListener)

1. MessageListener：接收对象是`ConsumerRecord`类型。自动提交
2. AcknowledgingMessageListener：接收对象是`ConsumerRecord`类型。手动提交
3. ConsumerAwareMessageListener：接收对象是`ConsumerRecord`类型。自动提交，可访问Consumer对象
4. AcknowledgingConsumerAwareMessageListener：接收对象是`ConsumerRecord`类型。手动提交，可访问Consumer对象
5. BatchMessageListener：接收对象是List\<ConsumerRecord\>类型。
6. BatchAcknowledgingMessageListener:接收对象是List\<ConsumerRecord\>类型。
7. BatchConsumerAwareMessageListener:接收对象是List\<ConsumerRecord\>类型。
8. BatchAcknowledgingConsumerAwareMessageListener：接收对象是List\<ConsumerRecord\>类型。



#### MessageListenerContainer

提供了两个实现：

- KafkaMessageListenerContainer：在单个线程处理上处理所有消息。
- ConcurrentMessageListenerContainer：委托给一个或多个KafkaMessageListenerContainer多线程处理消息。

**可以往监听器容器中添加RecordInterceptor，这个会在调用监听器之前调用，可以检查或修改recore。**



**KafkaMessageListenerContainer：**

~~~java
// 准备监听器容器的配置
ContainerProperties containerProps = new ContainerProperties("topic1", "topic2");
containerProps.setMessageListener(new MessageListener<Integer, String>() {
    // 消息监听器逻辑
});
// 默认的消费者工厂(可配置反序列化器)
DefaultKafkaConsumerFactory<Integer, String> cf =
                        new DefaultKafkaConsumerFactory<>(consumerProps());
KafkaMessageListenerContainer<Integer, String> container =
                        new KafkaMessageListenerContainer<>(cf, containerProps);
return container;

~~~



**ConcurrentMessageListenerContainer：**

~~~java
public ConcurrentMessageListenerContainer(ConsumerFactory<? super K, ? super V> consumerFactory,
			ContainerProperties containerProperties) {
    super(consumerFactory, containerProperties);
    Assert.notNull(consumerFactory, "A ConsumerFactory must be provided");
}

~~~

`concurrency`可以配置KafkaMessageListenerContainer实例数量。

**文档说法：concurrency=15，3个Topic，Topic分区为5，只会有5个活跃消费者。因为使用RoundRobinAssignor分配策略。**

配置消费者分区策略：

~~~properties
spring.kafka.consumer.properties.partition.assignment.strategy=org.apache.kafka.clients.consumer.RoundRobinAssignor

~~~





**偏移量提交：**

`enable.auto.commit=true`则Kafka消费者自动提交偏移量。

**2.3版本之前enable.auto.commit默认true，之后则默认false。**

false的确认默认模式(AckMode)：

1. RECORD：监听器处理完消息提交。
2. BATCH：当poll()返回的所有记录都处理完成提交。
3. TIME：当poll()返回的所有记录都处理完成，并超过上一次ackTime时间。
4. COUNT：当poll()返回的所有记录都处理完成，并超过一定数量。
5. COUNT_TIME：TIME或COUNT任意满足则提交。
6. MANUAL：使用Acknowledgment手动提交。
7. MANUAL_IMMEDIATE：调用Acknowledgment.acknowledge()后立即提交。



**syncCommits属性设置是否同步提交，默认为true。**



监听器容器实现了SmartLifecycle，而且autoStartup默认true。优先级配置为Integer.MAX_VALUE - 100。



#### @KafkaListener

使用该主机需要创建一个KafkaListenerContainerFactory工厂，实现ConcurrentKafkaListenerContainerFactory。



**KafkaUtils.getConsumerGroupId()在监听器线程，能获取当前消费者组名称。**

**消费者线程名称规则：[pre]i-C-j。**



支持SPEL表达式，并且可以覆盖容器工厂的autoStartup(自动启动)、concurrency(并发数)配置。

~~~java
@KafkaListener(id = "myListener", topics = "myTopic",
        autoStartup = "${listen.auto.start:true}", concurrency = "${listen.concurrency:3}")
public void listen(String data) {
   	
}

~~~

显示指定Topic和分区：

**TopicPartition的partitions和partitionOffsets不能同时配置。**

~~~java
@KafkaListener(id = "thing2", topicPartitions =
        { @TopicPartition(topic = "topic1", partitions = { "0", "1" }),
          @TopicPartition(topic = "topic2", partitions = "0",
             partitionOffsets = @PartitionOffset(partition = "1", initialOffset = "100"))
        })
public void listen(ConsumerRecord<?, ?> record) {
    
}

~~~

指定监听器工厂，设置手动提交偏移量：

~~~java
@KafkaListener(id = "cat", topics = "myTopic",
          containerFactory = "kafkaManualAckListenerContainerFactory")
public void listen(String data, Acknowledgment ack) {
    // 手动提交偏移量
    ack.acknowledge();
}

~~~

获取消息的元数据，消息头中获取：

- KafkaHeaders.OFFSET(kafka_offset)：分区偏移量。
- KafkaHeaders.RECEIVED_MESSAGE_KEY(kafka_receivedMessageKey)：
- KafkaHeaders.RECEIVED_TOPIC(kafka_receivedTopic)：
- KafkaHeaders.RECEIVED_PARTITION_ID(kafka_receivedPartitionId)：接收消息的分区
- KafkaHeaders.RECEIVED_TIMESTAMP(kafka_receivedTimestamp)：
- KafkaHeaders.TIMESTAMP_TYPE(kafka_timestampType)：

获取消息后的方式：

~~~java
@KafkaListener(id = "qux", topicPattern = "myTopic1")
public void listen(@Payload String foo,
        @Header(KafkaHeaders.RECEIVED_MESSAGE_KEY) Integer key,
        @Header(KafkaHeaders.RECEIVED_PARTITION_ID) int partition,
        @Header(KafkaHeaders.RECEIVED_TOPIC) String topic,
        @Header(KafkaHeaders.RECEIVED_TIMESTAMP) long ts
        ) {
	
}

~~~



##### 批量监听

batchListener 属性设为true。


~~~java
@Bean
public KafkaListenerContainerFactory<?, ?> batchFactory() {
    ConcurrentKafkaListenerContainerFactory<Integer, String> factory =
            new ConcurrentKafkaListenerContainerFactory<>();
    factory.setConsumerFactory(consumerFactory());
    // 监听器工厂批量监听打开
    factory.setBatchListener(true); 
    return factory;
}

~~~

~~~java
@KafkaListener(id = "list", topics = "myTopic", containerFactory = "batchFactory")
public void listen(List<String> list) {
    
}

@KafkaListener(id = "list", topics = "myTopic", containerFactory = "batchFactory")
public void listen(List<String> list,
        @Header(KafkaHeaders.RECEIVED_MESSAGE_KEY) List<Integer> keys,
        @Header(KafkaHeaders.RECEIVED_PARTITION_ID) List<Integer> partitions,
        @Header(KafkaHeaders.RECEIVED_TOPIC) List<String> topics,
        @Header(KafkaHeaders.OFFSET) List<Long> offsets) {
    
}

~~~

Message接收消息：

~~~java
@KafkaListener(id = "listMsg", topics = "myTopic", containerFactory = "batchFactory")
public void listen14(List<Message<?>> list) {
    ...
}

@KafkaListener(id = "listMsgAck", topics = "myTopic", containerFactory = "batchFactory")
public void listen15(List<Message<?>> list, Acknowledgment ack) {
    
}

@KafkaListener(id = "listMsgAckConsumer", topics = "myTopic", containerFactory = "batchFactory")
public void listen16(List<Message<?>> list, Acknowledgment ack, Consumer<?, ?> consumer) {
    
}

~~~

接收原始消息对象：

~~~java
@KafkaListener(id = "pollResults", topics = "myTopic", containerFactory = "batchFactory")
public void pollResults(ConsumerRecords<?, ?> records) {
    
}

~~~



##### 注解属性

1. id：属性存在则作为消费者的group.id配置。除非设置idIsGroup为false或设置groupId值。
2. properties：覆盖工厂具有相同名称的任何属性，不能以这种方式指定group.id和client.id。





##### 在类上使用

~~~java
@KafkaListener(id = "multi", topics = "myTopic")
static class MultiListenerBean {

    @KafkaHandler
    public void listen(String foo) {
        ...
    }

    @KafkaHandler
    public void listen(Integer bar) {
        ...
    }

    @KafkaHandler(isDefault = true`)
    public void listenDefault(Object object) {
        ...
    }

}

~~~



##### 生命周期

关闭自动启动：

~~~java
@KafkaListener(id = "myContainer", topics = "myTopic", autoStartup = "false")
public void listen(ConsumerRecords<?, ?> records) {

}

~~~

通过KafkaListenerEndpointRegistry启动监听器容器：

~~~java
@Autowired
private KafkaListenerEndpointRegistry registry;

// 获取监听器容器，启动
this.registry.getListenerContainer("myContainer").start();


~~~



##### 重平衡

ContainerProperties(父类)有consumerRebalanceListener属性，ConsumerRebalanceListener类型。



##### 消息转发@SendTo

转发消息的方式：

1. 转发到指定的Topic。
2. 转发到应用上下文配置的Topic。
3. 解析转发。
   1. request：表示ConsumerRecord对象。
   2. source：表示Message对象。
   3. result：表示方法的结果。
4. 根据消息头kafka_replyTopic转发。



~~~java
// 3.request表示ConsumerRecord对象
@KafkaListener(topics = "annotated21")
@SendTo("!{request.value()}")
public String replyingListener(String in) {
    
}

// 2.应用程序配置的Topic
@KafkaListener(topics = "${some.property:annotated22}")
@SendTo("#{myBean.replyTopic}")
public Collection<String> replyingBatchListener(List<String> in) {
	
}

// 1.
@KafkaListener(topics = "annotated23", errorHandler = "replyErrorHandler")
@SendTo("annotated23reply")
public String replyingListenerWithErrorHandler(String in) {
	
}

@KafkaListener(topics = "annotated25")
@SendTo("annotated25reply1")
public class MultiListenerSendTo {

    @KafkaHandler
    public String foo(String in) {
        ...
    }

    @KafkaHandler
    @SendTo("!{'annotated25reply2'}")
    public String bar(@Payload(required = false) KafkaNull nul,
            @Header(KafkaHeaders.RECEIVED_MESSAGE_KEY) int key) {
        ...
    }

}

~~~

配置ReplyHeadersConfigurer，是否把原有的头复制：

~~~java
@Bean
public ConcurrentKafkaListenerContainerFactory<Integer, String> kafkaListenerContainerFactory() {
    ConcurrentKafkaListenerContainerFactory<Integer, String> factory =
        new ConcurrentKafkaListenerContainerFactory<>();
    factory.setConsumerFactory(cf());
    factory.setReplyTemplate(template());
    factory.setReplyHeadersConfigurer((k, v) -> k.equals("cat"));
    return factory;
}

// 配置添加头
@Bean
public ConcurrentKafkaListenerContainerFactory<Integer, String> kafkaListenerContainerFactory() {
    ConcurrentKafkaListenerContainerFactory<Integer, String> factory =
        new ConcurrentKafkaListenerContainerFactory<>();
    factory.setConsumerFactory(cf());
    factory.setReplyTemplate(template());
    factory.setReplyHeadersConfigurer(new ReplyHeadersConfigurer() {

      @Override
      public boolean shouldCopy(String headerName, Object headerValue) {
        return false;
      }

      @Override
      public Map<String, Object> additionalHeaders() {
        return Collections.singletonMap("qux", "fiz");
      }

    });
    return factory;
}

~~~



##### 过滤消息

https://www.enterpriseintegrationpatterns.com/patterns/messaging/IdempotentReceiver.html

RecordFilterStrategy类实现过滤，保证幂等性。

FilteringMessageListenerAdapter

FilteringBatchMessageListenerAdapter



##### 重试机制

https://github.com/spring-projects/spring-retry

监听器引发了异常，会调用配置的错误处理程序。



### 4.应用事件

1. ConsumerStartingEvent：消费者线程首次启用，在开始poll之前发布。
2. ConsumerStartedEvent：消费者开始poll数据发布。
3. ConsumerFailedToStartEvent：在配置consumerStartTimout(默认30s)时间，没有发布ConsumerStartingEvent事件，发布。
4. ListenerContainerIdleEvent：配置idleEventInterval时间没有收到消息发布。
5. NonResponsiveConsumerEvent：消费者poll数据没有响应，疑似Broker down。
6. ConsumerPausedEvent：容器暂停时由每个消费者发布。
7. ConsumerResumedEvent：容器恢复时由每个消费者发布。
8. ConsumerStoppingEvent：由每个消费者停止之前发布。
9. ConsumerStoppedEvent：消费者被关闭后发布。线程资源处理。
10. ContainerStoppedEvent：容器停止时发布。



**Micrometer存在claapath上，并且上下文中存在MeterRegistry。**

Timer名称spring.kafka.listener中有以下标签：

- name：容器bean的名称。
- result：success/failure
- exception：null/ListenerExecutionFailedException 异常

可以通过ContainerProperties属性micrometerTags维护其它标签。



### 5.事务

https://www.confluent.io/blog/transactions-apache-kafka/

0.11.0.0客户端开始支持事务。spring-kafka通过以下方式支持事务：

- KafkaTransactionManager：与常规的Spring事务一起使用，例如@Transaction，TransactionTemplate。
- 事务容器KafkaMessageListenerContainer。
- KafkaTemplate使用本地事务。

事务是通过向`DefaultKafkaProducerFactory`提供一个属性`transactionIdPrefix`来启用的。启用时，工厂不是管理单例生产者，而是维护事务性生产者的缓存。当用户在生产者上调用close()时，它被返回到缓存中以供重用，而不是实际关闭。事务。每个生产者的`transactional.id`属性为`transactionIdPrefix + n`，其中n从0开始，并随着每个新的生产者而增加。除非事务是由具有基于记录的侦听器的侦听器容器启动的。在这种情况下，事务性的id为`transactionIdPrefix.[group.id].[topic].[partition]`，这是为了正确地支持击剑僵尸，这个新行为是在1.3.7、2.0.6、2.1.10和2.2.0版本中添加的。如果您希望恢复到以前的行为，可以将DefaultKafkaProducerFactory上的producerPerConsumerPartition属性设置为false。



**KafkaTransactionManager**是Spring框架PlatformTransactionManager实现。

~~~java
@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Bean
    public ApplicationRunner runner(KafkaTemplate<String, String> template) {
        return args -> template.executeInTransaction(t -> t.send("topic1", "test"));
    }

    @Bean
    public ChainedKafkaTransactionManager<Object, Object> chainedTm(
            KafkaTransactionManager<String, String> ktm,
            DataSourceTransactionManager dstm) {

        return new ChainedKafkaTransactionManager<>(ktm, dstm);
    }

    @Bean
    public DataSourceTransactionManager dstm(DataSource dataSource) {
        return new DataSourceTransactionManager(dataSource);
    }

    @Bean
    public ConcurrentKafkaListenerContainerFactory<?, ?> kafkaListenerContainerFactory(
            ConcurrentKafkaListenerContainerFactoryConfigurer configurer,
            ConsumerFactory<Object, Object> kafkaConsumerFactory,
            ChainedKafkaTransactionManager<Object, Object> chainedTM) {

        ConcurrentKafkaListenerContainerFactory<Object, Object> factory =
                new ConcurrentKafkaListenerContainerFactory<>();
        configurer.configure(factory, kafkaConsumerFactory);
        factory.getContainerProperties().setTransactionManager(chainedTM);
        return factory;
    }

    @Component
    public static class Listener {

        private final JdbcTemplate jdbcTemplate;

        private final KafkaTemplate<String, String> kafkaTemplate;

        public Listener(JdbcTemplate jdbcTemplate, KafkaTemplate<String, String> kafkaTemplate) {
            this.jdbcTemplate = jdbcTemplate;
            this.kafkaTemplate = kafkaTemplate;
        }

        @KafkaListener(id = "group1", topics = "topic1")
        public void listen1(String in) {
            this.kafkaTemplate.send("topic2", in.toUpperCase());
            this.jdbcTemplate.execute("insert into mytable (data) values ('" + in + "')");
        }

        @KafkaListener(id = "group2", topics = "topic2")
        public void listen2(String in) {
            System.out.println(in);
        }

    }

    @Bean
    public NewTopic topic1() {
        return TopicBuilder.name("topic1").build();
    }

    @Bean
    public NewTopic topic2() {
        return TopicBuilder.name("topic2").build();
    }

}

~~~

配置：

~~~properties
spring.datasource.url=jdbc:mysql://localhost/integration?serverTimezone=UTC
spring.datasource.username=root
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.kafka.consumer.auto-offset-reset=earliest
spring.kafka.consumer.enable-auto-commit=false
spring.kafka.consumer.properties.isolation.level=read_committed

spring.kafka.producer.transaction-id-prefix=tx-

#logging.level.org.springframework.transaction=trace
#logging.level.org.springframework.kafka.transaction=debug
#logging.level.org.springframework.jdbc=debug

~~~



**本地事务：**

~~~java
boolean result = template.executeInTransaction(t -> {
    t.sendDefault("thing1", "thing2");
    t.sendDefault("cat", "hat");
    return true;
});

~~~



### 6.拦截器

添加Spring Bean作为Producer/Consumer的拦截器。

Kafka提供了向Producer/Consumer添加拦截器的机制。这些对象由Kafka管理。

~~~java
@Confuguration
public class KafkaConfiguration {

    @Bean
    public ConsumerFactory<?, ?> kafkaConsumerFactory(KafkaProperties properties, SomeBean someBean) {
        Map<String, Object> consumerProperties = properties.buildConsumerProperties();
        // 添加自定义消费者拦截器类
        consumerProperties.put(ConsumerConfig.INTERCEPTOR_CLASSES_CONFIG, CustomConsumerInterceptor.class.getName());
        // 往生产者配置中添加Spring管理的Bean
        consumerProperties.put("some.bean", someBean);
        return new DefaultKafkaConsumerFactory<>(consumerProperties);
    }

    @Bean
    public ProducerFactory<?, ?> kafkaProducerFactory(KafkaProperties properties, SomeBean someBean) {
        Map<String, Object> producerProperties = properties.buildProducerProperties();
        // 添加自定义生产者拦截器类
        producerProperties.put(ProducerConfig.INTERCEPTOR_CLASSES_CONFIG, CustomProducerInterceptor.class.getName());
        // 往生产者配置中添加Spring管理的Bean
        producerProperties.put("some.bean", someBean);
        DefaultKafkaProducerFactory<?, ?> factory = new DefaultKafkaProducerFactory<>(producerProperties);
        String transactionIdPrefix = properties.getProducer()
                .getTransactionIdPrefix();
        if (transactionIdPrefix != null) {
            factory.setTransactionIdPrefix(transactionIdPrefix);
        }
        return factory;
    }

}

~~~

通过拦截器的configure将Spring管理的Bean传递给Kafka管理的对象。

~~~java
public class MyProducerInterceptor implements ProducerInterceptor<String, String> {

    private SomeBean bean;

    // 通过该方法将spring管理的Bean赋值给kafka管理的拦截器
    @Override
    public void configure(Map<String, ?> configs) {
        this.bean = (SomeBean) configs.get("some.bean");
    }

    @Override
    public ProducerRecord<String, String> onSend(ProducerRecord<String, String> record) {
        this.bean.someMethod("producer interceptor");
        return record;
    }

    @Override
    public void onAcknowledgement(RecordMetadata metadata, Exception exception) {
    }

    @Override
    public void close() {
    }

}

public class MyConsumerInterceptor implements ConsumerInterceptor<String, String> {

    private SomeBean bean;

    // 通过该方法将spring管理的Bean赋值给kafka管理的拦截器
    @Override
    public void configure(Map<String, ?> configs) {
        this.bean = (SomeBean) configs.get("some.bean");
    }

    @Override
    public ConsumerRecords<String, String> onConsume(ConsumerRecords<String, String> records) {
        this.bean.someMethod("consumer interceptor");
        return records;
    }

    @Override
    public void onCommit(Map<TopicPartition, OffsetAndMetadata> offsets) {
    }

    @Override
    public void close() {
    }

}

~~~



### 7.暂停和恢复消费者容器

2.1.3版本为侦听器容器添加了`pause()`和`resume()`方法。以前，可以在`ConsumerAwareMessageListener`中暂停消费者，并通过侦听`ListenerContainerIdleEvent`事件（提供对消费者对象的访问）来恢复消费者。虽然可以通过使用事件侦听器暂停空闲容器中的使用者，但在某些情况下，这不是线程安全的，因为不能保证在消费者线程上触发事件。为了安全地暂停和恢复消费者，您应该在侦听器容器上使用暂停和恢复方法。pause()在下一次poll()之前生效；resume()在当前poll()返回后立即生效。当容器暂停时，它继续poll()消费者，如果正在使用组管理，则避免再平衡，但它不检索任何记录。

从2.1.5版本开始，可以调用`isPauseRequested()`来查看pause()是否已被调用。`isConsumerPaused()`返回true，则所有的Consumer实例都暂停了。



~~~java
@Configuration
public class Application{

    KafkaListenerEndpointRegistry registry;
    
    
    public ApplicationRunner runner(KafkaListenerEndpointRegistry registry) {
        // 获取并暂停消费者容器
        registry.getListenerContainer("pause.resume").pause();
        
        // 获取并恢复消费者容器
        registry.getListenerContainer("pause.resume").resume();

    }

}

~~~



### 8.序列化反序列化及转换

可以通过配置指定Key和Value的序列化器和反序列化器。

~~~java
props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, IntegerDeserializer.class);
props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
...
props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, IntegerSerializer.class);
props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class);

~~~

KafkaConsumer和KafkaProducer的构造方法提供了Deserializer和Serializer对key和value进行反序列化及序列化。

DefaultKafkaProducerFactory和DefaultKafkaConsumerFactory工厂构造方法提供Supplier\<Serializer\>和Supplier\<Deserializer\>作为参数。



`JacksonUtils.enhancedObjectMapper()`创建ObjectMapper对象。

Kafak属性配置序列化和反序列：

1. JsonSerializer.ADD_TYPE_INFO_HEADERS：默认true
2. JsonSerializer.TYPE_MAPPINGS：默认空
3. JsonDeserializer.USE_TYPE_INFO_HEADERS：默认true
4. JsonDeserializer.REMOVE_TYPE_INFO_HEADERS：默认true
5. JsonDeserializer.KEY_DEFAULT_TYPE：
6. JsonDeserializer.VALUE_DEFAULT_TYPE
7. JsonDeserializer.TRUSTED_PACKAGES：
8. JsonDeserializer.TYPE_MAPPINGS：默认空



编程方式配置Json序列化和反序列化器：

~~~java
@Bean
public DefaultKafkaProducerFactory pf(KafkaProperties properties) {
    Map<String, Object> props = properties.buildProducerProperties();
    DefaultKafkaProducerFactory pf = new DefaultKafkaProducerFactory(props,
        new JsonSerializer<K>()
            .forKeys()
            .noTypeInfo(),
        new JsonSerializer<V>()
            .noTypeInfo());
}

@Bean
public DefaultKafkaConsumerFactory pf(KafkaProperties properties) {
    Map<String, Object> props = properties.buildConsumerProperties();
    DefaultKafkaConsumerFactory pf = new DefaultKafkaConsumerFactory(props,
        new JsonDeserializer<K>()
            .forKeys()
            .ignoreTypeHeaders(),
        new JsonSerializer<V>()
            .ignoreTypeHeaders());
}
~~~

**类型映射：**

~~~java
// 序列化映射
senderProps.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);
senderProps.put(JsonSerializer.TYPE_MAPPINGS, "cat:com.mycat.Cat, hat:com.myhat.hat");

// 反序列化映射
consumerProps.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, JsonDeserializer.class);
consumerProps.put(JsonDeSerializer.TYPE_MAPPINGS, "cat:com.yourcat.Cat, hat:com.yourhat.hat");

~~~

SpringBoot配置文件配置类型映射：


~~~properties
spring.kafka.producer.value-serializer=org.springframework.kafka.support.serializer.JsonSerializer
spring.kafka.producer.properties.spring.json.type.mapping=cat:com.mycat.Cat,hat:com.myhat.Hat
~~~



**委托序列化和反序列化配置：**

~~~java
producerProps.put(DelegatingSerializer.SERIALIZATION_SELECTOR_CONFIG,
    "thing1:com.example.MyThing1Serializer, thing2:com.example.MyThing2Serializer");

consumerProps.put(DelegatingDeserializer.SERIALIZATION_SELECTOR_CONFIG,
    "thing1:com.example.MyThing1Deserializer, thing2:com.example.MyThing2Deserializer");

~~~



**重试反序列化器：**

~~~java
ConsumerFactory cf = new DefaultKafkaConsumerFactory(myConsumerConfigs,
    new RetryingDeserializer(myUnreliableKeyDeserializer, retryTemplate),
    new RetryingDeserializer(myUnreliableValueDeserializer, retryTemplate));

~~~



**消息类型转换：**通过指定`MessageConverter`消息转换器，可以在消费端得到对应类型的消息。

在消费者端，可以配置一个`JsonMessageConverter`；它可以处理类型`byte[]`， `Bytes`和`String`的ConsumerRecord value，因此应该与`ByteArrayDeserializer`， `BytesDeserializer`或`StringDeserializer`一起使用。（byte[]和Bytes更有效，因为它们避免了不必要的byte[]到String的转换）。如果愿意，还可以配置`JsonMessageConverter`对应于反序列化器的特定子类。

~~~java
@Bean
public KafkaListenerContainerFactory<?, ?> kafkaJsonListenerContainerFactory() {
    ConcurrentKafkaListenerContainerFactory<Integer, String> factory =
        new ConcurrentKafkaListenerContainerFactory<>();
    factory.setConsumerFactory(consumerFactory());
    factory.setMessageConverter(new JsonMessageConverter());
    return factory;
}

@KafkaListener(topics = "jsonData",
                containerFactory = "kafkaJsonListenerContainerFactory")
public void jsonListener(Cat cat) {
	// 
}

~~~



**配置反序列化错误处理：**

~~~java
// key和value反序列化错误处理
props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, ErrorHandlingDeserializer2.class);
props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, ErrorHandlingDeserializer2.class);
props.put(ErrorHandlingDeserializer.KEY_DESERIALIZER_CLASS, JsonDeserializer.class);
props.put(JsonDeserializer.KEY_DEFAULT_TYPE, "com.example.MyKey")
props.put(ErrorHandlingDeserializer.VALUE_DESERIALIZER_CLASS, JsonDeserializer.class.getName());
props.put(JsonDeserializer.VALUE_DEFAULT_TYPE, "com.example.MyValue")
props.put(JsonDeserializer.TRUSTED_PACKAGES, "com.example")
return new DefaultKafkaConsumerFactory<>(props);

~~~

~~~java
consumerProps.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, ErrorHandlingDeserializer2.class);
consumerProps.put(ErrorHandlingDeserializer2.VALUE_DESERIALIZER_CLASS, JsonDeserializer.class);
// 错误处理Function
consumerProps.put(ErrorHandlingDeserializer2.VALUE_FUNCTION, FailedFooProvider.class);

~~~



**ConversionService**



### 9.消息头

Header

KafkaHeaderMapper



### 10.null负载

可以通过`KafkaTemplate.send(Message\<?\> message)`复杂KafkaNull.INSTANCE对象，发送null到服务端。

可以通过@Payload(required = false)接收日志压缩删除的key。

~~~java
@KafkaListener(id = "deletableListener", topics = "myTopic")
public void listen(@Payload(required = false) String value, @Header(KafkaHeaders.RECEIVED_MESSAGE_KEY) String key) {
    // value == null 表示key被删除
}

~~~



~~~java
@KafkaListener(id = "multi", topics = "myTopic")
static class MultiListenerBean {

    @KafkaHandler
    public void listen(String cat) {
        ...
    }

    @KafkaHandler
    public void listen(Integer hat) {
        ...
    }

    @KafkaHandler
    public void delete(@Payload(required = false) KafkaNull nul, @Header(KafkaHeaders.RECEIVED_MESSAGE_KEY) int key) {
        ...
    }

}

~~~



### 11.异常处理

@KafkaListener注解属性errorHandler指向`KafkaListenerErrorHandler`类型的Bean名称。

ConsumerAwareListenerErrorHandler：对异常消息进行偏移量重置

~~~java
@Bean
public ConsumerAwareListenerErrorHandler listen3ErrorHandler() {
    return (m, e, c) -> {
        this.listen3Exception = e;
        MessageHeaders headers = m.getHeaders();
        c.seek(new org.apache.kafka.common.TopicPartition(
                headers.get(KafkaHeaders.RECEIVED_TOPIC, String.class),
                headers.get(KafkaHeaders.RECEIVED_PARTITION_ID, Integer.class)),
                headers.get(KafkaHeaders.OFFSET, Long.class));
        return null;
    };
}

// 批处理
@Bean
public ConsumerAwareListenerErrorHandler listen10ErrorHandler() {
    return (m, e, c) -> {
        this.listen10Exception = e;
        MessageHeaders headers = m.getHeaders();
        List<String> topics = headers.get(KafkaHeaders.RECEIVED_TOPIC, List.class);
        List<Integer> partitions = headers.get(KafkaHeaders.RECEIVED_PARTITION_ID, List.class);
        List<Long> offsets = headers.get(KafkaHeaders.OFFSET, List.class);
        Map<TopicPartition, Long> offsetsToReset = new HashMap<>();
        for (int i = 0; i < topics.size(); i++) {
            int index = i;
            offsetsToReset.compute(new TopicPartition(topics.get(i), partitions.get(i)),
                    (k, v) -> v == null ? offsets.get(index) : Math.min(v, offsets.get(index)));
        }
        offsetsToReset.forEach((k, v) -> c.seek(k, v));
        return null;
    };
}

~~~



**容器错误处理：**提供了ErrorHandler和BatchErrorHandler对消息监听错误处理。

默认情况下，当未使用事务时，仅记录错误。使用事务时，默认情况下不会配置错误处理程序，以便异常将回滚事务。如果您在使用事务时提供自定义错误处理程序，并且您希望回滚事务，它必须引发异常。

~~~java
@Bean
public KafkaListenerContainerFactory<ConcurrentMessageListenerContainer<Integer, String>>
        kafkaListenerContainerFactory() {
    ConcurrentKafkaListenerContainerFactory<Integer, String> factory =
            new ConcurrentKafkaListenerContainerFactory<>();

    factory.setErrorHandler(ErrorHandler);

    return factory;
}

@Bean
public KafkaListenerContainerFactory<ConcurrentMessageListenerContainer<Integer, String>>
        kafkaListenerContainerFactory() {
    ConcurrentKafkaListenerContainerFactory<Integer, String> factory =
            new ConcurrentKafkaListenerContainerFactory<>();

    factory.setBatchErrorHandler(BatchErrorHandler);

    return factory;
}

~~~



**ConsumerAwareErrorHandler和ConsumerAwareBatchErrorHandler：**可以根据需要根据失败的数据重置偏移量。



**RemainingRecordsErrorHandler：**





**RetryingBatchErrorHandler：**



**ContainerStoppingErrorHandler：**





**DefaultAfterRollbackProcessor：**





**死信记录：**





### 12.Kerberos

认证

~~~java
@Bean
public KafkaJaasLoginModuleInitializer jaasConfig() throws IOException {
    KafkaJaasLoginModuleInitializer jaasConfig = new KafkaJaasLoginModuleInitializer();
    jaasConfig.setControlFlag("REQUIRED");
    Map<String, String> options = new HashMap<>();
    options.put("useKeyTab", "true");
    options.put("storeKey", "true");
    options.put("keyTab", "/etc/security/keytabs/kafka_client.keytab");
    options.put("principal", "kafka-client-1@EXAMPLE.COM");
    jaasConfig.setOptions(options);
    return jaasConfig;
}

~~~



## Spring-Kafka消费者

ConcurrentKafkaListenerContainerFactoryConfigurer 监听器容器工厂配置类。

自动配置以下内容：**以下获取的Spring容器的对象，要求唯一或使用@Primary标注。**

**ObjectProvider要求具体的类型存在，ConditionalOnMissingBean指定class的子类对象存在就不匹配。**

1. spring.kafka 配置类对象；
2. 设置MessageConverter（消息转换器）对象类型，batch/single 获取消息。默认没有配置。
3. 设置回复KafkaTemplate，**配置ReplyingKafkaTemplate对象，消费者方法返回不为空，导致启动失败，没有回复KafkaTemplate**。
4. 设置KafkaAwareTransactionManager事务管理器。
5. 设置ConsumerAwareRebalanceListener，重写平衡织入，可以访问Consumer对象。
6. 设置ErrorHandler 错误处理器：。
7. 设置BatchErrorHandler 批量错误处理器：。
8. 设置AfterRollbackProcessor：。
9. 设置RecordInterceptor消息拦截器。



ConcurrentKafkaListenerContainerFactory 监听器容器工厂。用于存放ConsumerFactory 消费者工厂。

![image-20250420204736973](http://47.101.155.205/image-20250420204736973.png)

自动配置内容：

1. 设置ConsumerFactory 消费者工厂。
2. 对监听器工厂进行配置：
   1. listener.concurrency 配置监听的并发数，默认不配置。
   2. 工厂配置的MessageConverter，不为空才配置。
   3. 工厂配置的KafkaTemplate，不为空才配置。
   4. single/batch处理消息，配置对应配置类的错误处理器类型。
   5. 不为空设置AfterRollbackProcessor。
   6. 不为空设置RecordInterceptor消息拦截器。
3. 将消费者的配置复制到监听器工厂的包装配置ContainerProperties：**不为空才设置**
   1. listener.ackMode：消息确认模式。
   2. listener.clientId：客户端id属性前缀。
   3. listener.ackCount：COUNT/COUNT_TIME确认模式的消息数量。
   4. listener.ackTime：TIME/COUNT_TIME确认模式的消息数量。
   5. listener.pollTimeout：消费者poll的超时时间。
   6. listener.noPollThreshold：pollTimeout * 该参数使用。
   7. listener.idleEventInterval：发布idel 消费者没有数据的间隔时间。
   8. listener.monitorInterval：对无响应消费者的检查时间，默认30s。
   9. listener.missingTopicsFatal：Broker不存Topic时，是否启动失败。
   10. 设置KafkaAwareTransactionManager。
   11. 设置ConsumerAwareRebalanceListener。



### KafkaListenerConfigurationSelector

通过导入KafkaBootstrapConfiguration，在Spring中注入Bean的后置处理器。

- KafkaListenerAnnotationBeanPostProcessor：每个创建的bean，包含注解KafkaListener等，则对其进行处理。将注解消费者封装成待处理的对象，注册在KafkaListenerEndpointRegistrar中。
- KafkaListenerEndpointRegistry：对KafkaListenerEndpointRegistrar注册的对象进行处理。



#### KafkaListenerAnnotationBeanPostProcessor

Bean后置处理器，对Bean的两种情况进行处理：

1. 类上有@KafkaListener注解，类+@KafkaHandler注解方法注册监听信息。
2. 方法上有@KafkaListener注解，注册监听方法。

![image-20250422201017580](http://47.101.155.205/image-20250422201017580.png)

**@KafkaListener方法信息进行注册：**

![image-20250422202246868](http://47.101.155.205/image-20250422202246868.png)

![image-20250422203242281](http://47.101.155.205/image-20250422203242281.png)

1. Bean的对象信息；
2. 消费者线程名称`id`；
3. 消费者组名称设置，**为空的情况可能后面还会再设置**；
4. Topic设置；
5. Topic分区设置；
6. 前缀设置`clientIdPrefix`；
7. 监听器容器设置MessageListenerContainer(containerGroup)；
8. 并发数设置`concurrency`；
9. 是否自动启动设置`autoStartup`；
10. 消费者指定的配置设置`properties`；
11. List消息是否拆分设置`splitIterables`；
12. 容器KafkaListenerContainerFactory工厂设置`containerFactory`；
13. 方法Spring的BeanFactory；
14. 错误处理器设置`errorHandler`；
15. 注册

![image-20250422203748419](http://47.101.155.205/image-20250422203748419.png)



**@KakfaListener类的注册过程：**

![image-20250422204135031](http://47.101.155.205/image-20250422204135031.png)

封装的对象不能，类使用`MultiMethodKafkaListenerEndpoint`，是方法封装MethodKafkaListenerEndpoint的子类。

其它逻辑相同。



**KafkaListenerAnnotationBeanPostProcessor实现的SmartInitializingSingleton接口，在所有的单例Bean创建完成后，调用afterSingletonsInstantiated方法开始启动监听器。**

![image-20250422205521537](http://47.101.155.205/image-20250422205521537.png)

1. 通过KafkaListenerConfigurer Bean对KafkaListenerEndpointRegistrar进行自定义操作；可以配置`MessageHandlerMethodFactory`、`KafkaListenerContainerFactory`容器工厂；
2. KafkaListenerEndpointRegistrar对象设置KafkaListenerEndpointRegistry注册对象；
3. KafkaListenerEndpointRegistrar对象设置容器工厂默认名称；
4. 消息处理工厂设置；
5. 注册所有的消费者，使用KafkaListenerEndpointRegistrar的KafkaListenerEndpointRegistry注册表对象进行注册。



#### KafkaListenerEndpointRegistry

获取封装KafkaListenerEndpointDescriptor对象的容器工厂对象，**默认没有配置为null**，两种方式设置，一是通过KafkaListenerConfigurer配置注册者的容器工厂对象，二是通过注册者的名称在BeanFacotry上下文中查询，否则启动失败。

使用MethodKafkaListenerEndpoint、KafkaListenerContainerFactory开始创建消费者。

![image-20250422205808504](http://47.101.155.205/image-20250422205808504.png)

![image-20250422211932718](http://47.101.155.205/image-20250422211932718.png)

**配置的MessageListenerContainer有什么用？**

![image-20250422212513235](http://47.101.155.205/image-20250422212513235.png)





### ConcurrentKafkaListenerContainerFactory

用来创建监听器容器的工厂对象。

createListenerContainer(KafkaListenerEndpoint endpoint);创建MessageListenerContainer监听器容器，有两个具体实现：ConcurrentMessageListenerContainer、KafkaMessageListenerContainer。

执行步骤：

1. 创建ConcurrentMessageListenerContainer对象，封装了ConsumerFactory、Topic及分区信息。而后设置属性beanName为endpoint唯一标识；
2. 根据监听器容器工厂的配置对监听器容器进行配置；
   1. RecordFilterStrategy：过滤器；
   2. ackDiscarded：是否
   3. RetryTemplate：
   4. RecoveryCallback：
   5. statefulRetry：是否
   6. batchListener：是否
   7. replyTemplate：回复KafkaTemplate；
   8. ReplyHeadersConfigurer(replyHeadersConfigurer)：
3. AbstractKafkaListenerContainerFactory.setupListenerContainer(..);消息监听器容器设置MessagingMessageListenerAdapter；
   1. 适配器创建及判断；
   2. 适配器设置及后续校验；
   3. 重试配置；
   4. 过滤器配置；
   5. 适配器设置；
4. 对监听器容器进行配置；
5. 有设置ContainerCustomizer对象则对监听器容器进行自定就操作；返回监听器容器对象。

![image-20250422220815150](http://47.101.155.205/image-20250422220815150.png)

![image-20250422214009406](http://47.101.155.205/image-20250422214009406.png)

![image-20250422214501438](http://47.101.155.205/image-20250422214501438.png)

![image-20250422215928029](http://47.101.155.205/image-20250422215928029.png)

![image-20250422220520274](http://47.101.155.205/image-20250422220520274.png)

监听器容器对象进行初始化后，判断其启动配置和监听器工厂的启动配置情况。

是否有配置监听器容器组，有配置的情况下，将其注入到Spring的容器中。

默认不是立即启动监听器容器。

