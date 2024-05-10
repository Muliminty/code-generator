package com.zkteco.zlink.{{dataSource.modelName | toLowerCase}}.vo;

import com.zkteco.zlink.boot.core.dto.PagerResponse;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.util.List;

/**
 * {{dataSource.remark}} {{ dataSource.modelName | pascal}}PageVo类
 *
 * @author generator
 * @date {{dataSource.generatorDate}}
 * @since 1.0.0
 */
@Setter
@Getter
@NoArgsConstructor
@Accessors(chain=true)
public class {{ dataSource.modelName | pascal }}PageVo extends PagerResponse {
    /** 分页数据 */
    List<{{ dataSource.modelName | pascal }}GetVo> {{dataSource.modelName | camel }}s;
}
