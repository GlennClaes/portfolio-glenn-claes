<script setup>

</script>

<template>
  <footer id="footer" class="footer light-background">
    <div class="container">
      <h3 class="sitename">Folio</h3>
      <p>Et aut eum quis fuga eos sunt ipsa nihil. Labore corporis magni eligendi fuga maxime saepe
        commodi placeat.</p>
      <div class="social-links d-flex justify-content-center">
        <a href=""><i class="bi bi-twitter-x"></i></a>
        <a href=""><i class="bi bi-facebook"></i></a>
        <a href=""><i class="bi bi-instagram"></i></a>
        <a href=""><i class="bi bi-skype"></i></a>
        <a href=""><i class="bi bi-linkedin"></i></a>
      </div>
      <div class="container">
        <div class="copyright">
          <span>&copy;</span>
          <strong class="px-1 sitename">Portfolio</strong>
          <span>{{ year }}</span> All Rights Reserved
        </div>
        <div class="credits">
          Designed by
          <RouterLink to="/">Glenn Claes</RouterLink>
        </div>
      </div>
    </div>


  </footer>
</template>

<style scoped>

</style>
