const form = document.querySelector("#aspirants");
//form submit event
form.addEventListener(
  "submit",
  (e) => {
    const choice = document.querySelector("input[name = zt]:checked").value;
    const data = { zt: choice };

    //fetching data from the page
    fetch("https://zetech-33c35.web.app/poll", {
      method: "post",
      body: JSON.stringify(data),
      headers: new Headers({
        "content-type": "application/json",
      }),
    })
      //returning promisses first converting the response to json
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));

    e.preventDefault();
  },
  { once: true }
);
//fetching the data that is submitted and visualizing it in the chart
fetch("https://zetech-33c35.web.app/poll")
  .then((res) => res.json())
  .then((data) => {
    const votes = data.votes;
    const totalVotes = votes.length;
    //count vote points
    const voteCounts = votes.reduce(
      (acc, vote) => (
        (acc[vote.zt] = (acc[vote.zt] || 0) + parseInt(vote.points)), acc
      ),
      {}
    );
    let dataPoints = [
      { label: "Peter", y: voteCounts.Peter },
      { label: "Tepela", y: voteCounts.Tepela },
      { label: "Suzan", y: voteCounts.Suzan },
      { label: "Kamau", y: voteCounts.Kamau },
    ];

    const chartContainer = document.querySelector("#chartContainer");
    if (chartContainer) {
      const chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "theme1",
        title: {
          text: `Total Votes ${totalVotes}`,
        },
        data: [
          {
            type: "column",
            dataPoints: dataPoints,
          },
        ],
      });
      chart.render();
      // Enable pusher logging - don't include this in production
      Pusher.logToConsole = true;

      var pusher = new Pusher("5eebcaa203111be8fb46", {
        cluster: "ap2",
        encryped: true,
      });
      var channel = pusher.subscribe("zt-poll");

      channel.bind("zt-vote", function (data) {
        dataPoints.forEach((point) => {
          if (point.label == data.zt) {
            point.y += data.points;
          }
        });
        chart.render();
      });
    }
  });
