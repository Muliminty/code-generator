package com.zkteco.zlink.{{dataSource.modelName | toLowerCase}}.service.impl;

import com.zkteco.zlink.boot.core.config.ClaimsDataDTOHandle;
import com.zkteco.zlink.boot.core.util.ModelUtil;
import com.zkteco.zlink.boot.core.util.ZlinkResult;
import com.zkteco.zlink.{{dataSource.modelName | toLowerCase}}.dao.{{ dataSource.modelName | pascal}}Dao;
import com.zkteco.zlink.{{dataSource.modelName | toLowerCase}}.model.{{ dataSource.modelName | pascal}};
import com.zkteco.zlink.{{dataSource.modelName | toLowerCase}}.service.{{ dataSource.modelName | pascal}}Service;
import com.zkteco.zlink.{{dataSource.modelName | toLowerCase}}.vo.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

/**
 * {{dataSource.remark}} {{ dataSource.modelName | pascal}}Service实现类
 *
 * @author generator
 * @date {{dataSource.generatorDate}}
 * @since 1.0.0
 */
@Slf4j
@Service
public class {{ dataSource.modelName | pascal }}ServiceImpl implements {{ dataSource.modelName | pascal}}Service {

    @Autowired
    private {{ dataSource.modelName | pascal }}Dao {{ dataSource.modelName |camel }}Dao;

    @Override
    public {{ dataSource.modelName | pascal}}GetVo findById(String id) {
        {{ dataSource.modelName | pascal}}GetVo {{ dataSource.modelName | camel}}GetVo = null;
        {{ dataSource.modelName | pascal}} po = {{ dataSource.modelName | camel}}Dao.findById(id).orElse(null);
        if (Objects.nonNull(po)) {
            {{ dataSource.modelName | pascal}}GetVo = ModelUtil.copyPropertiesIgnoreNull({{ dataSource.modelName | camel}}, new {{ dataSource.modelName | pascal}}GetVo());
        }
        return {{ dataSource.modelName | camel}}GetVo;
    }

    @Override
    public {{ dataSource.modelName | pascal}}PageVo findByPage({{ dataSource.modelName | pascal}}ConditionVo {{ dataSource.modelName | pascal}}ConditionVo) {
        // 分页获取数据
        Page<{{ dataSource.modelName | pascal}}> {{ dataSource.modelName | pascal}}Page = {{ dataSource.modelName | pascal}}Dao.findByPage(ClaimsDataDTOHandle.getCompanyId(), {{ dataSource.modelName | pascal}}ConditionVo);
        List<{{ dataSource.modelName | pascal}}GetVo> {{ dataSource.modelName | pascal}}GetVos = ModelUtil.copyListProperties({{ dataSource.modelName | pascal}}Page.getContent(), {{ dataSource.modelName | pascal}}GetVo.class);
        // 组装返回的数据集
        {{ dataSource.modelName | pascal}}PageVo {{ dataSource.modelName | pascal}}PageVo = new {{ dataSource.modelName | pascal}}PageVo();
        {{ dataSource.modelName | pascal}}PageVo.setCurrentPage({{ dataSource.modelName | pascal}}ConditionVo.getPageNumber());
        {{ dataSource.modelName | pascal}}PageVo.setPageSize({{ dataSource.modelName | pascal}}ConditionVo.getPageSize());
        {{ dataSource.modelName | pascal}}PageVo.setTotalCount({{ dataSource.modelName | pascal}}Page.getTotalElements());
        {{ dataSource.modelName | pascal}}PageVo.setTotalPages({{ dataSource.modelName | pascal}}Page.getTotalPages());
        {{ dataSource.modelName | pascal}}PageVo.set{{ dataSource.modelName | pascal}}s({{ dataSource.modelName | pascal}}GetVos);
        return {{ dataSource.modelName | pascal}}PageVo;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public ZlinkResult<String> create({{ dataSource.modelName | pascal}}CreateVo {{ dataSource.modelName | pascal}}CreateVo) {
        {{ dataSource.modelName | pascal}} {{ dataSource.modelName | pascal}} = ModelUtil.copyPropertiesIgnoreNull({{ dataSource.modelName | pascal}}CreateVo, new {{ dataSource.modelName | pascal}}());
        {{ dataSource.modelName | pascal}}Dao.save({{ dataSource.modelName | pascal}});
        return ZlinkResult.i18nResult("{{dataSource.properties}}0006", {{ dataSource.modelName | pascal}}.getId());
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public ZlinkResult<String> update({{ dataSource.modelName | pascal}}UpdateVo {{ dataSource.modelName | pascal}}UpdateVo) {
        {{ dataSource.modelName | pascal}} {{ dataSource.modelName | pascal}} = {{ dataSource.modelName | pascal}}Dao.findById({{ dataSource.modelName | pascal}}UpdateVo.getId()).orElse(null);
        if (Objects.isNull({{ dataSource.modelName | pascal}})) {
            // 编辑的{{dataSource.remark}}不存在
            return ZlinkResult.i18nCode("{{dataSource.properties}}0005");
        }
        ModelUtil.copyPropertiesIgnoreNull({{ dataSource.modelName | pascal}}UpdateVo, {{ dataSource.modelName | pascal}});
        {{ dataSource.modelName | pascal}}Dao.save({{ dataSource.modelName | pascal}});
        return ZlinkResult.i18nResult("{{dataSource.properties}}0004", {{ dataSource.modelName | pascal}}.getId());
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public ZlinkResult<Boolean> deleteById(String id) {
        {{ dataSource.modelName | pascal}} {{ dataSource.modelName | pascal}} = {{ dataSource.modelName | pascal}}Dao.findById(id).orElse(null);
        if (Objects.isNull({{ dataSource.modelName | pascal}})) {
            // 删除的{{dataSource.remark}}不存在
            return ZlinkResult.i18nCode("{{dataSource.properties}}0003");
        }
        {{ dataSource.modelName | pascal}}Dao.delete({{ dataSource.modelName | pascal}});
        return ZlinkResult.i18nResult("{{dataSource.properties}}0002",true);
    }
}
