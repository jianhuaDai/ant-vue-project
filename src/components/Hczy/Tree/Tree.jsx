import { Menu, Icon, Input } from 'ant-design-vue'

const { Item, ItemGroup, SubMenu } = Menu
const { Search } = Input

export default {
  name: 'Tree',
  props: {
    dataSource: {
      type: Array,
      required: true
    },
    openKeys: {
      type: Array,
      default: () => []
    },
    search: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    openKeys (newVal, oldVal) {
      this.localOpenKeys = newVal.slice(0)
    }
  },
  created () {
    this.localOpenKeys = this.openKeys.slice(0)
  },
  data () {
    return {
      localOpenKeys: []
    }
  },
  methods: {
    handleNewOrEdit (item, isEdit = false) {
      this.$emit('add', item, isEdit)
    },
    handleDel (item) {
      this.$emit('del', item)
    },
    handleSort (item, isUp) {
      this.$emit('sort', item, isUp)
    },
    handleTitleClick (...args) {
      this.$emit('titleClick', { args })
    },

    renderSearch () {
      return (
        <Search
          placeholder="请输入部门搜索"
          style="width: 100%; margin-bottom: 1rem"
        />
      )
    },
    renderIcon (icon) {
      return icon && (<Icon type={icon}/>) || null
    },
    renderOperator (item) {
      return (
        <a-dropdown>
          <a class="btn">
            <a-icon type="ellipsis"/>
          </a>
          <a-menu slot="overlay">
            <a-menu-item key="1" {...{
              on: {
                click: () => this.handleNewOrEdit(item, false)
              }
            }}>
              <a-icon type="usergroup-add"/>
              新增
            </a-menu-item>
            <a-menu-item v-show={item.enterprise_id !== item.dept_id} key="2" {...{
              on: {
                click: () => this.handleNewOrEdit(item, true)
              }
            }}>
              <a-icon type="edit"/>
              编辑
            </a-menu-item>
            <a-menu-item v-show={item.enterprise_id !== item.dept_id} key="3" {...{
              on: {
                click: () => this.handleDel(item)
              }
            }}>
              <a-icon type="usergroup-delete"/>
              删除
            </a-menu-item>
            <a-menu-item v-show={item.enterprise_id !== item.dept_id} key="4" {...{
              on: {
                click: () => this.handleSort(item, true)
              }
            }}>
              <a-icon type="arrow-up"/>
              上移
            </a-menu-item>
            <a-menu-item v-show={item.enterprise_id !== item.dept_id} key="5" {...{
              on: {
                click: () => this.handleSort(item, false)
              }
            }}>
              <a-icon type="arrow-down"/>
              下移
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      )
    },
    renderMenuItem (item) {
      return (
        <Item key={item.dept_id}>
          {this.renderIcon(item.icon || 'team')}
          {item.dept_name}
          {this.renderOperator(item)}
        </Item>
      )
    },
    renderItem (item) {
      return item.department_list.length > 0 ? this.renderSubItem(item, item.dept_id) : this.renderMenuItem(item, item.dept_id)
    },
    renderItemGroup (item) {
      const childrenItems = item.department_list.map(o => {
        return this.renderItem(o, o.dept_id)
      })

      return (
        <ItemGroup key={item.dept_id}>
          <template slot="title">
            <span>{item.dept_name}</span>
            <a-dropdown>
              <a class="btn">
                <a-icon type="ellipsis"/>
              </a>
              <a-menu slot="overlay">
                <a-menu-item key="1">新增
                </a-menu-item>
                <a-menu-item key="2">编辑</a-menu-item>
                <a-menu-item key="3">删除</a-menu-item>
              </a-menu>
            </a-dropdown>
          </template>
          {childrenItems}
        </ItemGroup>
      )
    },
    renderSubItem (item, key) {
      const childrenItems = item.department_list.length > 0 && item.department_list.map(o => {
        return this.renderItem(o, o.dept_id)
      })

      const title = (
        <span slot="title" onclick={() => this.$emit('titleClick', item)}>
          {this.renderIcon(item.icon || 'team')}
          <span>{item.dept_name}</span>
          {this.renderOperator(item)}
        </span>
      )

      if (item.group > 0) {
        return this.renderItemGroup(item)
      }
      // titleClick={this.handleTitleClick(item)}
      return (
        <SubMenu key={item.dept_id}>
          {title}
          {childrenItems}
        </SubMenu>
      )
    }
  },
  render () {
    const { dataSource, search } = this.$props
    const list = dataSource.map(item => {
      return this.renderItem(item)
    })

    return (
      <div class="tree-wrapper">
        {search ? this.renderSearch() : null}
        <Menu mode="inline" class="custom-tree" {...{
          on: {
            click: item => this.$emit('click', item),
            'update:openKeys': val => {
              this.localOpenKeys = val
            }
          }
        }} openKeys={this.localOpenKeys}>
          {list}
        </Menu>
      </div>
    )
  }
}
