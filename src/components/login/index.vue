<template>
  <div class="login">
    <el-form :model="loginForm" :rules="rules" ref="loginForm" :hide-required-asterisk="true" class="form-login">
      <el-form-item label="" prop="userName">
        <el-input v-model="loginForm.userName" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item label="" prop="password">
        <el-input v-model="loginForm.password" placeholder="密码"></el-input>
      </el-form-item>
      <div>
        <el-button @click="reset" class="reset-btn">重 置</el-button>
        <el-button type="primary" @click="login">登 录</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { login } from "@/api/api"
export default {
  name: 'login',
  data () {
    return {
      loginForm: {},
      rules: {
        userName:[{
          required: true, 
          message: '请输入用户名', 
          trigger: 'blur' 
        }],
        password:[{
          required: true, 
          message: '请输入密码', 
          trigger: 'blur' 
        }]
      }
    }
  },
  computed: {
    ...mapState('login', ['token']),
  },
  methods:{
    ...mapMutations( 'login', ['SET_TOKEN']),
    ...mapMutations( {
      SET_ROLELIST: 'SET_ROLELIST',
      SET_MENULIST: 'SET_MENULIST',
      SET_ROLE: 'SET_ROLE'
    } ),
    reset(){
      this.$refs.loginForm.resetFields()
    },
    login(){
      this.$refs.loginForm.validate((value) => {
        if(value){
          /**
           * 拿到token以及用户信息进行登录
           */
          login(this.loginForm).then(res => {
            const token = res.data.token
            this.SET_TOKEN(token)
            const roleList = res.data.roleList
            this.SET_ROLELIST(roleList)
            const role = roleList[0]
            this.SET_ROLE(role)
            const menuList = role.menuList
            this.SET_MENULIST(menuList)
            
            this.$router.push('/welcome')
          }).catch((err) => {
            console.log(err)
          })
        }
      })
      
    }
  },
  mounted(){}
}
</script>

<style scoped>
.login{
  width: 100%;
  height: 100%;
  background-image: url("./../../assets/img/login.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.form-login{
  width: 300px;
  height: 160px;
  background-color: rgba(255,255,255,0.6);
  border-radius: 6px;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%,-50%);
  padding: 30px 40px;
}
.reset-btn{
  margin-right: 20px;
}
</style>
