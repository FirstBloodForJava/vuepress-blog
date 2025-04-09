# Spring特殊接口作用



## spring-context



### ImportBeanDefinitionRegistrar

实现`ImportBeanDefinitionRegistrar`接口的类，也可以实现`Aware`接口，`Aware`接口回调回优先该接口的`registerBeanDefinitions`方法调用。

**作用：**

1. 可以通过`@Configuration`类，再加上`@Import`该实现类，添加自定义的`BeanPostProcessor`处理器。

~~~java
public interface ImportBeanDefinitionRegistrar {

    /**
     * 
     * @param importingClassMetadata
     * @param registry
     * @param importBeanNameGenerator
     */
    default void registerBeanDefinitions(AnnotationMetadata importingClassMetadata, BeanDefinitionRegistry registry,
                                         BeanNameGenerator importBeanNameGenerator) {

        registerBeanDefinitions(importingClassMetadata, registry);
    }

    /**
     * 
     * @param importingClassMetadata
     * @param registry
     */
    default void registerBeanDefinitions(AnnotationMetadata importingClassMetadata, BeanDefinitionRegistry registry) {
    }
}

~~~



#### 案例1.1

SpringBoot的web.servlet自动配置，通过注入`BeanPostProcessor`处理器，在``WebServerFactory`嵌入式Server工厂对象被完全创建之前，根据配置进行一些固定的初始化。

~~~java
@Configuration(proxyBeanMethods = false)
// ...
@Import({ ServletWebServerFactoryAutoConfiguration.BeanPostProcessorsRegistrar.class,
		ServletWebServerFactoryConfiguration.EmbeddedTomcat.class,
		ServletWebServerFactoryConfiguration.EmbeddedJetty.class,
		ServletWebServerFactoryConfiguration.EmbeddedUndertow.class })
public class ServletWebServerFactoryAutoConfiguration {
    public static class BeanPostProcessorsRegistrar implements ImportBeanDefinitionRegistrar, BeanFactoryAware {

		private ConfigurableListableBeanFactory beanFactory;

		@Override
		public void setBeanFactory(BeanFactory beanFactory) throws BeansException {
			if (beanFactory instanceof ConfigurableListableBeanFactory) {
				this.beanFactory = (ConfigurableListableBeanFactory) beanFactory;
			}
		}

		@Override
		public void registerBeanDefinitions(AnnotationMetadata importingClassMetadata,
				BeanDefinitionRegistry registry) {
			if (this.beanFactory == null) {
				return;
			}
			registerSyntheticBeanIfMissing(registry, "webServerFactoryCustomizerBeanPostProcessor",
					WebServerFactoryCustomizerBeanPostProcessor.class);
			registerSyntheticBeanIfMissing(registry, "errorPageRegistrarBeanPostProcessor",
					ErrorPageRegistrarBeanPostProcessor.class);
		}
		
        // 在这里注入自定义的 BeanPostProcessor Bean处理器
		private void registerSyntheticBeanIfMissing(BeanDefinitionRegistry registry, String name, Class<?> beanClass) {
			if (ObjectUtils.isEmpty(this.beanFactory.getBeanNamesForType(beanClass, true, false))) {
				RootBeanDefinition beanDefinition = new RootBeanDefinition(beanClass);
				beanDefinition.setSynthetic(true);
				registry.registerBeanDefinition(name, beanDefinition);
			}
		}

	}
    
}

~~~

使用`LambdaSafe`将所有的`WebServerFactoryCustomizer` Bean都调用其`customize`方法。

`WebServerFactoryCustomizer`的泛型`isInstance(当前WebServerFactory对象)`为true才调用。

~~~java
public class WebServerFactoryCustomizerBeanPostProcessor implements BeanPostProcessor, BeanFactoryAware {

	private ListableBeanFactory beanFactory;

	private List<WebServerFactoryCustomizer<?>> customizers;

	@Override
	public void setBeanFactory(BeanFactory beanFactory) {
		// 要求 BeanFactory 类型是 ListableBeanFactory
		Assert.isInstanceOf(ListableBeanFactory.class, beanFactory,
				"WebServerCustomizerBeanPostProcessor can only be used with a ListableBeanFactory");
		this.beanFactory = (ListableBeanFactory) beanFactory;
	}

	// 在Bean创建，还未初始化之前
	@Override
	public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
		if (bean instanceof WebServerFactory) {
			postProcessBeforeInitialization((WebServerFactory) bean);
		}
		return bean;
	}

	@Override
	public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
		return bean;
	}

    // WebServerFactoryCustomizer 的泛型isInstance(当前WebServerFactory对象)为true才调用
	@SuppressWarnings("unchecked")
	private void postProcessBeforeInitialization(WebServerFactory webServerFactory) {
		LambdaSafe.callbacks(WebServerFactoryCustomizer.class, getCustomizers(), webServerFactory)
				.withLogger(WebServerFactoryCustomizerBeanPostProcessor.class)
				.invoke((customizer) -> customizer.customize(webServerFactory));
	}

	private Collection<WebServerFactoryCustomizer<?>> getCustomizers() {
		if (this.customizers == null) {
			// Look up does not include the parent context
			this.customizers = new ArrayList<>(getWebServerFactoryCustomizerBeans());
			this.customizers.sort(AnnotationAwareOrderComparator.INSTANCE);
			this.customizers = Collections.unmodifiableList(this.customizers);
		}
		return this.customizers;
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	private Collection<WebServerFactoryCustomizer<?>> getWebServerFactoryCustomizerBeans() {
		return (Collection) this.beanFactory.getBeansOfType(WebServerFactoryCustomizer.class, false, false).values();
	}

}

~~~



