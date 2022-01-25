<template>
  <v-card class="stati emerald" elevation="15">
    <v-icon size="48" color="black">{{ item.icon }}</v-icon>
    <div>
      <b>{{ item.number }}</b>
      <span>{{ item.title }}</span>
    </div>
  </v-card>
</template>
<script>
export default {
  name: "StatsCard",
  props: ["item"],
};
</script>

<style>
.stati {
  background: #fff;
  height: 6em;
  padding: 1em;
  margin: 1em 0;
  -webkit-transition: margin 0.5s ease, box-shadow 0.5s ease; /* Safari */
  transition: margin 0.5s ease, box-shadow 0.5s ease;
  -moz-box-shadow: 0px 0.2em 0.4em rgb(0, 0, 0, 0.8);
  -webkit-box-shadow: 0px 0.2em 0.4em rgb(0, 0, 0, 0.8);
  box-shadow: 0px 0.2em 0.4em rgb(0, 0, 0, 0.8);
  cursor: pointer;
}
.stati:hover {
  margin-top: 0.5em;
  -moz-box-shadow: 0px 0.4em 0.5em rgb(0, 0, 0, 0.8);
  -webkit-box-shadow: 0px 0.4em 0.5em rgb(0, 0, 0, 0.8);
  box-shadow: 0px 0.4em 0.5em rgb(0, 0, 0, 0.8);
}
.stati div {
  width: calc(100% - 3.5em);
  display: block;
  float: right;
  text-align: right;
}
.stati div b {
  font-size: 2.2em;
  width: 100%;
  padding-top: 0px;
  margin-top: -0.2em;
  margin-bottom: -0.2em;
  display: block;
  color: #20D855
}
.stati div span {
  font-size: 1em;
  width: 100%;
  color: rgb(0, 0, 0, 0.8) !important;
  display: block;
}
</style>