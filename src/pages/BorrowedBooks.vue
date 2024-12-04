<template>
  <div class="container mt-5">
    <h2 class="mb-4 text-center text-primary">Borrowed Books</h2>

    <div v-if="borrowedBooks.length" class="row">
      <div class="col-md-4 mb-4" v-for="borrowedBook in borrowedBooks" :key="borrowedBook.id">
        <div class="card shadow-sm border-light">
          <div class="card-img-container">
            <img
              v-if="borrowedBook.book.imageUrl"
              :src="borrowedBook.book.imageUrl"
              alt="Book Image"
              class="card-img-top"
            />
          </div>
          <div class="card-body d-flex flex-column justify-content-between">
            <h5 class="card-title text-center">{{ borrowedBook.book.title }}</h5>
            <p class="card-text"><strong>Author:</strong> {{ borrowedBook.book.author }}</p>
            <p class="card-text"><strong>Borrowed By:</strong> {{ borrowedBook.name }}</p>
            <p class="card-text"><strong>Contact:</strong> {{ borrowedBook.contact }}</p>
            <p class="card-text"><strong>Borrowed On:</strong> {{ borrowedBook.dateBorrowed }}</p>
            <div class="text-center mt-3">
              <button @click="returnBook(borrowedBook.id)" class="btn btn-danger btn-sm">
                Return
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <p v-if="!borrowedBooks.length" class="text-center text-muted">No borrowed books.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const borrowedBooks = ref([])

onMounted(() => {
  const storedBooks = JSON.parse(localStorage.getItem('borrowedBooks'))
  if (storedBooks) {
    borrowedBooks.value = storedBooks
  }
})

const returnBook = (id) => {
  borrowedBooks.value = borrowedBooks.value.filter((book) => book.id !== id)
  localStorage.setItem('borrowedBooks', JSON.stringify(borrowedBooks.value))
  alert('Book returned successfully!')
}
</script>

<style scoped>
.card {
  width: 100%;
  height: 400px; /* Ensuring all cards have the same height */
}

.card-img-container {
  width: 100%;
  height: 200px; /* Containing image area */
}

.card-img-top {
  width: 100%;
  height: 100%;
  object-fit: contain; /* Ensures image fits inside container and remains fully visible */
}

.card-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-title {
  font-size: 1.25rem;
}

.card-text {
  font-size: 1rem;
}
</style>
