// text aimation

document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          return;
        }
        entry.target.classList.remove("in-view");
      });
    },
    {
      threshold: 0.1,
    }
  );

  const allAnimatedElements = document.querySelectorAll(".animate");

  allAnimatedElements.forEach((element) => observer.observe(element));
});

document.addEventListener("DOMContentLoaded", () => {
  function animateCounter(id, targetValue, duration = 2000) {
    const counter = document.querySelector(`#${id}`);
    let count = 0;
    const increment = targetValue / (duration / 15);

    //reset
    counter.innerText = 0;

    const updateCounter = setInterval(() => {
      count += increment;
      if (count >= targetValue) {
        count = targetValue;
        clearInterval(updateCounter);
      }
      if (id === "counter2") {
        counter.innerText = `${Math.floor(count)}+`;
      } else if (id === "counter3") {
        counter.innerText = `${(count / 1000).toFixed(2)}M`;
      } else {
        counter.innerText = `${Math.floor(count)}%`;
      }
    }, 15);
  }

  const statisticList = document.querySelector(".statistic-list");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter("counter1", 420); // Data Efficiency 420%
          animateCounter("counter2", 708); // Conversion Rate 708+
          animateCounter("counter3", 1820); // AI LLM Scale 1.82M
        } else {
          document.querySelector("#counter1").innerText = 0;
          document.querySelector("#counter2").innerText = 0;
          document.querySelector("#counter3").innerText = 0;
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  observer.observe(statisticList);
});
