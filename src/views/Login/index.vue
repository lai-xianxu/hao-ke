<template>
  <div>
    <van-nav-bar title="账号登录" left-arrow @click-left="onClickLeft" />
    <van-form @submit="onSubmit" class="input">
      <van-field
        v-model="user.username"
        name="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请输入账号' }]"
      />
      <van-field
        v-model="user.password"
        type="password"
        name="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请输入密码' }]"
      />
      <div style="margin: 16px">
        <van-button
          block
          type="info"
          native-type="submit"
          style="background-color: #21b97a"
          >登录</van-button
        >
      </div>
    </van-form>
    <p class="text">还没有账号，去注册~~</p>
  </div>
</template>

<script>
import { setLogin } from "@/api/login";
export default {
  name: "Login",
  data() {
    return {
      user: {
        username: "hzhmqd",
        password: "123456",
      },
    };
  },

  methods: {
    onClickLeft() {
      this.$router.back();
    },
    async onSubmit() {
      try {
        const { data } = await setLogin(this.user);
        console.log(data);
        if (data.status == 200) {
          this.$store.commit("getToken", data.body.token);
          this.$toast.success("登陆成功");
          this.$router.push({
            name: "My",
          });
        } else {
          this.$toast.fail(data.description);
        }
      } catch (e) {
        this.$toast.fail(e?.data?.description || "服务器端错误");
      }
    },
  },
};
</script>

<style scoped lang="less">
.text {
  margin-top: 70px;
  text-align: center;
  font-size: 16px;
  color: #333;
}
.van-cell {
  line-height: 100px;
}
</style>
