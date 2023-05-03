<template>
  <section class="header">
    <div class="container">
      <div class="header_wrapper">
        <div class="header_logo">
          <h1>Dashboard</h1>
        </div>
        <div class="header_input">
          <input
            @keydown.enter="add"
            v-model="ticker"
            placeholder="Например BTC"
            type="text"
          />
          <button @click="add">Добавить</button>
        </div>
        <div class="header_search">
          <input v-model="filter" placeholder="Найти" type="text" />
        </div>
      </div>
    </div>
  </section>

  <CoinsApp
    :coin-func="selectedTicker"
    @selects="select"
    @deleted="handleDelete"
    :coins="paginatedTickers"
    :prices="formatPrice"
  ></CoinsApp>

  <GraphApp
    @removeNull="onRemovedNull"
    :names="selectedTicker"
    :graphs="normalizedGraph"
  ></GraphApp>
</template>
<script>
import CoinsApp from "./components/CoinsApp.vue";
import GraphApp from "./components/GraphApp.vue";
import Navbar from "./components/Navbar.vue";

import { subscribeToTicker, unsubscribeFromTicker } from "./api/api";
export default {
  components: {
    Navbar,
    CoinsApp,
    GraphApp,
  },
  data() {
    return {
      ticker: "",
      filter: "",
      tickers: [],
      selectedTicker: null,
      graph: [],
    };
  },
  created() {
    const windowData = Object.fromEntries(
      new URL(window.location).searchParams.entries()
    );

    const VALID_KEYS = ["filter", "page"];

    VALID_KEYS.forEach((key) => {
      if (windowData[key]) {
        this[key] = windowData[key];
      }
    });

    const tickersData = localStorage.getItem("cryptonomicon-list");

    if (tickersData) {
      this.tickers = JSON.parse(tickersData);
      this.tickers.forEach((ticker) => {
        subscribeToTicker(ticker.name, (newPrice) =>
          this.updateTicker(ticker.name, newPrice)
        );
      });
    }

    setInterval(this.updateTickers, 5000);
  },
  computed: {
    filteredTickers() {
      return this.tickers.filter((ticker) =>
        ticker.name.includes(this.filter.toUpperCase())
      );
    },

    paginatedTickers() {
      return this.filteredTickers.slice(this.startIndex, this.endIndex);
    },

    hasNextPage() {
      return this.filteredTickers.length > this.endIndex;
    },

    normalizedGraph() {
      const maxValue = Math.max(...this.graph);
      const minValue = Math.min(...this.graph);

      if (maxValue === minValue) {
        return this.graph.map(() => 50);
      }

      return this.graph.map(
        (price) => 5 + ((price - minValue) * 95) / (maxValue - minValue)
      );
    },
  },

  methods: {
    updateTicker(tickerName, price) {
      this.tickers
        .filter((t) => t.name === tickerName)
        .forEach((t) => {
          if (t === this.selectedTicker) {
            this.graph.push(price);
          }
          t.price = price;
        });
    },

    onRemovedNull() {
      this.selectedTicker = null;
    },

    formatPrice(price) {
      if (price === "-") {
        return price;
      }
      return price > 1 ? price.toFixed(2) : price.toPrecision(2);
    },

    add() {
      const currentTicker = {
        name: this.ticker.toUpperCase(),
        price: "-",
      };

      if (
        this.ticker &&
        !this.tickers.some((t) => t.name === currentTicker.name)
      ) {
        this.tickers.push(currentTicker);
        subscribeToTicker(currentTicker.name, (newPrice) =>
          this.updateTicker(currentTicker.name, newPrice)
        );
      }

      this.ticker = "";
      this.filter = "";
    },

    select(ticker) {
      this.selectedTicker = ticker;
    },

    handleDelete(tickerToRemove) {
      this.tickers = this.tickers.filter((t) => t !== tickerToRemove);
      if (this.selectedTicker === tickerToRemove) {
        this.selectedTicker = null;
      }
      unsubscribeFromTicker(tickerToRemove.name);
    },
  },

  watch: {
    selectedTicker() {
      this.graph = [];
    },

    tickers(newValue, oldValue) {
      localStorage.setItem("cryptonomicon-list", JSON.stringify(this.tickers));
    },

    pageStateOptions(value) {
      window.history.pushState(
        null,
        document.title,
        `${window.location.pathname}?filter=${value.filter}&page=${value.page}`
      );
    },
  },
};
</script>
