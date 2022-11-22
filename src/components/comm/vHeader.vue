<template>
  <div class="header">
    <el-select v-model="roleCur" placeholder="请选择" @change="selectRole" value-key="roleName" class="check-role">
      <el-option
        v-for="item in roleList"
        :key="item.roleName"
        :label="item.roleName"
        :value="item">
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'vHeader',
  data () {
    return {
      roleCur: {}
    }
  },
  computed: {
    ...mapState({
      "roleList": "roleList",
      "role": "role"
    })
  },
  methods:{
    ...mapMutations({
      "SET_MENULIST": "SET_MENULIST",
      "SET_ROLE": "SET_ROLE"
    }),
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    selectRole(item){
      const menulist = item.menuList
      this.SET_MENULIST(menulist)
      const role = item
      this.SET_ROLE(role)
      this.$router.push({
        path: menulist[0].path
      }).catch(err=>{
        // console.log(err)
      })
    }
  },
  mounted(){
    this.roleCur = this.role
  }
}
</script>
<style scoped>
.header{
  height: 43px;
  background-color: blueviolet;
}
.check-role{
  float: right;
  margin: 5px;
}
</style>
