<section>
  <h2 class="pb-4 text-xl">Recent Work</h2>

  <div class="marquee marquee--fit-content marquee--hover-pause">
    <ul class="marquee__content">
      <li>
        <img src='/img/projects/Gameday.webp' alt="Gameday" class="w-96" />
      </li>
      <li>
        <img src='/img/projects/SOAR.webp' alt="SOAR" class="w-96" />
      </li>
      <li>
        <img src='/img/projects/SKTW.webp' alt="SKTW" class="w-96" />
      </li>
    </ul>

    <ul aria-hidden="true" class="marquee__content">
      <li>
        <img src='/img/projects/Gameday.webp' alt="Gameday" class="w-96" />
      </li>
      <li>
        <img src='/img/projects/SOAR.webp' alt="SOAR" class="w-96" />
      </li>
      <li>
        <img src='/img/projects/SKTW.webp' alt="SKTW" class="w-96" />
      </li>
    </ul>
  </div>
</section>

<style>
  /* Marquee styles */
.marquee {
  --gap: 1rem;
  position: relative;
  display: flex;
  overflow: hidden;
  user-select: none;
  gap: var(--gap);
  width: 80vw;
}

.marquee__content {
  flex-shrink: 0;
  display: flex;
  justify-content: space-around;
  gap: var(--gap);
  min-width: 100%;
}

@keyframes scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(calc(-100% - var(--gap)));
  }
}

/* Pause animation when reduced-motion is set */
@media (prefers-reduced-motion: reduce) {
  .marquee__content {
    animation-play-state: paused !important;
  }
}

/* Enable animation */
 .marquee__content {
  animation: scroll 40s linear infinite;
}


/* Pause on hover */
.marquee--hover-pause:hover .marquee__content {
  animation-play-state: paused;
}

/* Attempt to size parent based on content. Keep in mind that the parent width is equal to both content containers that stretch to fill the parent. */
.marquee--fit-content {
  max-width: fit-content;
}

.marquee--reverse  {
  animation-direction: reverse;
  animation-delay: -3s;
}

@keyframes scroll-abs {
  from {
    transform: translateX(calc(100% + var(--gap)));
  }
  to {
    transform: translateX(0);
  }
}




</style>
