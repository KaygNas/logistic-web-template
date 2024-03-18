# Logistic Web Template

本项目使用 React + ShadcnUI + Next.js + Prisma + PostgreSQL，是基于真实业务需求而开发的练习项目，主要功能包含：

- 国内包裹扫码入库
- 国际包裹管理
- 用户管理

可以通过 [logistic-web-template.vercel.app](https://logistic-web-template.vercel.app) 在线预览，进入管理后台所需的帐号和密码均为 `admin`。

这个项目的初始化使用 [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) 的引导创建，在此之上额外调整了 `eslint.config.js` 的配置，另外本地开发所需的 PostgresSQL 数据库是由 Docker 容器运行。

这个项目还使用 [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) 自动优化和加载自定义的 Google 字体。

## 前置准备

开始之前请确保你已经搭建好开发环境，以下是必须安装的工具：

- Docker
- pnpm

## 开始

1. 运行 PostgresSQL：

```bash
docker-compose up
```

2. 安装依赖

```bash
pnpm install
```

3. 拷贝 `.env.template` 文件并命名为 `.env`。另外，你需要执行以下命令并为 `.env` 中的 `AUTH_SECRET` 赋上生成的值

```bash
openssl rand -hex 32
```

4. 准备好 Prisma 并同步表结构

```bash
pnpx prisma generate && pnpx prisma migrate dev
```

5. 运行开发服务器：

```bash
pnpm dev
```

用你的浏览器打开 [http://localhost:3000](http://localhost:3000) 来查看结果。

## 在 Vercel 上部署

部署你的 Next.js 应用最简单的方式就是使用 Next.js 的创建者提供的 [Vercel 平台](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)。

查看 Vercel 的 [Next.js 部署文档](https://nextjs.org/docs/deployment) 以获取更多详细信息。

## 在阿里云的函数计算应用部署 

你也可以在阿里云的函数计算上部署此应用，函数计算是与 Vercel 类似的 Serveless 服务，为此你必须至少准备：

- 在[云数据库 RDS](https://rdsnext.console.aliyun.com/)创建一个 Postgres 实例
- 在[域名控制台](https://dc.console.aliyun.com/)申请一个域名及 SSL 证书
- 在[函数计算 FC](https://fcnext.console.aliyun.com/)创建一个应用
- 在[专有网络 VPC](https://vpc.console.aliyun.com/overview)创建一个实例并将数据库加入其中

部署函数计算应用所需的 `s.yaml` 在根目录，你需要修改 VPC 的配置变量 `vpcId` `securityGroupId` `vSwitchIds`。另外，别务必记得在函数计算的流水线中配置还 `.env.template` 中的所有环境变量。

## 证书

本项目使用 MIT 证书，你可以克隆本仓库并随意使用。

## 帮助

如果你遇到任何困难或者需要帮助，欢迎提出 Issue。

## 了解更多

要了解更多关于 Next.js 的信息，可以查看以下资源：

- [Next.js 文档](https://nextjs.org/docs) - 了解 Next.js 的特性和 API。
- [学习 Next.js](https://nextjs.org/learn) - 一个交互式的 Next.js 教程。

你可以查看 [Next.js 的 GitHub 仓库](https://github.com/vercel/next.js/) - 我们欢迎你的反馈和贡献！

