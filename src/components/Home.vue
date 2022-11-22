<template>
  <div>
    <v-header></v-header>
    <sidebar></sidebar>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import vHeader from "@/components/comm/vHeader"
import sidebar from "@/components/comm/sidebar"

export default {
  name: 'Home',
  data () {
    return {

    }
  },
  components:{
    vHeader,
    sidebar
  },
  computed: {

  },
  methods:{
    
  },
  mounted(){}
}
</script>

<style scoped>
.content{
  width: calc(100% - 200px);
  padding: 20px;
}
</style>
