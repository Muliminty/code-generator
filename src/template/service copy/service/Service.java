package com.zkteco.zlink.{{dataSource.modelName | toLowerCase}}.service;

import com.zkteco.zlink.boot.core.util.ZlinkResult;
import com.zkteco.zlink.{{dataSource.modelName | toLowerCase}}.vo.*;


/**
 * {{dataSource.remark}} {{ dataSource.modelName | pascal}}Service类
 *
 * @author generator
 * @date {{dataSource.generatorDate}}
 * @since 1.0.0
 */
public interface {{ dataSource.modelName | pascal }}Service {

    /**
     * 通过id获取详情
     *
     * @param id : 主键
     * @author  generator
     * @date  {{dataSource.generatorDate}}
     * @since 1.0.0
     */
    {{ dataSource.modelName | pascal }}GetVo findById(String id);

    /**
     * 分页获取列表
     * 
     * @param {{ dataSource.modelName | pascal }}ConditionVo : 查询条件
     * @author  generator
     * @date  {{dataSource.generatorDate}}
     * @since 1.0.0
     */
    {{ dataSource.modelName | pascal }}PageVo findByPage({{ dataSource.modelName | pascal }}ConditionVo {{ dataSource.modelName | camel }}ConditionVo);

    /**
     * 创建{{dataSource.remark}}
     * 
     * @param {{dataSource.modelName | pascal}}CreateVo : 创建参数
     * @return String
     * @author generator
     * @date  {{dataSource.generatorDate}}
     * @since 1.0.0
     */
    ZlinkResult<String> create({{ dataSource.modelName | pascal}}CreateVo {{ dataSource.modelName | camel}}CreateVo);

    /**
     * 编辑{{dataSource.remark}}
     *
     * @param {{dataSource.modelName | pascal}}UpdateVo : 编辑参数
     * @author  generator
     * @date  {{dataSource.generatorDate}}
     * @since 1.0.0
     */
    ZlinkResult<String> update({{ dataSource.modelName | pascal }}UpdateVo {{ dataSource.modelName | camel}}UpdateVo);

    /**
     * 删除{{dataSource.remark}}
     *
     * @param id : 主键
     * @author  generator
     * @date  {{dataSource.generatorDate}}
     * @since 1.0.0
     */
    ZlinkResult<Boolean> deleteById(String id);
}
