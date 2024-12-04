<template>
  <div class="container mt-5">
    <!-- Book Form -->
    <h2 class="mb-4 text-center text-primary">Add a Book</h2>
    <AddBookForm @add-book="addBook" />

    <!-- Book List Section -->
    <h2 class="mt-5 mb-4 text-center text-primary">Book Collection</h2>
    <div class="row">
      <div class="col-md-4 mb-4" v-for="book in books" :key="book.id">
        <div class="card shadow-sm border-light">
          <div class="card-body">
            <h5 class="card-title text-center">{{ book.title }}</h5>
            <p class="card-text"><strong>Author:</strong> {{ book.author }}</p>
            <p class="card-text"><strong>Borrowed On:</strong> {{ book.dateBorrowed }}</p>
            <p class="card-text"><strong>Return By:</strong> {{ book.returnDate }}</p>
          </div>
        </div>
      </div>
    </div>
    <p v-if="!books.length" class="text-center text-muted">No books added yet.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AddBookForm from '@/components/AddBookForm.vue' // Correct the import path

const books = ref([])

// Load books from localStorage when the component is mounted
onMounted(() => {
  const storedBooks = JSON.parse(localStorage.getItem('books'))
  if (storedBooks) {
    books.value = storedBooks
  }
})

// Method to handle the addition of a book
const addBook = (book) => {
  books.value.push(book)
  localStorage.setItem('books', JSON.stringify(books.value)) // Save to localStorage
}
</script>

<style scoped>
.card {
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.card-body {
  padding: 20px;
}
.card-title {
  font-size: 1.25rem;
  font-weight: bold;
}
.card-text {
  font-size: 1rem;
  margin-bottom: 0.75rem;
}
.card:hover {
  transform: scale(1.05);
  transition: transform 0.3s ease;
}
</style>
