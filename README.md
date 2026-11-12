# Personal Site Backend

个人网站的后端，面向 React 前端提供 REST API。目前支持公开的作品列表和详情查询。

## 技术栈

- Java 25、Spring Boot 4.1.2、Maven Wrapper（Maven 3.10.0）
- Spring MVC、Spring Data JPA、MySQL 8.4、Flyway
- Spring Security、Spring Boot Actuator
- OpenAPI、springdoc 3.2.0、Swagger UI
- JUnit、Testcontainers、Docker Compose

## 本地开发

准备 JDK 25 和 Docker Desktop。从包含 `pom.xml` 的项目根目录执行下列命令，确认 Maven 使用 Java 25。

```sh
./mvnw --version
```

首次使用时，在项目根目录创建 `.env`，并将两个密码占位值换成不同的本地密码。Spring Boot 使用 `site_app` 账号，MySQL 容器在首次初始化空数据卷时会设置两个账号的密码。Git 会忽略 `.env`。

```dotenv
SPRING_PROFILES_ACTIVE=local
DB_NAME=personal_site
DB_USERNAME=site_app
DB_PASSWORD='replace_with_your_app_password'
MYSQL_ROOT_PASSWORD='replace_with_your_root_password'
```

### 启动 MySQL

打开 Docker Desktop，等引擎启动后执行下列命令。MySQL 映射到 `127.0.0.1:3306`，状态应为 `healthy`。

```sh
docker compose up -d --wait --wait-timeout 180 mysql
docker compose ps
```

### 从终端运行后端

在同一个终端中加载 `.env` 并启动应用。Compose 会读取 `.env` 来配置容器，Spring Boot 则从启动进程的环境变量读取本地配置。

```sh
set -a
source ./.env
set +a
./mvnw spring-boot:run
```

### 从 IntelliJ IDEA 运行后端

1. 以 Maven 项目打开根目录，将 Project SDK 和运行配置的 JRE 设为 Java 25。
2. 按上面的步骤启动 MySQL，确认状态为 `healthy`。
3. 在 **Run → Edit Configurations** 中选择或创建应用运行配置。工作目录设为项目根目录，主类设为 `com.leijianxun.personal_site_backend.PersonalSiteBackendApplication`。
4. 在 **Environment variables** 中选择项目根目录的 `.env`。如果当前 IDEA 版本没有文件选项，手动设置 `SPRING_PROFILES_ACTIVE=local`、`DB_NAME`、`DB_USERNAME` 和 `DB_PASSWORD`，数据库值与 `.env` 保持一致。
5. 点击 **Run** 或 **Debug**。

IDEA 的运行配置拥有自己的环境变量。在 IDEA 内置终端执行 `source ./.env` 只会影响那个终端及其启动的进程。

### 健康检查与接口文档

应用默认监听 8080。启动后检查健康端点，预期返回 `{"status":"UP"}`。

```sh
curl --noproxy '*' -fsS http://127.0.0.1:8080/actuator/health
```

应用启动后，可以在 [Swagger UI](http://localhost:8080/swagger-ui.html) 查看接口路径、请求参数和响应结构。OpenAPI JSON 位于 `/v3/api-docs`。如果浏览器跳转到默认登录页，用户名是 `user`，密码是启动日志中 `Using generated security password` 后的值。

### 停止本地服务

在 IDEA 点击 **Stop**，或在运行后端的终端按 **Ctrl+C**。随后停止 MySQL，数据会保存在 Compose 的命名数据卷中。

```sh
docker compose down
```

## 测试与数据库迁移

确保 Docker Desktop 已启动，再运行构建和测试。集成测试使用 Testcontainers 创建独立的 MySQL 8.4 容器，并在其中执行 Flyway 迁移。

```sh
./mvnw clean verify
```

本地启动应用时，Flyway 会执行 `src/main/resources/db/migration/` 中待执行的迁移。变更表结构时，添加新的版本化 SQL 文件。Hibernate 在本地校验实体与表结构是否匹配。
