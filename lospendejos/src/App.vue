<template>
  <div>{{ message }}</div>
</template>

<script>
import { getHello } from 'api.js';

export default {
  data() {
    return {
      message: ''
    };
  },
  mounted() {
    getHello().then(response => {
      this.message = response.data.message;
    });
  }
};
</script>
