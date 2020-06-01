## Web界面开发注意事项(待完善)

###1. 模态框:

#####（1）一列布局：模态框宽度 60%

#####（2）两列布局:
			1. 模态框 width:70%
			2. 两列栅格统一：
					 <a-row :gutter="24"> 
					 <a-col :md="12" :sm="24">
			3. form-item:
				  	:label-col="{span:6}"
	          :wrapper-col="{span:18}" 

### 2. 列表界面：
##### （1）左边查询 右边列表示例:
```html
<template>
	<div style="height: 100%">
		 <a-row :gutter="8" style="height: 100%">
		     <a-col :span="6" style="height: 100%">
        		<a-card :bordered="false" title="区域" style="height: 100%">
       		  </a-card>
       	 </a-col>
       	 <a-col :span="18" style="height: 100%">
						<a-card :bordered="false">
						</a-card>
						 <a-card :bordered="false" style="margin-top: 8px;height: calc(100% - 88px)" title="查询列表">
						 </a-card>
						 <a-button 
						 slot="extra" 
						 type="primary" 
						 icon="plus" @click="handleEditOrNew()">
						 新增</a-button>
				 </a-col> 
			</a-row>
	</div>
</template>
```
