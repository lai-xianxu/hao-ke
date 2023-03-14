<template>
  <div>
    <van-nav-bar title="城市列表" left-arrow @click-left="onClickLeft" />
    <div>
      <!-- cityList: {
        A: [
          {label: "beijing",value: "weiyizhi"}
        ]
      } -->
      <van-index-bar :index-list="indexList">
        <div v-for="(item, key) in cityList" :key="key">
          <van-index-anchor :index="key">
            <b v-if="key == '#'">当前城市</b>
            <b v-else-if="key == '热'">热门城市</b>
            <b v-else>{{ key }}</b>
          </van-index-anchor>
          <van-cell
            v-for="e in item"
            :key="e.value"
            :title="e.label"
            @click="onChangeCity(e)"
          />
        </div>
      </van-index-bar>
    </div>
  </div>
</template>

<script>
import { getHotCitys, getCityList } from "@/api/city";
export default {
  data() {
    return {
      hotCitys: [],
      cityList: [],
      indexList: [
        "#",
        "热",
        "A",
        "B",
        "C",
        "D",
        "F",
        "G",
        "H",
        "J",
        "K",
        "L",
        "M",
        "N",
        "Q",
        "S",
        "T",
        "W",
        "X",
        "Y",
        "Z",
      ],
      level: 1,
    };
  },
  created() {
    this.onCityList();
  },

  methods: {
    onClickLeft() {
      this.$router.back();
    },
    async onCityList() {
      const { data } = await getCityList({ level: this.level });
      console.log(data.body);
      let cityName = {};
      //循环26个字母的数组
      this.indexList.forEach((item) => {
        cityName[item] = [];
        data.body.forEach((el) => {
          //对比开头字母是否对应
          let first = el.pinyin.substring(0, 1).toUpperCase();
          if (first == item) {
            cityName[item].push(el);
          }
        });
      });
      const res = await getHotCitys();
      cityName["热"] = res.data.body;
      cityName["#"] = [
        {
          label: "上海",
        },
      ];
      //当模板加载完毕之后再执行nextTick里的处理
      this.$nextTick(() => {
        this.cityList = cityName;
        console.log(this.cityList);
      });
    },
    onChangeCity(e) {
      this.cityList["#"] = [e];
      this.$store.commit("mutations_setcity", e);
      this.$router.back();
      console.log(e);
    },
  },
};
</script>

<style scoped lang="less">
.van-cell {
  border-bottom: 1px solid #eee;
}
/deep/.van-index-bar__index {
  margin-bottom: 26px;
  padding: 0;
}
/deep/.van-index-bar__index--active {
  display: inline-block;
  color: #fff;
  background-color: #21b97a;
  border-radius: 50%;
  font-size: 12px;
  width: 50px;
  height: 50px;
  line-height: 50px;
}
</style>
