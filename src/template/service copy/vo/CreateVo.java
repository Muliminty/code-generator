package com.zkteco.zlink.{{dataSource.modelName | toLowerCase}}.vo;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import java.util.Date;
import javax.validation.constraints.*;

/**
 * {{dataSource.remark}} {{ dataSource.modelName | pascal}}CreateVo类
 *
 * @author generator
 * @date {{dataSource.generatorDate}}
 * @since 1.0.0
 */
@Setter
@Getter
@NoArgsConstructor
@Accessors(chain=true)
public class {{ dataSource.modelName | pascal }}CreateVo {
    {{each dataSource.columns}}{{if $value.dataType=='String'}}
    /** {{$value.title}} */
    @NotBlank(message = "")
    private {{$value.dataType}} {{$value.engName}};{{else if $value.dataType=='Integer'}}
    /** {{$value.title}} */
    @NotNull(message = "")
    private {{$value.dataType}} {{$value.engName}};{{else}}
    /** {{$value.title}} */
    private {{$value.dataType}} {{$value.engName}};{{/if}}
    {{/each}}
}
