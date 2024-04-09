const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");

const eidiAmounts = ["10K EIDI", "20K EIDI", "30K EIDI", "40K EIDI", "50K EIDI", "100K EIDI"];
const pieColors = ["#ffad00", "#ff7f00", "#ff5500", "#ff2a00", "#ff0000", "#ff3333"];

let count = 0;
let resultValue = 101;

const myChart = new Chart(wheel, {
  plugins: [ChartDataLabels],
  type: "pie",
  data: {
    labels: eidiAmounts,
    datasets: [{
      backgroundColor: pieColors,
      data: [1, 1, 1, 1, 1, 1],
    }],
  },
  options: {
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      tooltip: false,
      legend: { display: false },
      datalabels: {
        color: "#ffffff",
        formatter: (_, context) => eidiAmounts[context.dataIndex],
        font: { size: 24 },
      },
    },
  },
});

const valueGenerator = (angleValue) => {
  for (let i = 0; i < 360; i += 60) {
    if (angleValue >= i && angleValue < i + 60) {
      finalValue.innerHTML = `<p>Eidi Amount: ${eidiAmounts[i / 60]}</p>`;
      spinBtn.disabled = false;
      break;
    }
  }
};

spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  finalValue.innerHTML = `<p>Good Luck!</p>`;
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  let rotationInterval = window.setInterval(() => {
    myChart.options.rotation = myChart.options.rotation + resultValue;
    myChart.update();
    if (myChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      myChart.options.rotation = 0;
    } else if (count > 15 && myChart.options.rotation == randomDegree) {
      valueGenerator(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});
