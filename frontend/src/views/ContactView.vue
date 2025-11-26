<script setup>

</script>

<template>
  <!-- Contact Section -->
  <section id="contact" class="contact section">

    <!-- Section Title -->
    <div class="container section-title" data-aos="fade-up">
      <h2>Contact</h2>
      <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
    </div><!-- End Section Title -->

    <div class="container" data-aos="fade-up" data-aos-delay="100">

      <div class="info-wrap" data-aos="fade-up" data-aos-delay="200">
        <div class="row gy-5">

          <div class="col-lg-4">
            <div class="info-item d-flex align-items-center">
              <i class="bi bi-geo-alt flex-shrink-0"></i>
              <div>
                <h3>Address</h3>
                <p>A108 Adam Street, New York, NY 535022</p>
              </div>
            </div>
          </div><!-- End Info Item -->

          <div class="col-lg-4">
            <div class="info-item d-flex align-items-center">
              <i class="bi bi-telephone flex-shrink-0"></i>
              <div>
                <h3>Call<br></h3>
                <p>+1 5589 55488 55</p>
              </div>
            </div>
          </div><!-- End Info Item -->

          <div class="col-lg-4">
            <div class="info-item d-flex align-items-center">
              <i class="bi bi-envelope flex-shrink-0"></i>
              <div>
                <h3>Email</h3>
                <p>info@example.com</p>
              </div>
            </div>
          </div><!-- End Info Item -->

        </div>
      </div>

      <form action="forms/contact.php" method="post" class="php-email-form" data-aos="fade-up"
            data-aos-delay="300">
        <div class="row gy-4">

          <div class="col-md-6">
            <input type="text" name="name" class="form-control" placeholder="Your Name"
                   required="">
          </div>

          <div class="col-md-6 ">
            <input type="email" class="form-control" name="email" placeholder="Your Email"
                   required="">
          </div>

          <div class="col-md-12">
            <input type="text" class="form-control" name="subject" placeholder="Subject"
                   required="">
          </div>

          <div class="col-md-12">
              <textarea class="form-control" name="message" rows="6" placeholder="Message"
                        required=""></textarea>
          </div>

          <div class="col-md-12 text-center">
            <div class="loading">Loading</div>
            <div class="error-message"></div>
            <div class="sent-message">Your message has been sent. Thank you!</div>

            <button type="submit">Send Message</button>
          </div>

        </div>
      </form><!-- End Contact Form -->

    </div>

  </section><!-- /Contact Section -->
</template>

<style scoped>

</style>
