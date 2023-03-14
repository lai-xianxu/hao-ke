<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      class="nav-bar"
      title="我的收藏"
      left-arrow
      @click-left="onClickLeft"
    >
    </van-nav-bar>
    <!-- 收藏列表 -->
    <div v-if="favorite.length">
      <van-card
        v-for="(item, index) in favorite"
        :key="index + item.houseCode"
        :price="item.price"
        :desc="item.desc"
        :title="item.title"
        :thumb="'http://liufusong.top:8080' + item.houseImg"
      >
        <template #tags>
          <van-tag
            plain
            type="primary"
            text-color="#39becd"
            v-for="value in item.tags"
            :key="value"
          >
            {{ value }}
          </van-tag>
        </template>
      </van-card>
    </div>
    <!-- 收藏房源 -->
    <div v-else @click="onJumpFindHouse">
      <van-empty description="您还没有收藏，去收藏一些房源吧~" />
    </div>
  </div>
</template>

<script>
import { getFavorite } from "@/api/favorite";
export default {
  data() {
    return {
      favorite: [],
    };
  },
  created() {
    this.onFavorite();
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    onJumpFindHouse() {
      this.$router.push({
        name: "FindHouse",
      });
    },
    async onFavorite() {
      const { data } = await getFavorite();
      console.log(data, "onFavorite");
      this.favorite = data.body;
    },
  },
};
</script>

<style scoped lang="less">
.van-card__title {
  font-weight: 700;
  font-size: 30px;
}
.van-card__desc {
  color: #afb2b3;
}
</style>
