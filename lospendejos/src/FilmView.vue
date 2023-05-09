<template>
  <div>

  </div>
</template>

<script>
export default {
  name: 'create',
  props: {
    filmId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      film: [],
      links: [],
      languageLinks: [],
      filmId: this.filmId,
    };
  },
  mounted() {
    this.getFilmById(this.filmId);
  },
  methods: {
    getFilmById(id) {
      fetch(`/filmById/${id}`)
        .then(response => response.json())
        .then(data => {
          this.film = data;
          this.links = this.getLink(id);
          console.log(this.film)
        })
        .catch(error => {
          console.log(error);
        });
    },

    getLink(id) {
      fetch(`/getLink/${id}`)
        .then(response => response.json())
        .then(data => {
          this.links = data;
        })
        .catch(error => {
          console.log(error);
        })
    },

    getLinkByLanguage(id, dubLanguage) {
      fetch(`/getLinkWithDub/${id}/${dubLanguage}`)
        .then(response => response.json())
        .then(data => {
          this.languageLinks = data;
        })
        .catch(error => {
          console.log(error);
        })
    },
  }
};
</script>

<style>
table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  text-align: left;
  padding: 8px;
  border: 1px solid black;
}

th {
  background-color: #ddd;
}

tr:nth-child {
  background-color: #f2f2f2;
}
</style>