<template>
  <div class="home">
    <h1>Курсы валют</h1>
    <table>
      <thead>
      <tr>
        <th>Валюта</th>
        <th>Курс</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(rate, key) in rates" :key="key">
        <td>{{ key.toUpperCase() }}</td>
        <td>{{ rate }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ['baseCurrency'],
  data() {
    return {
      rates: {}
    };
  },
  methods: {
    fetchRates() {
      fetch(`https://status.neuralgeneration.com/api/currency`)
          .then(response => response.json())
          .then(data => {
            this.rates = {...data}; // Используйте spread оператор для создания нового объекта
          })
          .catch(error => console.error("Ошибка загрузки данных: ", error));
    }
  },
  mounted() {
    this.fetchRates();
  },
  watch: {
    baseCurrency(newVal, oldVal) {
      console.log(oldVal)
      console.log(newVal)
      if (newVal !== oldVal) {
        this.fetchRates();
      }
    }
  }
};
</script>

<style scoped>
.home {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

h1 {
  color: aliceblue;
}

th, td {
  color: aliceblue;
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

th {
  color: #181818;
  background-color: #eee;
}
</style>
