<template>
  <div>
    <!-- Navbar (only once in the layout) -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Library System</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/borrowed-books">Borrowed Books</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Main content based on the route -->
    <router-view></router-view>
  </div>
</template>

<script setup>
// No need to add any other logic here
</script>

<style>
body {
  background-color: #f8f9fa; /* Light beige tone */
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
}

.navbar {
  background-color: #f5e9d7; /* Match photo's theme */
}

.navbar-brand,
.nav-link {
  color: #343a40 !important;
  font-weight: 600;
}

.navbar .btn-primary {
  background-color: #007bff;
  border: none;
}

.card {
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: white;
}

.card-title {
  color: #343a40;
  font-weight: bold;
}

.card-text {
  color: #6c757d;
}

.card img {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.container {
  margin-top: 20px;
}

.footer {
  background-color: #f5e9d7;
  text-align: center;
  padding: 10px 0;
  color: #343a40;
  font-size: 14px;
}

button {
  transition: all 0.3s ease-in-out;
}

button:hover {
  transform: translateY(-2px);
}

.carousel-item img {
  object-fit: cover;
  height: 200px;
}
</style>
