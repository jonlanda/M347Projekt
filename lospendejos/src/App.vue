<template>
  <div>
    <div>
      <table>
        <thead>
          <tr>
            <th>Film Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="film in films" :key="film._id">
            <td>{{ film.filmName }}</td>
            <td>{{ film.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div>
      <button @click="getLink(id)">get links</button>
      <ul>
        <li v-for="allLinks in links" :key="allLinks._id">{{ allLinks.linkValue }}</li>
      </ul>
    </div>
    <div>
      <button @click="getLinkByLanguage(id, 'spanish')">get spanish links</button>
      <ul>
        <li v-for=" link  in  spanishLinks " :key="link._id">{{ link.linkValue }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filmName: '',
      description: '',
      id: '',
      links: [],
      spanishLinks: [],
      films: [],
    };
  },
  mounted() {
    this.getAllFilms();
  },
  methods: {
    getAllFilms() {
      fetch('/films')
        .then(response => response.json())
        .then(data => {
          this.films = data;
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
          this.spanishLinks = data;
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