<template>
  <div class="trending-books">
    <h3>Trending Books</h3>
    <div class="row">
      <div class="col-md-3" v-for="book in books" :key="book.id">
        <div class="card">
          <img :src="book.cover" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">{{ book.title }}</h5>
            <p class="card-text">{{ book.author }}</p>
            <button class="btn btn-primary">Borrow</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'TrendingBooks',
  setup() {
    const books = ref([
      { id: 1, title: "Charlotte's Web", author: 'E. B. White', cover: 'path/to/cover1.jpg' },
      {
        id: 2,
        title: 'Game of Thrones',
        author: 'George R. R. Martin',
        cover: 'path/to/cover2.jpg',
      },
      // Add more books
    ])
    return { books }
  },
}
</script>
