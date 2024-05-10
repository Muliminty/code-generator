package com.zkteco.zlink.{{dataSource.modelName | toLowerCase}}.model;

import com.zkteco.zlink.boot.core.model.BaseModel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.Date;

/**
 * {{dataSource.remark}} {{ dataSource.modelName | pascal}}实体类
 *
 * @author generator
 * @date {{dataSource.generatorDate}}
 * @since 1.0.0
 */
@Entity
@Table(name = "{{dataSource.modelName | constant}}")
@Setter
@Getter
@Accessors(chain=true)
public class {{ dataSource.modelName | pascal}} extends BaseModel implements Serializable {
    private static final long serialVersionUID = 1L;
    {{each dataSource.columns}}{{if $value.dataType == 'String'}}
    /** {{$value.title}} */
    @Column(name = "{{$value.engName | constant}}", length = {{$value.dataLength}})
    private {{$value.dataType}} {{$value.engName}};
    {{ else }}
    /** {{$value.title}} */
    @Column(name = "{{$value.engName | constant}}")
    private {{$value.dataType}} {{$value.engName}};
    {{/if}}{{/each}}
}
