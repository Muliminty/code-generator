package com.zkteco.zlink.{{dataSource.modelName | toLowerCase}}.vo;

import com.zkteco.zlink.boot.core.dto.CustomPageable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import java.util.Date;


/**
 * {{dataSource.remark}} {{ dataSource.modelName | pascal}}ConditionVo 类
 *
 * @author generator
 * @date {{dataSource.generatorDate}}
 * @since 1.0.0
 */
@Setter
@Getter
@NoArgsConstructor
@Accessors(chain=true)
public class {{ dataSource.modelName | pascal }}ConditionVo extends CustomPageable {
    {{each dataSource.columns}}
    /** {{$value.title}} */
    private {{$value.dataType}} {{$value.engName}};
    {{/each}}
}
