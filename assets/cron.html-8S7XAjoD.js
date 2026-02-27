import{_ as s,c as l,e as i,o as a}from"./app-BIGZvh4f.js";const e={};function c(r,n){return a(),l("div",null,n[0]||(n[0]=[i(`<h1 id="cron表达式" tabindex="-1"><a class="header-anchor" href="#cron表达式"><span>cron表达式</span></a></h1><div class="language-markdown line-numbers-mode" data-highlighter="prismjs" data-ext="md" data-title="md"><pre><code><span class="line">┌───────────── 秒 (0 - 59)</span>
<span class="line">│ ┌───────────── 分钟 (0 - 59)</span>
<span class="line">│ │ ┌───────────── 小时 (0 - 23)</span>
<span class="line">│ │ │ ┌───────────── 日期 (1 - 31)</span>
<span class="line">│ │ │ │ ┌───────────── 月份 (1 - 12 或 JAN-DEC)</span>
<span class="line">│ │ │ │ │ ┌───────────── 星期 (0 - 7 或 SUN-SAT，其中0和7表示周日)</span>
<span class="line">│ │ │ │ │ │</span>
<span class="line">│ │ │ │ │ │</span>
<span class="line">│ │ │ │ │ │</span>
<span class="line"><span class="token hr punctuation">* * * * * *</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>秒：表示一分钟内的秒数，取值范围为0-59；</li><li>分钟：表示一小时内的分钟数，取值范围为0-59；</li><li>小时：表示一天中的小时数，取值范围为0-23；</li><li>日期：表示一个月中的某一天，取值范围为1-31；</li><li>月份：表示一年中的月份，取值范围为1到12；</li><li>星期：表示一周中的某一天，取值范围0-7，0和7都表示周日。</li></ul><p>特殊字符含义：</p><ul><li>*：匹配任意值。</li><li>?：用于占位，表示不指定任何值。</li><li>/：用于指定间隔值。</li><li>-：用于指定范围值。</li><li>,：用于指定多个值。</li></ul>`,5)]))}const d=s(e,[["render",c],["__file","cron.html.vue"]]),o=JSON.parse('{"path":"/tools/cron.html","title":"cron表达式","lang":"zh-CN","frontmatter":{},"headers":[],"git":{"updatedTime":1745824015000,"contributors":[{"name":"ouyangcm","username":"ouyangcm","email":"mingorg@163.com","commits":1,"url":"https://github.com/ouyangcm"}]},"filePathRelative":"tools/cron.md"}');export{d as comp,o as data};
