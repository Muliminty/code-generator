package com.zkteco.zlink.{{dataSource.modelName | toLowerCase}}.vo;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import java.util.Date;

/**
 * {{dataSource.remark}} {{ dataSource.modelName | pascal}}GetVo类
 *
 * @author generator
 * @date {{dataSource.generatorDate}}
 * @since 1.0.0
 */
@Setter
@Getter
@NoArgsConstructor
@Accessors(chain=true)
public class {{ dataSource.modelName | pascal }}GetVo {

    /** id */
    private String id;

    /** companyId */
    private String companyId;
    {{each dataSource.columns}}
    /** {{$value.title}} */
    private {{$value.dataType}} {{$value.engName}};
    {{/each}}
}
