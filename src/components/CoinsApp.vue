<template>
  <section class="coin">
    <div class="container">
      <div class="coin_wrapper">
        <TransitionGroup name="list">
          <div
            v-for="coin in coins"
            :key="coin.name"
            @click="$emit('selects', coin)"
            class="coin_item"
            :class="{ coin_active: coinFunc === coin }"
          >
            <div class="coin_name">{{ coin.name }} - USD</div>
            <div class="coin_price">${{ prices(coin.price) }}</div>
            <div class="coin_delete">
              <button @click.stop="$emit('deleted', coin)">Удалить</button>
            </div>
          </div>
        </TransitionGroup>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "CoinsApp",
  props: {
    coins: Array,
    coinFunc: Function,
    prices: {
      type: Function,
      default: function () {
        return null;
      },
    },
  },
  data() {
    return {};
  },
};
</script>
<style scoped lang="scss">
.coin {
  padding: 2rem;
  &_wrapper {
    overflow: hidden;
    display: flex;
    gap: 1.5rem;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
  &_item {
    cursor: pointer;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    width: 258px;
    gap: 1rem;
    padding-top: 2rem;
    background: #1b2028;
    box-shadow: 4px 4px 33px rgba(0, 0, 0, 0.05);
    border-radius: 15px;
  }

  &_delete {
    width: 100%;

    button {
      display: block;
      width: 100%;
      height: 65px;
      outline: none;
      border: none;
      background-color: #ffffff;
      font-size: 1rem;
      color: #000;
      cursor: pointer;
      transition: all 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
      &:active,
      &:hover {
        background-color: #d5d4d4;
        color: #fff;
        opacity: 0.7;
      }
    }
  }

  &_name {
    font-weight: 600;
    font-size: 1rem;
    color: #fff;
    margin-bottom: 1rem;
  }

  &_price {
    font-size: 1.5rem;
    letter-spacing: 0.02em;
    color: #ffffff;
    margin-bottom: 1rem;
  }

  &_active {
    background-color: #0967db;
  }

  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s ease;
  }
  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(50px);
  }
}
</style>
