## Vue HCZY Components Docments

### 1.组件名称

_说明：_字典表组件

​				1.全局字典类型枚举: DictionaryEnum

​				2.全局注册字典下拉组件：DictionarySelect

​				3.props说明:

​						(1)mode: antd select mode ,默认default

​						(2) dictionaryType: 字典类型

​						(3) placeholder: 默认 "请选择"

​						(4)insertOptionAll: boolean, 默认 false, 是否插入全部选项(全部 :id: "")

```javascript
// 使用示例
 <a-form-item label="河湖长类型" style="margin-bottom: 0">
     <dictionary-select v-model="queryParam.status" :insert-option-all="true" 
     :dictionary-type="DictionaryEnum.WATER_TYPE">
     </dictionary-select>
 </a-form-item>
```

