<template>
  <div class="converter">
    <h1>Конвертация валют</h1>
    <div class="conversion-row">
      <input type="number" v-model.number="amount1" @input="convert(1)" />
      <select v-model="currency1" @change="convert(2)">
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="RUB">RUB</option>
      </select>
    </div>
    <div class="conversion-row">
      <input type="number" v-model.number="amount2" @input="convert(2)" />
      <select v-model="currency2" @change="convert(1)">
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="RUB">RUB</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      amount1: 0,
      currency1: 'USD',
      amount2: 0,
      currency2: 'RUB',
      rates: {}
    };
  },
  methods: {
    fetchRates() {
      fetch('https://status.neuralgeneration.com/api/currency')
          .then(response => response.json())
          .then(data => {
            this.rates = data;
          });
    },
    convert(direction) {
      if (!this.rates) return; // Проверка на наличие загруженных курсов

      // Если выбраны одинаковые валюты, приравниваем значения инпутов
      if (this.currency1 === this.currency2) {
        if (direction === 1) {
          this.amount2 = this.amount1;
        } else {
          this.amount1 = this.amount2;
        }
        return; // Прерываем дальнейшее выполнение, т.к. конвертация не требуется
      }

      const key = `${this.currency1.toLowerCase()}-${this.currency2.toLowerCase()}`;
      const reverseKey = `${this.currency2.toLowerCase()}-${this.currency1.toLowerCase()}`;

      if (direction === 1) {
        if (this.rates[key]) {
          this.amount2 = (this.amount1 * this.rates[key]).toFixed(2);
        } else if (this.rates[reverseKey]) {
          this.amount2 = (this.amount1 / this.rates[reverseKey]).toFixed(2);
        }
      } else {
        if (this.rates[reverseKey]) {
          this.amount1 = (this.amount2 * this.rates[reverseKey]).toFixed(2);
        } else if (this.rates[key]) {
          this.amount1 = (this.amount2 / this.rates[key]).toFixed(2);
        }
      }
    }
  },
  mounted() {
    this.fetchRates();
  }
};
</script>

<style scoped lang="scss">
.converter {
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.conversion-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 15px;
  width: 100%;

  input[type="number"],
  select {
    flex: 1;
    padding: 10px;
    margin: 0 5px;
    border: 2px solid #ccc;
    border-radius: 4px;
    transition: border-color 0.3s;

    &:focus {
      border-color: #0056b3;
      outline: none;
    }
  }
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
}
</style>
