package com.zkteco.zlink.{{dataSource.modelName | toLowerCase}}.dao;

import com.infobip.spring.data.jpa.ExtendedQuerydslJpaRepository;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.QueryResults;
import com.zkteco.zlink.{{dataSource.modelName | toLowerCase}}.model.Q{{ dataSource.modelName | pascal}};
import com.zkteco.zlink.{{dataSource.modelName | toLowerCase}}.model.{{ dataSource.modelName | pascal}};
import com.zkteco.zlink.{{dataSource.modelName | toLowerCase}}.vo.{{ dataSource.modelName | pascal}}ConditionVo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * {{dataSource.remark}} {{ dataSource.modelName | pascal}}Dao类
 *
 * @author generator
 * @date {{dataSource.generatorDate}}
 * @since 1.0.0
 */
@Repository
public interface {{ dataSource.modelName | pascal}}Dao extends ExtendedQuerydslJpaRepository<{{ dataSource.modelName | pascal}}, String> {

    /**
     * 分页查询
     * 
     * @param companyId:公司id
     * @param conditionVo:查询条件
     * @author  generator
     * @date {{dataSource.generatorDate}}
     * @since 1.0.0
     */
    default Page<{{ dataSource.modelName | pascal}}> findByPage(String companyId, {{ dataSource.modelName | pascal}}ConditionVo conditionVo) {
        Q{{ dataSource.modelName | pascal}} q{{ dataSource.modelName | pascal}} = Q{{ dataSource.modelName | pascal}}.{{ dataSource.modelName }};
        // 构建查询条件
        BooleanBuilder where = new BooleanBuilder();
        where.and(q{{ dataSource.modelName | pascal}}.companyId.eq(companyId));
        {{each dataSource.columns}}{{if $value.dataType != 'Date'}}
        // 查询条件-{{$value.title}}
        Optional.ofNullable(conditionVo.get{{$value.engName| pascal}}()).ifPresent(name -> where.and(q{{ dataSource.modelName | pascal}}.{{$value.engName}}.eq(name)));
        {{/if}}{{/each}}
        // 构建分页参数
        Pageable pageable = PageRequest.of(conditionVo.getPageOffset(), conditionVo.getPageSize());
        QueryResults<{{ dataSource.modelName | pascal}}> queryResults = this.query(query -> query
                .select(q{{ dataSource.modelName | pascal}})
                .from(q{{ dataSource.modelName | pascal}})
                .where(where)
                .orderBy(q{{ dataSource.modelName | pascal}}.createTime.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetchResults()
        );
        return PageableExecutionUtils.getPage(queryResults.getResults(), pageable, queryResults::getTotal);
    }
}
