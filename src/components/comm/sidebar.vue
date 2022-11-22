<template>
    <el-menu
      default-active="2"
      class="sidebar"
      @open="handleOpen"
      @close="handleClose"
      router>
      <template v-for="item,index in menuList">
        <!-- 含子选项的一级菜单 -->
        <el-submenu :index="item.path" :key="item.path+index" v-if="item.subs">
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{item.title}}</span>
          </template>
          <template v-for="item2,index2 in item.subs">
             <!-- 含子选项的二级菜单 -->
            <el-submenu  :index="item2.path" :key="item2.path+index2" v-if="item2.subs">
              <template slot="title">{{item.title}}</template>
              <el-menu-item :index="item2.path">{{item2.title}}</el-menu-item>
            </el-submenu>
             <!-- 不含子选项的二级菜单 -->
            <el-menu-item :index="item2.path" :key="item2.path+index" v-else>
              <i :class="item2.icon"></i>
              <span slot="title">{{item2.title}}</span>
            </el-menu-item>
          </template>
        </el-submenu>
         <!-- 不含子选项的一级菜单 -->
        <el-menu-item :index="item.path" :key="item.path+index" v-else>
          <i :class="item.icon"></i>
          <span slot="title">{{item.title}}</span>
        </el-menu-item>
      </template>
    </el-menu>
</template>

<script>
import { mapState } from "vuex"
export default {
  name: 'sidebar',
  data () {
    return {
      
    }
  },
  computed: {
    ...mapState({
      'menuList': 'menuList'
    })
  },
  methods:{
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  mounted(){
    console.log(this.menuList)
  }
}
</script>

<style scoped>
.sidebar{
  position: absolute;
  height: 100%;
  width: 200px;
  text-align: left;
}
</style>
