<template>
  <div class="page-header-index-wide">
    <a-row :gutter="24">
      <a-col :xl="16">
        <a-row :gutter="24">
          <a-col :xl="24">
            <a-card :loading="loading" :bordered="false" :body-style="{padding:0}">
              <div class="salesCard">
                <a-tabs default-active-key="1" size="large" :tab-bar-style="{margin: '0 24px', paddingLeft: '0'}">
                  <div class="extra-wrapper" slot="tabBarExtraContent">
                    <div class="extra-item">
                      <a>昨日</a>
                      <a>本周</a>
                      <a>本月</a>
                    </div>
                    <a-range-picker :style="{width: '160px'}"/>
                  </div>
                  <a-tab-pane loading="true" tab="事件" key="1">
                    <div style="padding: 20px 24px 24px 24px">
                      <EventChart/>
                    </div>
                  </a-tab-pane>
                  <a-tab-pane tab="水质" key="2">
                    <div style="padding: 20px 24px 24px 24px">
                      <WaterChart/>
                    </div>
                  </a-tab-pane>
                  <a-tab-pane loading="true" tab="履职" key="3">
                    <div style="padding: 20px 24px 24px 24px">
                      <ChiefChart/>
                    </div>
                  </a-tab-pane>
                </a-tabs>
              </div>
            </a-card>
          </a-col>
          <a-col :xl="24" style="margin-top: 24px">
            <a-card :loading="loading" :bordered="false" :body-style="{padding:'0'}">
              <div class="salesCard">
                <a-tabs default-active-key="1" size="large" :tab-bar-style="{margin: '0 24px', paddingLeft: '0'}">
                  <a-tab-pane loading="true" tab="河长概览" key="1">
                    <div style="padding: 20px 24px 24px 24px">
                      <a-table rowKey="city" :pagination="false" :columns="chiefColumn" :dataSource="chiefData">
                      </a-table>
                    </div>
                  </a-tab-pane>
                  <a-tab-pane tab="河湖库统计" key="2">
                    <div style="padding: 20px 24px 24px 24px">
                      <a-table rowKey="city" :pagination="false" :columns="riverColumn" :dataSource="riverData">
                      </a-table>
                    </div>
                  </a-tab-pane>
                  <a-tab-pane tab="监测站统计" key="3">
                    <div style="padding: 20px 24px 24px 24px">
                      <a-table :pagination="false" rowKey="city" :columns="monitorColumn" :dataSource="monitorData">
                      </a-table>
                    </div>
                  </a-tab-pane>
                  <a-tab-pane tab="重点项目" key="4">
                    <div style="padding: 20px 24px 24px 24px">
                      <a-table rowKey="city" :columns="projectColumn" :dataSource="projectData">
                      </a-table>
                    </div>
                  </a-tab-pane>
                </a-tabs>
              </div>
            </a-card>
          </a-col>
          <!--          <a-col :xl="8" style="margin-top: 24px">-->
          <!--            <a-card :loading="loading" :bordered="false" title="待办" :body-style="{padding:'0'}">-->
          <!--              <div class="salesCard" style="padding: 0 32px 24px 32px">-->
          <!--              </div>-->
          <!--            </a-card>-->
          <!--          </a-col>-->
        </a-row>
      </a-col>
      <a-col :xl="8">
        <a-row :gutter="24">
          <a-col :xl="24">
            <a-card
              :loading="loading"
              :body-style="{padding:'0 24px',maxHeight:'480px',overflow:'auto'}"
              :bordered="false"
              title="待办">
              <a href="#" slot="extra">更多
                <a-icon type="right"></a-icon>
              </a>
              <div class="content-area">
                <div
                  v-for="item in todoData"
                  :key="item.backlog_id"
                  class="news-item"
                  style="padding: 12px 0;display: flex;justify-content: space-between;align-items: center">
                  <span class="chief-tag" :style="{marginTop:'-2px',alignSelf:'baseline',backgroundColor:tagColor[item.backlog_type]}">{{item.backlog_type}}</span>
                  <div style="flex: 1 0;margin:0 5px">
                    <ellipsis :length="25" tooltip style="color: rgba(0,0,0,0.65);font-weight: 500;font-size: 14px">{{item.backlog_name}}</ellipsis>
                    <div style="padding:5px 0;font-size: 12px;color:rgba(0,0,0,0.45)"><span style="margin-right: 10px">{{item.author}}</span>{{item.publish_time}}</div>
                  </div>
                  <a href="#">
                    处理
                  </a>
                </div>
              </div>
            </a-card>
          </a-col>
          <a-col :xl="24" style="margin-top: 24px">
            <a-card
              :loading="loading"
              :body-style="{padding:'0 24px',maxHeight:'480px',overflow:'auto'}"
              title="新闻"
              :bordered="false">
              <a href="#" slot="extra">更多
                <a-icon type="right"></a-icon>
              </a>
              <div class="content-area">
                <div
                  class="news-item"
                  :key="item.news_id"
                  v-for="item in newsData"
                  style="padding: 12px 0;display: flex;justify-content: space-between;align-items: center">
                  <div
                    class="cover"
                    :style="{width: '100px',height: '61.8px',backgroundPosition:'50%',backgroundSize:'cover',backgroundImage:`url(${item.icon})`}">
                    <!--                    <img style="width: 100%;vertical-align: middle" :src="item.icon">-->
                  </div>
                  <div class="content" style="width: calc(100% - 120px)">
                    <p style="color:rgba(0,0,0,0.65);font-size: 14px;font-weight: 500">
                      <ellipsis :length="30" :tooltip="true">{{ item.news_tittle }}</ellipsis>
                    </p>
                    <div style="display: flex;justify-content: space-between">
                      <div>{{ item.news_type }}</div>
                      <div style="color:rgba(0,0,0,0.45)">{{ item.news_create_at }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </a-card>
          </a-col>
          <a-col :xl="24" style="margin-top: 24px">
            <a-card
              :loading="loading"
              title="通知"
              :bordered="false"
              :body-style="{padding:'0 24px',maxHeight:'480px',overflow:'auto'}">
              <a href="#" slot="extra">更多
                <a-icon type="right"></a-icon>
              </a>
              <a-list :loading="loading" itemLayout="horizontal" :dataSource="noticeData">
                <a-list-item slot="renderItem" slot-scope="item, index">
                  <a-list-item-meta
                    :description="item.inform_time"
                  >
                    <a slot="title" href="#">{{ item.inform_theme }}</a>
                  </a-list-item-meta>
                </a-list-item>
              </a-list>
            </a-card>
          </a-col>
          <a-col :xl="24" style="margin-top: 24px">
            <a-card
              :loading="loading"
              :body-style="{padding:'0 24px',maxHeight:'480px',overflow:'auto'}"
              title="知识库"
              :bordered="false">
              <a href="#" slot="extra">更多
                <a-icon type="right"></a-icon>
              </a>
              <div class="content-area">
                <div
                  class="news-item"
                  v-for="item in knowledgeData"
                  :key="item.repository_id"
                  style="padding: 12px 0;display: flex;justify-content: space-between;align-items: center">
                  <span
                    style="transform: scale(0.8);border-radius: 4px;font-size: 12px;display: inline-block;padding: 4px;background-color: #e5e9ed">{{ item.repository_type }}</span>
                  <a href="#" style="flex:1 0;margin-left: 24px; color: rgba(0,0,0,0.65)">
                    <ellipsis :length="50" tooltip>{{ item.repository_title }}</ellipsis>
                  </a>
                </div>
              </div>
              <div></div>
            </a-card>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  import moment from 'moment'
  import { Ellipsis } from '@/components'
  import { mixinDevice } from '@/utils/mixin'
  import EventChart from '../../components/Hczy/viser/EventChart'
  import WaterChart from '../../components/Hczy/viser/WaterChart'
  import ChiefChart from '../../components/Hczy/viser/ChiefChart'
  import { getTodo, getKnowledge, getNews, getNotice } from '../../api/home'

  export default {
    name: 'Home',
    mixins: [mixinDevice],
    components: {
      WaterChart,
      EventChart,
      ChiefChart,
      Ellipsis
    },
    data () {
      return {
        tagColor: {
          '上级指派': '#FF6010',
          'App上传': '#0D7DD9',
          '公众投诉': '#FF121E'
        },
        knowledgeData: [],
        newsData: [],
        noticeData: [],
        todoData: [],
        chiefData: [],
        riverData: [],
        monitorData: [],
        projectData: [],
        projectColumn: [
          {
            title: '项目',
            dataIndex: 'project',
            width: '45%'
          },
          {
            title: '时间',
            dataIndex: 'time',
            width: '15%'
          },
          {
            title: '进度',
            dataIndex: 'progress',
            width: '10%'
          },
          {
            title: '备注',
            dataIndex: 'note',
            width: '20%'
          }
        ],
        monitorColumn: [
          {
            title: '城市',
            dataIndex: 'city',
            width: '20%'
          },
          {
            title: '水质站',
            dataIndex: 'shuizhi',
            width: '15%'
          },
          {
            title: '视频站',
            dataIndex: 'shipin',
            width: '15%'
          },
          {
            title: '水文站',
            dataIndex: 'shuiwen',
            width: '15%'
          },
          {
            title: '雨量站',
            dataIndex: 'yuliang',
            width: '15%'
          },
          {
            title: '排污口',
            dataIndex: '排污口',
            width: '20%'
          }
        ],
        riverColumn: [
          {
            title: '城市',
            dataIndex: 'city',
            width: '20%'
          },
          {
            title: '河',
            dataIndex: 'he',
            width: '20%'
          },
          {
            title: '湖',
            dataIndex: 'hu',
            width: '20%'
          },
          {
            title: '库',
            dataIndex: 'ku',
            width: '20%'
          }
        ],
        chiefColumn: [
          {
            title: '城市',
            dataIndex: 'city',
            width: '20%'
          },
          {
            title: '总河长',
            dataIndex: 'zonghezhang',
            width: '20%'
          },
          {
            title: '省级河长',
            dataIndex: 'shengjihezhang',
            width: '20%'
          },
          {
            title: '市级河长',
            dataIndex: 'shijihezhang',
            width: '20%'
          },
          {
            title: '区县河长',
            dataIndex: 'qujihezhang',
            width: '20%'
          }
        ],
        loading: true,
        pieStyle: {
          stroke: '#fff',
          lineWidth: 1
        }
      }
    },
    created () {
      fetch('/data/hezhang.json').then(res => res.json()).then(data => {
        this.chiefData = data
      })
      fetch('/data/riverData.json').then(res => res.json()).then(data => {
        this.riverData = data
      })
      fetch('/data/monitor.json').then(res => res.json()).then(data => {
        this.monitorData = data
      })
      fetch('/data/ProjectData.json').then(res => res.json()).then(data => {
        this.projectData = data
      })
      setTimeout(() => {
        this.loading = !this.loading
      }, 1000)
    },
    mounted () {
      getNotice({ page: 1, page_size: 3 }).then(res => {
        this.noticeData = res.data.list
      })
      getTodo({ page: 1, page_size: 3 }).then(res => {
        this.todoData = res.data.list
      })
      getNews({ page: 1, page_size: 3 }).then(res => {
        this.newsData = res.data.list
      })
      getKnowledge({ page: 1, page_size: 4 }).then(res => {
        this.knowledgeData = res.data.list
      })
    }
  }
</script>

<style lang="less" scoped>
  .chief-tag {
    display: inline-block;
    padding: 4px;
    border-radius: 4px;
    font-size: 12px;
    color: #fff;
    transform: scale(0.7);
    background-color: #0088cc;
  }

  .content-area .news-item {
    /*margin-top: 12px;*/
    border-bottom: 1px solid #e8e8e8;
  }

  .content-area .news-item:last-child {
    border-bottom: none;
  }

  .extra-wrapper {
    line-height: 55px;
    padding-right: 24px;

    .extra-item {
      display: inline-block;
      margin-right: 24px;

      a {
        margin-left: 24px;
      }
    }
  }

  .antd-pro-pages-dashboard-analysis-twoColLayout {
    position: relative;
    display: flex;
    display: block;
    flex-flow: row wrap;
  }

  .antd-pro-pages-dashboard-analysis-salesCard {
    height: calc(100% - 24px);

    /deep/ .ant-card-head {
      position: relative;
    }
  }

  .dashboard-analysis-iconGroup {
    i {
      margin-left: 16px;
      color: rgba(0, 0, 0, .45);
      cursor: pointer;
      transition: color .32s;
      color: black;
    }
  }

  .analysis-salesTypeRadio {
    position: absolute;
    right: 54px;
    bottom: 12px;
  }

  .ant-list-item /deep/ .ant-list-item-action {
    margin-left: 24px;
  }

</style>
