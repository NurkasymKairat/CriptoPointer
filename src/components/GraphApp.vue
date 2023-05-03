<template>
  <section v-if="names" class="graph">
    <div class="container">
      <div class="graph_title">{{ names.name }}-USD</div>
      <div class="graph_wrapper">
        <div
          v-for="(g, i) in graphs"
          :key="i"
          :style="{ height: `${g}%` }"
          class="graph_item"
        ></div>

        <svg
          @click="$emit('removeNull')"
          class="graph_delete"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          xmlns:svgjs="http://svgjs.com/svgjs"
          version="1.1"
          width="30"
          height="30"
          x="0"
          y="0"
          viewBox="0 0 511.76 511.76"
          style="enable-background: new 0 0 512 512"
          xml:space="preserve"
        >
          <g>
            <path
              d="M436.896,74.869c-99.84-99.819-262.208-99.819-362.048,0c-99.797,99.819-99.797,262.229,0,362.048    c49.92,49.899,115.477,74.837,181.035,74.837s131.093-24.939,181.013-74.837C536.715,337.099,536.715,174.688,436.896,74.869z     M361.461,331.317c8.341,8.341,8.341,21.824,0,30.165c-4.16,4.16-9.621,6.251-15.083,6.251c-5.461,0-10.923-2.091-15.083-6.251    l-75.413-75.435l-75.392,75.413c-4.181,4.16-9.643,6.251-15.083,6.251c-5.461,0-10.923-2.091-15.083-6.251    c-8.341-8.341-8.341-21.845,0-30.165l75.392-75.413l-75.413-75.413c-8.341-8.341-8.341-21.845,0-30.165    c8.32-8.341,21.824-8.341,30.165,0l75.413,75.413l75.413-75.413c8.341-8.341,21.824-8.341,30.165,0    c8.341,8.32,8.341,21.824,0,30.165l-75.413,75.413L361.461,331.317z"
              fill="#fff"
              data-original="#000000"
            ></path>
          </g>
        </svg>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: "GraphApp",
  props: {
    graphs: {
      type: Array,
      default: function () {
        return [];
      },
    },
    names: {
      type: Function,
    },
  },
  data() {
    return {};
  },
  methods() {},
};
</script>
<style lang="scss">
.graph {
  padding: 1rem 0;
  &_title {
    font-size: 1.5rem;
    letter-spacing: 0.02em;
    color: #ffffff;
    margin-bottom: 2rem;
  }

  &_wrapper {
    position: relative;
    display: flex;
    align-items: end;
    justify-content: start;
    border-bottom: 1px solid #ffffff;
    border-left: 1px solid #ffffff;
    height: 15rem;
    gap: 15px;
  }

  &_item {
    width: 20px;
    background-color: #3a6ff8;
  }

  &_delete {
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>
