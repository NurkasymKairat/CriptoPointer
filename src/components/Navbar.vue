<template>
  <section class="header">
    <div class="container">
      <div class="header_wrapper">
        <div class="header_logo">
          <h1>Dashboard</h1>
        </div>
        <div class="header_input">
          <input v-model="ticker" placeholder="Например BTC" type="text" />
          <button>Добавить</button>
        </div>
        <div class="header_search">
          <input placeholder="Найти" type="text" />
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: "Navbar",
  props: {
    tickerd: String,
    filterd: String,
  },
  data() {
    return {};
  },
};
</script>
