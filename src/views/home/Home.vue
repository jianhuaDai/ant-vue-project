<template>
  <div class="page-header-index-wide">
    <a-row :gutter="24">
      <a-col :xl="16">
        <a-row :gutter="24">
          <a-col :xl="24">
            <a-card :loading="loading" :bordered="false" :body-style="{ padding: 0 }">
              <div class="salesCard">
                <a-tabs default-active-key="1" size="large" :tab-bar-style="{ margin: '0 24px', paddingLeft: '0' }">
                  <div class="extra-wrapper" slot="tabBarExtraContent">
                    <div class="extra-item">
                      <a>昨日</a>
                      <a>本周</a>
                      <a>本月</a>
                    </div>
                    <a-range-picker :style="{ width: '160px' }" />
                  </div>
                  <a-tab-pane loading="true" tab="事件" key="1">
                    <div style="padding: 20px 24px 24px 24px">
                      <EventChart />
                    </div>
                  </a-tab-pane>
                  <a-tab-pane tab="水质" key="2">
                    <div style="padding: 20px 24px 24px 24px">
                      <WaterChart />
                    </div>
                  </a-tab-pane>
                  <a-tab-pane loading="true" tab="履职" key="3">
                    <div style="padding: 20px 24px 24px 24px">
                      <ChiefChart />
                    </div>
                  </a-tab-pane>
                </a-tabs>
              </div>
            </a-card>
          </a-col>
          <a-col :xl="24" style="margin-top: 24px">
            <a-card :loading="loading" :bordered="false" :body-style="{ padding: '0' }">
              <div class="salesCard">
                <a-tabs default-active-key="1" size="large" :tab-bar-style="{ margin: '0 24px', paddingLeft: '0' }">
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
                      <a-table rowKey="city" :columns="projectColumn" :dataSource="projectData"> </a-table>
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
              :body-style="{ padding: '0 24px', maxHeight: '480px', overflow: 'auto' }"
              :bordered="false"
              title="待办"
            >
              <a
href="#"
slot="extra"
              >更多
                <a-icon type="right"></a-icon>
              </a>
              <div class="content-area">
                <div
                  v-for="item in todoData"
                  :key="item.backlog_id"
                  class="news-item"
                  style="padding: 12px 0;display: flex;justify-content: space-between;align-items: center"
                >
                  <span
                    class="chief-tag"
                    :style="{ marginTop: '-2px', alignSelf: 'baseline', backgroundColor: tagColor[item.backlog_type] }"
                  >{{ item.backlog_type }}</span
                  >
                  <div style="flex: 1 0;margin:0 5px">
                    <ellipsis :length="25" tooltip style="color: rgba(0,0,0,0.65);font-weight: 500;font-size: 14px">{{
                      item.backlog_name
                    }}</ellipsis>
                    <div style="padding:5px 0;font-size: 12px;color:rgba(0,0,0,0.45)">
                      <span style="margin-right: 10px">{{ item.author }}</span
                      >{{ item.publish_time }}
                    </div>
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
              :body-style="{ padding: '0 24px', maxHeight: '480px', overflow: 'auto' }"
              title="新闻"
              :bordered="false"
            >
              <a
href="#"
slot="extra"
              >更多
                <a-icon type="right"></a-icon>
              </a>
              <div class="content-area">
                <div
                  class="news-item"
                  :key="item.news_id"
                  v-for="item in newsData"
                  style="padding: 12px 0;display: flex;justify-content: space-between;align-items: center"
                >
                  <div
                    class="cover"
                    :style="{
                      width: '100px',
                      height: '61.8px',
                      backgroundPosition: '50%',
                      backgroundSize: 'cover',
                      backgroundImage: `url(${item.icon})`
                    }"
                  >
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
              :body-style="{ padding: '0 24px', maxHeight: '480px', overflow: 'auto' }"
            >
              <a
href="#"
slot="extra"
              >更多
                <a-icon type="right"></a-icon>
              </a>
              <a-list :loading="loading" itemLayout="horizontal" :dataSource="noticeData">
                <a-list-item slot="renderItem" slot-scope="item, index">
                  <a-list-item-meta :description="item.inform_time">
                    <a slot="title" href="#">{{ item.inform_theme }}</a>
                  </a-list-item-meta>
                </a-list-item>
              </a-list>
            </a-card>
          </a-col>
          <a-col :xl="24" style="margin-top: 24px">
            <a-card
              :loading="loading"
              :body-style="{ padding: '0 24px', maxHeight: '480px', overflow: 'auto' }"
              title="知识库"
              :bordered="false"
            >
              <a
href="#"
slot="extra"
              >更多
                <a-icon type="right"></a-icon>
              </a>
              <div class="content-area">
                <div
                  class="news-item"
                  v-for="item in knowledgeData"
                  :key="item.repository_id"
                  style="padding: 12px 0;display: flex;justify-content: space-between;align-items: center"
                >
                  <span
                    style="transform: scale(0.8);border-radius: 4px;font-size: 12px;display: inline-block;padding: 4px;background-color: #e5e9ed"
                  >{{ item.repository_type }}</span
                  >
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
        上级指派: '#FF6010',
        App上传: '#0D7DD9',
        公众投诉: '#FF121E'
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
    fetch('/data/hezhang.json')
      .then(res => res.json())
      .then(data => {
        this.chiefData = data
      })
    fetch('/data/riverData.json')
      .then(res => res.json())
      .then(data => {
        this.riverData = data
      })
    fetch('/data/monitor.json')
      .then(res => res.json())
      .then(data => {
        this.monitorData = data
      })
    fetch('/data/ProjectData.json')
      .then(res => res.json())
      .then(data => {
        this.projectData = data
      })
    setTimeout(() => {
      this.loading = !this.loading
    }, 1000)
  },
  mounted () {
    const noticeData = {
      data: {
        list: [
          {
            create_at: '2020-04-15',
            delete_at: '',
            inform_content: '4月20日上午在第一会议室召开河长制会议',
            inform_id: '130513455491842049',
            inform_theme: '请按时参加4月20日的河长制会议',
            inform_time: '2020-04-20',
            inform_type: '参会通知',
            location_info: '',
            update_at: ''
          },
          {
            create_at: '2020-04-22',
            delete_at: '',
            inform_content: '4月25日下午在四楼大会议室召开汛期防汛部署会议',
            inform_id: '130539048597979137',
            inform_theme: '请按时参加4月25日的防汛会议',
            inform_time: '2020-04-25',
            inform_type: '参会通知',
            location_info: '',
            update_at: ''
          },
          {
            create_at: '2020-04-16',
            delete_at: '',
            inform_content: '4月21日上午随同领导班子江宁区视察防汛',
            inform_id: '130545334483943425',
            inform_theme: '4月21日江宁区视察',
            inform_time: '2020-04-21',
            inform_type: '视察通知',
            location_info: '',
            update_at: ''
          }
        ],
        pager: { page: 1, page_size: 3, total: 6 }
      },
      msg: 'ok',
      code: 0
    }
    const data = {
      data: {
        list: [
          {
            author: '孙乾芳',
            backlog_id: '1',
            backlog_name: '南京市河长办发文申请',
            backlog_type: '上级指派',
            location_info: '',
            publish_time: '2020-04-19',
            status: '1'
          },
          {
            author: '李有名',
            backlog_id: '2',
            backlog_name: '徐州市河长办发文申请',
            backlog_type: '上级指派',
            location_info: '',
            publish_time: '2020-04-18',
            status: '1'
          },
          {
            author: '顾伟涛',
            backlog_id: '3',
            backlog_name: '视察秦淮河段异常督办',
            backlog_type: '公众投诉',
            location_info: '',
            publish_time: '2020-04-16',
            status: '1'
          }
        ],
        pager: { page: 1, page_size: 3, total: 5 }
      },
      msg: 'ok',
      code: 0
    }

    const newsData = {
      data: {
        list: [
          {
            icon: 'https://oos-cn.ctyunapi.cn/river-chief/34fa70ca33ebb1a84692a269d6b50336.jpg',
            location_info: '',
            news_content: '秦淮河水域建设卓现成效，省领导亲自视察',
            news_create_at: '2020-04-15',
            news_id: '130513509162156033',
            news_tittle: '河长制领导巡查秦淮河',
            news_type: '水利要闻',
            news_update_at: ''
          },
          {
            icon: 'https://oos-cn.ctyunapi.cn/river-chief/416e763c711560962651c2c1aa0f5f2a.jpg',
            location_info: '',
            news_content: '为应对环境污染的需要，经中央决定执行河长制制度，切实维护好青山绿水',
            news_create_at: '2020-04-15',
            news_id: '130513531492630529',
            news_tittle: '加强水环境治理',
            news_type: '时政要闻',
            news_update_at: ''
          },
          {
            icon: 'https://oos-cn.ctyunapi.cn/river-chief/becc35873c46e8fe29c0c094a565548d.jpg',
            location_info: '',
            news_content:
              '江苏省政府就“全面推行河长制”召开新闻发布会，江苏省水利厅、江苏省环保厅、江苏省住建厅及江苏省太湖办等多部门与会',
            news_create_at: '2020-04-15',
            news_id: '130513560248778753',
            news_tittle: '江苏10万条河都要有河长 省长“挂帅”任总河长',
            news_type: '时政要闻',
            news_update_at: ''
          }
        ],
        pager: { page: 1, page_size: 3, total: 12 }
      },
      msg: 'ok',
      code: 0
    }

    const knowledgeData = {
      data: {
        list: [
          {
            create_at: '2020-04-10T09:58:28+08:00',
            delete_at: '0001-01-01T00:00:00Z',
            location_info: '',
            repository_content: '长110公里，中国长江下游右岸支流。古称龙藏浦，汉代起称淮水，唐以后改称秦淮。',
            repository_id: '130514765708525569',
            repository_title: '秦淮河',
            repository_type: '河流信息',
            update_at: '0001-01-01T00:00:00Z'
          },
          {
            create_at: '2020-04-15T14:33:28+08:00',
            delete_at: '0001-01-01T00:00:00Z',
            location_info: '',
            repository_content:
              '高淳区\t龙墩河\t中型\t甘晓辉\t高淳区人民政府\t副区长\t史建兵\t高淳区水务局\t局长\t孔旺才\t南京市龙墩河水库管理所\t所长',
            repository_id: '130514795001544705',
            repository_title: '南京水库安全责任人',
            repository_type: '水库信息',
            update_at: '0001-01-01T00:00:00Z'
          },
          {
            create_at: '2020-04-12T14:34:48+08:00',
            delete_at: '0001-01-01T00:00:00Z',
            location_info: '',
            repository_content:
              '宜兴市\t横山\t大（2）型\t张立军\t宜兴市人民政府\t市长\t蒋华平\t宜兴市水利局\t局长\t陈淑云\t宜兴市横山水库管理所\t所长\r\n宜兴市\t油车\t中型\t周峰\t宜兴市人民政府\t副市长\t蒋华平\t宜兴市水利局\t局长\t吴耀平\t宜兴市油车水库管理所\t所长\r\n',
            repository_id: '130514809278955521',
            repository_title: '无锡市水库安全责任人',
            repository_type: '水库信息',
            update_at: '0001-01-01T00:00:00Z'
          },
          {
            create_at: '2020-04-15T09:58:56+08:00',
            delete_at: '0001-01-01T00:00:00Z',
            location_info: '',
            repository_content: '长江流经南京段大约70公里',
            repository_id: '130514849946927105',
            repository_title: '长江流经南京段多少公里',
            repository_type: '河流信息',
            update_at: '0001-01-01T00:00:00Z'
          }
        ],
        pager: { page: 1, page_size: 4, total: 13 }
      },
      msg: 'ok',
      code: 0
    }
    // getNotice({ page: 1, page_size: 3 }).then(res => {
    //   this.noticeData = res.data.list
    // })

    // getNews({ page: 1, page_size: 3 }).then(res => {
    //   this.newsData = res.data.list
    // })
    // getKnowledge({ page: 1, page_size: 4 }).then(res => {
    //   this.knowledgeData = res.data.list
    // })
    this.noticeData = noticeData.data.list

    this.todoData = data.data.list

    this.newsData = newsData.data.list

    this.knowledgeData = knowledgeData.data.list
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
    color: rgba(0, 0, 0, 0.45);
    cursor: pointer;
    transition: color 0.32s;
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
