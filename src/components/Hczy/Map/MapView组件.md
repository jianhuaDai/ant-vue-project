## MapView(地图组件)
### props:
####1. options
__地图配置：:__ 
```javascript
     		{
            center: [
              119.91202398644623,
              32.41659873015716
            ],
            style: Style.chiefStyle,

            zoom: 6.5,
            minZoom: 6,
            maxZoom: 18,
            pitch: 0,
            bearing: 0,
            attributionControl: false
          },
```

####2. drawOptions
__map draw 配置__
```javascript
					{
              position: 'top-right', // 工具栏位置
              displayControlsDefault: false, //是否显示默认工具
              controls: { point: true, trash: true, polygon: true, line_string: true } 
            }
```
### events:
**事件回调参数 e 包含feature 信息**

####1. draw.create

####2. draw.delete

………………

### 获取 draw 实例:
*** Scene.mapDraw ***


