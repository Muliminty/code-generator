package com.zkteco.zlink.{{dataSource.modelName | toLowerCase}}.controller;

import com.zkteco.zlink.boot.core.constants.BaseConstants;
import com.zkteco.zlink.boot.core.util.ZlinkResult;
import com.zkteco.zlink.{{dataSource.modelName | toLowerCase}}.service.{{ dataSource.modelName | pascal }}Service;
import com.zkteco.zlink.{{dataSource.modelName | toLowerCase}}.vo.*;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Objects;

/**
 * @Description
 * @Author generator
 * @Date 2024/3/5 9:50
 **/
@RestController
@RequestMapping(BaseConstants.API_VERSION + "/{{dataSource.modelName | toLowerCase}}")
@CrossOrigin(origins = "*")
public class {{ dataSource.modelName | pascal }}Controller {

    @Autowired
    private {{ dataSource.modelName | pascal }}Service {{ dataSource.modelName | pascal }}Service;

    @Operation(summary = "分页获取列表")
    @ApiOperation(value = "Get {{ dataSource.modelName | pascal }} List Page", httpMethod = "POST", response = ZlinkResult.class)
    @PostMapping("/page")
    public ZlinkResult get{{ dataSource.modelName | pascal }}Page(@Valid @RequestBody {{ dataSource.modelName | pascal }}ConditionVo {{ dataSource.modelName | pascal }}ConditionVo) {
        {{ dataSource.modelName | pascal }}PageVo {{ dataSource.modelName | pascal }}PageVo = {{ dataSource.modelName | pascal }}Service.get{{ dataSource.modelName | pascal }}Page({{ dataSource.modelName | pascal }}ConditionVo);
        return ZlinkResult.i18nResult("{{dataSource.properties}}0000", {{ dataSource.modelName | pascal }}PageVo);
    }

    @Operation(summary = "创建")
    @ApiOperation(value = "Create {{ dataSource.modelName | pascal }}", httpMethod = "POST", response = ZlinkResult.class)
    @PostMapping("/create")
    public ZlinkResult create{{ dataSource.modelName | pascal }}(@Valid @RequestBody {{ dataSource.modelName | pascal }}CreateVo {{ dataSource.modelName | pascal }}CreateVo) {
        return {{ dataSource.modelName | pascal }}Service.create{{ dataSource.modelName | pascal }}({{ dataSource.modelName | pascal }}CreateVo);
    }

    @Operation(summary = "获取详情")
    @ApiOperation(value = " Get {{ dataSource.modelName | pascal }} Info", httpMethod = "GET", response = ZlinkResult.class)
    @GetMapping("/{{dataSource.modelName}}/{id}")
    public ZlinkResult get{{ dataSource.modelName | pascal }}ById(@PathVariable String id) {
        // 不存在
        ZlinkResult zlinkResult = ZlinkResult.i18nCode("{{dataSource.properties}}0000");
        {{ dataSource.modelName | pascal }}GetVo {{ dataSource.modelName | pascal }}GetVo = {{ dataSource.modelName | pascal }}Service.get{{ dataSource.modelName | pascal }}ById(id);
        if (Objects.nonNull({{ dataSource.modelName | pascal }}GetVo)) {
            zlinkResult = ZlinkResult.i18nResult("{{dataSource.properties}}0001", {{ dataSource.modelName | pascal }}GetVo);
        }
        return zlinkResult;
    }

    @Operation(summary = "更新")
    @ApiOperation(value = "Update {{ dataSource.modelName | pascal }}", httpMethod = "PUT", response = ZlinkResult.class)
    @PutMapping("/update/{id}")
    public ZlinkResult create{{ dataSource.modelName | pascal }}(@PathVariable String id,
                @RequestBody {{ dataSource.modelName | pascal }}UpdateVo {{ dataSource.modelName | pascal }}UpdateVo) {
        return {{ dataSource.modelName | pascal }}Service.update{{ dataSource.modelName | pascal }}(id, {{ dataSource.modelName | pascal }}UpdateVo);
    }

    @Operation(summary = "删除")
    @ApiOperation(value = "Delete {{ dataSource.modelName | pascal }}", httpMethod = "DELETE", response = ZlinkResult.class)
    @DeleteMapping("/delete/{id}")
    public ZlinkResult delete{{ dataSource.modelName | pascal }}(@PathVariable String id) {
        return {{ dataSource.modelName | pascal }}Service.delete{{ dataSource.modelName | pascal }}(id);
    }
}
