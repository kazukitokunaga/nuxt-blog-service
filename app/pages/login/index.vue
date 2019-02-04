<template>
  <section class="container">
    <div class="links">
      <Home v-if="!isLogin"></Home>
      <Mypage v-if="isLogin" :user="userData"></Mypage>
    </div>
</section>
</template>

<script>
import firebase from '@/plugins/firebase'
import home from '~/components/home.vue';
import mypage from '~/components/mypage.vue';

export default {
  components: {
    home,
    mypage
  },
  asyncData({ context ,redirect, store }) {
    return {
      isLogin:false,
      userData:null,
    }
  },
  fetch () {
    // `fetch` メソッドはページの描画前にストアを満たすために使用される
  },
  beforeCreate() {
    firebase.auth().onAuthStateChanged(user => {
      console.log('user:', user)
      if (user) {
        try {
          this.isLogin = true
          this.userData = user
          this.$notify({
            title: 'ログイン成功',
            message: `${this.userData.displayName}としてログインしました`,
            position: 'bottom-right',
            duration: 1000
          })
        } catch(e) {
          this.$notify.error({
            title: 'ログイン失敗',
            message: '不正なユーザーIDです',
            position: 'bottom-right',
            duration: 1000
          })
        }
      } else {
        this.isLogin = false
        this.userData = null
      }
    })
  },
  computed: {
  },
  methods: {
  }
}
</script>