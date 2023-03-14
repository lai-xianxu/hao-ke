<template>
  <div>
    <div>
      <div>
        <!-- 背景图 -->
        <div>
          <img
            v-if="!token"
            class="My_bg__2j-VX"
            src="	http://liufusong.top:8080/img/profile/bg.png"
            alt=""
          />
          <img
            v-else
            class="My_bg__2j-VX"
            src="http://liufusong.top:8080/img/avatar.png"
            alt=""
          />
        </div>
        <!-- 登陆部分 -->
        <div class="My_info__eOYeg">
          <div class="My_myIcon__3cKIV">
            <img class="My_avatar__2Fbh7" :src="headImg" alt="" />
            <div class="name">{{ userName }}</div>
            <div class="btn">
              <van-button
                type="primary"
                class="loginBtn"
                @click="jump"
                v-if="!token"
                >去登录</van-button
              >
              <van-button type="primary" class="loginbtn" v-else @click="logout"
                >退出
              </van-button>
            </div>
            <div class="My_edit__3wqlv" v-if="token">
              <div class="edit">编辑个人资料<van-icon name="play" /></div>
            </div>
          </div>
        </div>
        <!-- 页面导航 -->
        <div :class="{ pageNav: !token }">
          <van-grid clickable :column-num="3" :border="border">
            <van-grid-item
              icon="star-o"
              text="我的收藏"
              @click="onGoFavorite"
            />
            <van-grid-item
              icon="wap-home-o"
              text="我的出租"
              @click="onGoMyRent"
            />
            <van-grid-item icon="underway-o" text="看房记录" />
            <van-grid-item icon="vip-card-o" text="成为房主" />
            <van-grid-item icon="contact" text="个人资料" />
            <van-grid-item icon="service-o" text="联系我们" />
          </van-grid>
        </div>
        <!-- 广告图 -->
        <div class="My_ad__1wZZj">
          <img src="http://liufusong.top:8080/img/profile/join.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getUserInfo } from "@/api/login";
export default {
  data() {
    return {
      border: false,
      userName: "游客",
      headImg: "http://liufusong.top:8080/img/profile/avatar.png",
    };
  },
  computed: {
    ...mapState(["token"]),
  },
  mounted() {
    this.onUserInfo();
  },
  methods: {
    jump() {
      this.$router.push({
        name: "Login",
      });
    },
    onGoFavorite() {
      if (!this.$store.state.token) {
        this.$router.push({
          name: "Login",
        });
        return;
      }
      this.$router.push({
        name: "Favorite",
      });
    },
    onGoMyRent() {
      if (!this.$store.state.token) {
        this.$router.push({
          name: "Login",
        });
        return;
      }
      this.$router.push({
        name: "MyRent",
      });
    },
    logout() {
      this.$dialog
        .confirm({
          title: "提示",
          message: "是否确认退出？",
        })
        .then(() => {
          // on confirm
          // 清除缓存
          this.userName = "游客";
          this.headImg = "http://liufusong.top:8080/img/profile/avatar.png";
          localStorage.removeItem("token");
          this.$store.commit("getToken", "");
        });
    },
    async onUserInfo() {
      if (this.token) {
        const { data } = await getUserInfo();
        this.userName = data.body.nickname;
        this.headImg = "http://liufusong.top:8080" + data.body.avatar;
      }
    },
  },
};
</script>

<style scoped lang="less">
.My_bg__2j-VX {
  width: 100%;
}
.My_info__eOYeg {
  position: absolute;
  top: 250px;
  left: 50%;
  background: #fff;
  width: 600px;
  height: 360px;
  transform: translateX(-50%);
  box-shadow: 0 0 10px 3px #ddd;
  margin: 10px auto 0;
  padding: 0 20px;
  text-align: center;
  font-size: 13px;
}
.My_myIcon__3cKIV {
  position: relative;
  transform: translateY(-50%);
  border-radius: 50%;
  width: 140px;
  height: 140px;
  border: 5px solid #f5f5f5;
  display: inline-block;
  box-shadow: 0 2px 2px #bdbdbd;
  background-color: #fff;
}
.My_avatar__2Fbh7 {
  margin: 7px 0 0 1px;
  width: 90%;
  border-radius: 50%;
}
.name {
  margin-top: 40px;
  margin-bottom: 10px;
  width: 150px;
}
.btn {
  margin-top: 40px;
  .loginBtn {
    width: 150px;
    height: 65px;
    border-radius: 10px;
  }
  .loginbtn {
    width: 120px;
    height: 45px;
    border-radius: 50px;
  }
}
.My_edit__3wqlv {
  color: #999;
  font-size: 12px;
  margin-top: 30px;
}
.edit {
  width: 170px;
}
.pageNav {
  margin-top: 250px;
}
.My_ad__1wZZj {
  text-align: center;
  margin-top: 50px;
  img {
    width: 92%;
  }
}
</style>
