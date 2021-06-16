<template>
  <h-page-container>
    <h-page-header :breadcrumb="breadcrumb" />
    <h-page-content v-if="!!scenceList.length">
      <h-page-action v-if="!choseAction" class="scene_action">
        <el-button icon="h-icon-add" @click="addScence(null)">添加</el-button>
        <el-button icon="h-icon-delete" @click="choseAction = '删除'">删除</el-button>
        <el-button icon="h-icon-enable" @click="choseAction = '启用'">启用</el-button>
        <el-button icon="h-icon-disable" @click="choseAction = '禁用'">禁用</el-button>
        <template slot="rightAction" class="right-action">
          <el-select
            v-model.trim="searchParams.configState"
            class="camera-select"
            placeholder="运行状态"
            clear
            filterable
            @change="getSceneList"
          >
            <el-option value="0" label="全部"></el-option>
            <el-option value="1" label="已启用"></el-option>
            <el-option value="2" label="已禁用"></el-option>
          </el-select>
          <!-- 场景名称 -->
          <el-input
            v-model="searchParams.scenceName"
            class="camera-search"
            tips="请输入场景名称"
            placeholder="请输入场景名称"
            suffix-icon="h-icon-search"
            :on-icon-click="getSceneList"
            @keyup.enter.native="getSceneList()"
          ></el-input>
        </template>
      </h-page-action>
      <h-page-action v-else class="scene_action">
        <el-checkbox v-model="isSelectAll" @change="selectAll">全选本页</el-checkbox>
        <span>
          当前已选择
          <b>{{ multiSelection.length }}</b>
          条
        </span>
        <template slot="rightAction" class="right-action">
          <span>
            请选择需要
            <b>{{ choseAction }}</b>
            的结果
          </span>
          <el-button size="middle" @click="dealScence">确定</el-button>
          <el-button size="middle" @click="choseAction = ''">取消</el-button>
        </template>
      </h-page-action>
      <div class="i-scene">
        <el-scrollbar wrap-class="scrollbar-wrap" @on-scrolling-y="getSceneList">
          <div class="i-scene-list">
            <div
              v-for="item in scenceList"
              :key="item.id"
              class="i-scene-list_card"
              @mouseover="handleMoveOverItem(item)"
              @mouseout="handleMoveOverItem(null)"
            >
              <!-- <div class="card-item-wrapper" v-show="!!choseAction" @click="choseScence(item)"></div> -->
              <span id="cardMessage">
                {{ item.id }}
              </span>
              <div
                :class="{
                  'card-btns-wrapper': true,
                  'z-active': moveOverIndex === item.id
                }"
              >
                <el-button size="small" @click="addScence(item)">编辑</el-button>
                <el-button size="small" @click="addScence(item)">复制</el-button>
                <el-button size="small" @click="startScence(item)">启用</el-button>
              </div>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </h-page-content>
    <h-page-content v-else>
      <h-empty>
        <template #title>暂无预置场景, 请添加</template>
        <template #description>
          <el-button type="text" @click="addScence()">添加预置场景</el-button>
        </template>
      </h-empty>
    </h-page-content>
    <el-dialog title="场景基本信息" :area="[500, 400]" top="middle" :visible.sync="dialogFormVisible">
      <el-form :model="currentScence" label-width="100px" label-position="top">
        <el-form-item label="预警类型" required>
          <el-select v-model="currentScence.character" multiple placeholder="请选择" :multiple-limit="4">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="场景名称" required>
          <el-input v-model="currentScence.name"></el-input>
        </el-form-item>
        <el-form-item label="场景描述" required>
          <el-input v-model="currentScence.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editScence">确 定</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </h-page-container>
</template>
<script>
// 测试数据
const scenceList = [
  {
    id: 0,
    name: '换装布控',
    character: ['人脸', '人体', '车辆'],
    description: 'fehghege',
    task: '5',
    createUser: 'admin',
    time: 'grgeh'
  },
  {
    id: 1,
    name: '换装布控',
    character: ['人脸', '人体'],
    description: '这是八六八巴拉巴拉',
    task: '5',
    createUser: 'admin',
    time: 'grgeh'
  },
  {
    id: 2,
    name: '换装布控',
    character: ['人脸', '人体'],
    description: '这是八六八巴拉巴拉',
    task: '5',
    createUser: 'admin',
    time: 'grgeh'
  },
  {
    id: 3,
    name: '换装布控',
    character: ['人脸', '人体'],
    description: '这是八六八巴拉巴拉',
    task: '5',
    createUser: 'admin',
    time: 'grgeh'
  },
  {
    id: 4,
    name: '换装布控',
    character: ['人脸', '人体'],
    description: '这是八六八巴拉巴拉',
    task: '5',
    createUser: 'admin',
    time: 'grgeh'
  },
  {
    id: 5,
    name: '换装布控',
    character: ['人脸', '人体'],
    description: '这是八六八巴拉巴拉',
    task: '5',
    createUser: 'admin',
    time: 'grgeh'
  },
  {
    id: 6,
    name: '换装布控',
    character: ['人脸', '人体'],
    description: '这是八六八巴拉巴拉',
    task: '5',
    createUser: 'admin',
    time: 'grgeh'
  },
  {
    id: 7,
    name: '换装布控',
    character: ['人脸', '人体'],
    description: '这是八六八巴拉巴拉',
    task: '5',
    createUser: 'admin',
    time: 'grgeh'
  },
  {
    id: 8,
    name: '换装布控',
    character: ['人脸', '人体'],
    description: '这是八六八巴拉巴拉',
    task: '5',
    createUser: 'admin',
    time: 'grgeh'
  }
];
export default {
  name: 'ScenceConfig',
  props: {},
  data() {
    return {
      breadcrumb: ['系统管理', '应用配置中心', '智能预警管理', '预警策略配置'],
      searchParams: {
        scenceName: '', // 过滤的场景名
        configState: '' // 过滤的场景名
      },
      multiSelection: [], // 选中的场景列表
      dialogFormVisible: false,
      choseAction: '',
      isSelectAll: false,
      scenceList: scenceList, // 所有的场景列表
      options: [
        { label: '人脸', value: '人脸' },
        { label: '人体', value: '人体' },
        { label: '人证', value: '人证' },
        { label: '车辆', value: '车辆' }
      ],
      // 当前场景
      currentScence: {
        name: '',
        character: [],
        description: ''
      },
      currentPage: 1, // 当前页面
      moveOverIndex: '' // 鼠标移入的当前场景下标
    };
  },
  watch: {
    // 监听当前页数  页数大于1 出现置顶图标  小于1 图标消失
  },
  methods: {
    addScence(item) {
      this.dialogFormVisible = true;
      this.currentScence = item || this.currentScence;
    },
    getSceneList(object, condition) {
      // 第一个参数为滚动条滚动数据对象， 第二个参数为过滤条件
      // 滚动条滚动到底/过滤/刷新都用这个方法调接口请求数据
      // 1 当object中的percentY为1时表明为 滚动条滚动到底部应该请求后台数据
      // 2 判断所有条数是否展示完毕,完毕则不发生数据请求,无则请求前几页数据
      // 3 当前展示数据改变  改变页数
      // if (object.percentY === 1) {
      // }
    },
    handleMoveOverItem(item) {
      this.moveOverIndex = item && !this.choseAction.length ? item.id : '';
    },
    startScence(item) {
      // this.visible = true;
      this.$router.push({
        name: 'strategyConfig',
        query: {
          id: '1'
        }
      });
      // 启动当前场景
      // 调接口
    },
    editScence() {
      // 路由跳转到编辑场景界面  并传值到编辑场景界面
      this.dialogFormVisible = false;
    },
    selectAll(value) {
      // 根据isSelectAll的值进行判断是否全选
    },
    dealScence() {
      this.$confirm(`确定删除已选 ${this.multiSelection.length} 个场景?`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        onConfirm: () => {
          // 根据choseAction 的值进行删除/启用/禁用 操作  包括接口请求等
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        },
        onCancel: () => {
          this.$message({
            type: 'success',
            message: '已取消删除!'
          });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
// 样式先这样了，等视觉再改
.scene_action {
  .camera-search {
    width: 225px;
    margin-left: 10px;
  }
  .camera-select {
    width: 135px;
    margin-left: 20px;
  }
  ::v-deep .h-page-action__main {
    border-bottom-width: 0;
  }
}
.i-scene {
  position: relative;
  height: calc(100% - 44px);
  ::v-deep .scrollbar-wrap {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  &-list {
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
    // justify-content: center;
    &_card {
      position: relative;
      width: 390px;
      height: 230px;
      margin: 15px;
      border: 1px solid black;
      box-sizing: border-box;
      flex: 0 0 390px;
      // 覆盖层阻止页面点击事件。
      // .card-item-wrapper{
      //   width: 200px;
      //   height: 300px;
      //   background-color: rgba(255, 255, 255, 0.5);;
      //   position: absolute;
      //   top: 0px;
      //   left: 0px;
      // }
      .card-btns-wrapper {
        position: absolute;
        z-index: 100;
        bottom: 0;
        overflow: hidden;
        width: 100%;
        height: 0 !important;
        border-bottom: 0;
        background-color: #ccc;
        text-align: center;
        transition: height 0.2s;
        &.z-active {
          height: 40px !important;
          padding: 2px;
        }
      }
    }
  }
}
</style>
