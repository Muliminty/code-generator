package com.zkteco.zlink.{{dataSource.modelName | toLowerCase}}.service.impl;

import com.zkteco.zlink.boot.core.config.ClaimsDataDTOHandle;
import com.zkteco.zlink.boot.core.util.ModelUtil;
import com.zkteco.zlink.boot.core.util.ZlinkResult;
import com.zkteco.zlink.{{dataSource.modelName | toLowerCase}}.dao.{{ dataSource.modelName | pascal}}Dao;
import com.zkteco.zlink.{{dataSource.modelName | toLowerCase}}.model.{{ dataSource.modelName | pascal}};
import com.zkteco.zlink.{{dataSource.modelName | toLowerCase}}.service.{{ dataSource.modelName | pascal}}Service;
import com.zkteco.zlink.{{dataSource.modelName | toLowerCase}}.vo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

/**
 * @Description
 * @Author generator
 * @Date 2024/3/4 16:45
 **/
@Service
public class {{ dataSource.modelName| pascal }}ServiceImpl implements {{ dataSource.modelName | pascal}}Service {

    @Autowired
    private {{ dataSource.modelName | pascal }}Dao {{ dataSource.modelName |pascal }}Dao;


    @Override
    public {{ dataSource.modelName | pascal}}PageVo get{{dataSource.modelName | pascal }}Page({{ dataSource.modelName | pascal}}ConditionVo {{dataSource.modelName}}ConditionVo) {
        // 分页获取数据
        Page<{{ dataSource.modelName | pascal}}> {{ dataSource.modelName | pascal}}Page = {{ dataSource.modelName | pascal}}Dao.findByPage(ClaimsDataDTOHandle.getCompanyId(), {{dataSource.modelName}}ConditionVo);
        List<{{ dataSource.modelName | pascal}}GetVo> {{ dataSource.modelName | pascal}}GetVos = ModelUtil.copyListProperties({{ dataSource.modelName | pascal}}Page.getContent(), {{ dataSource.modelName | pascal}}GetVo.class);
        // 组装返回的数据集
        {{ dataSource.modelName | pascal}}PageVo {{ dataSource.modelName}}PageVo = new {{ dataSource.modelName | pascal}}PageVo();
        {{ dataSource.modelName}}PageVo.setCurrentPage({{dataSource.modelName}}ConditionVo.getPageNumber());
        {{ dataSource.modelName}}PageVo.setPageSize({{dataSource.modelName}}ConditionVo.getPageSize());
        {{ dataSource.modelName}}PageVo.setTotalCount({{ dataSource.modelName | pascal}}Page.getTotalElements());
        {{ dataSource.modelName}}PageVo.setTotalPages({{ dataSource.modelName | pascal}}Page.getTotalPages());
        {{ dataSource.modelName}}PageVo.set{{dataSource.modelName | pascal}}s({{ dataSource.modelName | pascal}}GetVos);
        return {{ dataSource.modelName}}PageVo;
    }

    @Override
    @Transactional
    public ZlinkResult<String> create{{dataSource.modelName | pascal }}({{ dataSource.modelName | pascal}}CreateVo {{dataSource.modelName}}CreateVo) {
        {{ dataSource.modelName | pascal}} {{ dataSource.modelName | pascal}} = ModelUtil.copyPropertiesIgnoreNull({{dataSource.modelName}}CreateVo, new {{ dataSource.modelName | pascal}}());
        {{ dataSource.modelName | pascal}}Dao.save({{ dataSource.modelName | pascal}});
        return ZlinkResult.i18nResult("{{dataSource.properties}}0006", {{ dataSource.modelName | pascal}}.getId());
    }

    @Override
    public {{ dataSource.modelName | pascal}}GetVo get{{dataSource.modelName | pascal }}ById(String id) {
        {{ dataSource.modelName | pascal}}GetVo {{ dataSource.modelName | pascal}}GetVo = null;
        {{ dataSource.modelName | pascal}} {{ dataSource.modelName | pascal}} = {{ dataSource.modelName | pascal}}Dao.findById(id).orElse(null);
        if (Objects.nonNull({{ dataSource.modelName | pascal}})) {
            {{ dataSource.modelName | pascal}}GetVo = ModelUtil.copyPropertiesIgnoreNull({{ dataSource.modelName | pascal}}, new {{ dataSource.modelName | pascal}}GetVo());
        }
        return {{ dataSource.modelName | pascal}}GetVo;
    }

    @Override
    @Transactional
    public ZlinkResult<String> update{{dataSource.modelName | pascal }}(String id, {{ dataSource.modelName | pascal}}UpdateVo {{dataSource.modelName}}UpdateVo) {
        {{ dataSource.modelName | pascal}} {{ dataSource.modelName | pascal}} = {{ dataSource.modelName | pascal}}Dao.findById(id).orElse(null);
        if (Objects.isNull({{ dataSource.modelName | pascal}})) {
            return ZlinkResult.i18nCode("{{dataSource.properties}}0005");
        }
        ModelUtil.copyPropertiesIgnoreNull({{dataSource.modelName}}UpdateVo, {{ dataSource.modelName | pascal}});
        {{ dataSource.modelName | pascal}}Dao.save({{ dataSource.modelName | pascal}});
        return ZlinkResult.i18nResult("{{dataSource.properties}}0004", {{ dataSource.modelName | pascal}}.getId());
    }

    @Override
    @Transactional
    public ZlinkResult delete{{dataSource.modelName | pascal }}(String id) {
        {{ dataSource.modelName | pascal}} {{ dataSource.modelName | pascal}} = {{ dataSource.modelName | pascal}}Dao.findById(id).orElse(null);
        if (Objects.isNull({{ dataSource.modelName | pascal}})) {
            return ZlinkResult.i18nCode("{{dataSource.properties}}0003");
        }
        {{ dataSource.modelName | pascal}}Dao.delete({{ dataSource.modelName | pascal}});
        return ZlinkResult.i18nCode("{{dataSource.properties}}0002");
    }
}
