package com.leijianxun.personal_site_backend.repository;

import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.json.JsonMapper;

import java.util.List;
import java.util.Optional;

@Repository
public class ProjectRepository {

    private final JdbcClient jdbc;
    private final JsonMapper json;

    public ProjectRepository(JdbcClient jdbc, JsonMapper json) {
        this.jdbc = jdbc;
        this.json = json;
    }

    // 查询所有作品列表
    public List<Summary> findAll() {
        return jdbc.sql("""
            SELECT id, slug, title, summary, stack
            FROM projects
            ORDER BY id ASC
            """)
                .query((rs, rowNum) -> {
                    JsonNode stack = parseJson(rs.getString("stack"));
                    return new Summary(
                            rs.getLong("id"),
                            rs.getString("slug"),
                            rs.getString("title"),
                            rs.getString("summary"),
                            stack == null || stack.isNull() ? json.createArrayNode() : stack
                    );
                })
                .list();
    }

    // 查询精选作品列表
    public List<Summary> findStarProjects() {
        return jdbc.sql("""
            SELECT id, slug, title, summary, stack
            FROM projects
            WHERE star_project = true
            ORDER BY id ASC
            """)
                .query((rs, rowNum) -> {
                    JsonNode stack = parseJson(rs.getString("stack"));
                    return new Summary(
                            rs.getLong("id"),
                            rs.getString("slug"),
                            rs.getString("title"),
                            rs.getString("summary"),
                            stack == null || stack.isNull() ? json.createArrayNode() : stack
                    );
                })
                .list();
    }

    // 根据 id 查询作品详情
    public Optional<Detail> findById(long id) {
        return jdbc.sql("""
                SELECT id, slug, title, summary, stack, body_markdown, links
                FROM projects
                WHERE id = :id
                """)
                .param("id", id)
                .query((rs, rowNum) -> new Detail(
                        rs.getLong("id"),
                        rs.getString("slug"),
                        rs.getString("title"),
                        rs.getString("summary"),
                        parseJson(rs.getString("stack")),
                        rs.getString("body_markdown"),
                        parseJson(rs.getString("links"))))
                .optional();
    }

    private JsonNode parseJson(String value) {
        return value == null ? null : json.readTree(value);
    }

    public record Summary(long id, String slug, String title, String summary, JsonNode stack) {}

    public record Detail(long id, String slug, String title, String summary,
                         JsonNode stack, String bodyMarkdown, JsonNode links) {}

}
