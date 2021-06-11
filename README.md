# 注意
当前r2.x.x版本刚发布，尚未提供升级文档(最晚21年10月会提供)，建议老用户(1.x及之前的版本用户)暂时不要升级

# loonflow
a workflow engine base on django
基于django的工作流引擎系统(通过http接口调用，可以作为企业内部统一的工作流引擎，提供诸如权限申请、资源申请、发布申请、请假、报销、it服务等所有工作流场景的服务),如果有一定的开发能力建议只使用后端引擎功能，前端根据场景定制开发可分散于各个内部后台管理系统(如人事、运维、监控、cmdb等等)。从1.1.x版本开始loonflow自带工单新建及处理的前端界面，可以直接使用。

欢迎访问我的博客了解我的设计思路 http://loonapp.com/blog/27/

正式版本见[release](https://github.com/blackholll/loonflow/releases)中,建议使用最新版本， , 为了方便大家下载会在每次发布新版本后将压缩包上传到qq群文件(qq群:558788490), 你也可以使用git命令直接下载对应代码

```
git clone git@github.com:blackholll/loonflow.git
git checkout rx.x.x  #(具体的版本号，如r1.1.0）拉取代码

```


## 前言
本人2011年开始接触工作流，2013年开始开发工作流第一版本，至今经历了多个版本。当前开源版本致力于提供企业统一工作流引擎方案

欢迎加入qq群一起交流工作流相关技术: 558788490
qq群的目的:
- 供大家自行交流
- 一些loonflow的开发动态、开发计划的同步

使用前请先将[文档](http://loonflow.readthedocs.io/)阅读两遍。使用过程中遇到问题或者有什么建议，请先查看[github issue](https://github.com/blackholll/loonflow/issues)看是否有答案。如果没找到可以提交新的issue。你也可以在qq群内提问交流(群内会有热心的同学解答，不要@群主，群主因为精力的原因一般只回复issue)


现已推出付费服务，捐助满300元(见本文档末尾支付宝付款码)，即可享受VIP服务，权益包括
- 加微信好友，有问题可以直接微信咨询
- 支持微信语音问题解答
- 提出的合理通用新需求，会优先在新版本中支持


## 基本架构
LOONFLOW 分为两部分:
- 前端界面(react + ant design pro): 包括工单新建、处理、管理、工作流的管理配置、统计等等
- 提供http api供各个系统(如果oa、cmdb、运维系统、客服系统)的后端调用以完成各自系统定制化的工单需求

## 相关项目
在loonflow0.x.x及1.0.x版本时期，未提供用户侧的创建及处理工单界面。感谢以下调用端demo项目的提供者。如果你使用vue或者bootstrap写你的前端来整合内部各种需要用到工单的系统，以下项目可供参考
 
技术栈 | 项目地址 | 作者联系方式 | 说明
---|---|---|---
vue.js + django | https://github.com/youshutong2080/shutongFlow | qq群中,qq号: 343306138 |支持PC端浏览器中使用, 功能比较简单,实际使用需要根据自己的需求做适当改造,欢迎提交pr
bootstrap + django | https://github.com/jimmy201602/workflowdemo | qq群中,qq号: 313484953|支持PC端浏览器中使用, 功能比较简单,实际使用需要根据自己的需求做适当改造,欢迎提交pr
vue.js + django |https://gitee.com/shihow/howflow-open | qq群中,qq号:39188043 | 支持在钉钉中使用，迭代中，欢迎提交pr


下面是一些效果图和动画

#### vue版本(shutongflow)demo
![create_ticket](/static/images/create-ticket.png)
![todo_list](/static/images/todo-list.png)
![detail_ticket](/static/images/detail-ticket.png)

### bootstrap版本(workflowdemo)demo
![bootstrap_demo](/static/images/jimmy201602_demo.gif)
另外boostrap版本还提供了docker镜像，供新人快速部署(仅供查看效果图，不要直接用于生产环境):https://hub.docker.com/r/webterminal/workflowdemo/

### loonflow

是的，你可以不再使用workflowdemo、shutongflow及howflow-open。 当然你还可以参考这三个项目写自己的调用方系统

![user_manage](/static/images/1.1.x/login.png)
![user_manage](/static/images/1.1.x/workbench.png)
![user_manage](/static/images/1.1.x/new_ticket.png)
![user_manage](/static/images/1.1.x/custom_field.png)
![user_manage](/static/images/1.1.x/user.png)
![user_manage](/static/images/1.1.x/system_config.png)


## 使用文档
[使用文档](https://loonflow.readthedocs.io)

## 鸣谢

特别感谢 [JetBrains](https://www.jetbrains.com/?from=mirai) 为本开源项目提供免费的 [IntelliJ IDEA](https://www.jetbrains.com/idea/?from=loonflow)  授权  

[<img src="/docs/images/jetbrains-variant-3.png" width="200"/>](https://www.jetbrains.com/?from=loonflow)

# 欢迎捐助
您的支持是我最大的动力,欢迎支付宝扫码捐助

![donation_code](/static/images/donation_code.png)
