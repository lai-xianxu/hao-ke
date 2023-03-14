<template>
  <div>
    <van-cell
      :title="item.communityName"
      v-for="(item, index) in searchList"
      :key="item.communityName + index"
      @click="handelClick(item)"
    />
  </div>
</template>

<script>
import { getSearchSuggestion } from "@/api/search";
import { mapState } from "vuex";
import { debounce } from "lodash";

export default {
  data() {
    return {
      searchList: [],
    };
  },
  props: {
    searchText: String,
  },
  watch: {
    searchText: {
      handler: debounce(function (value) {
        this.getSuggestion(value);
      }, 3000),
      immediate: true,
    },
  },
  computed: {
    ...mapState(["state_city"]),
  },
  methods: {
    async getSuggestion(value) {
      const { data } = await getSearchSuggestion({
        name: value,
        id: this.state_city.value,
      });
      console.log(value);
      console.log(data);
      this.searchList = data.body;
    },
    handelClick(value) {
      this.$emit("onSearch", value);
      this.$router.back();
      this.$store.commit("mutations_commity", value);
    },
  },
};
</script>

<style scoped lang="less"></style>
