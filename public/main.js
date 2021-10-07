const form = document.querySelector("#vote-form")

//form submit event
form.addEventListener("submit", (e) =>{
    const choice = document.querySelector("input[name = zt]:checked").value
    const data = {zt:choice}
    
    fetch("http://localhost:3000/poll", {
        method:"post",
        body:JSON.stringify(data),
        headers: new Headers({
            'content-type':'application/json'
        })
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))

    e.preventDefault()
})

//chart
let dataPoints = [
    {label : "Peter", y:0},
    {label : "Tepela", y:0},
    {label : "Suzan", y:0},
    {label : "Kamau", y:0},
]

const chartContainer = document.querySelector("#chartContainer")
if(chartContainer){
    const chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled : true,
        theme:"theme1",
        title:{
            text:"Zetech Ballots Results"
        },
        data:[{
            type:"column",
            dataPoints:dataPoints
        }]
    })
    chart.render()
    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    var pusher = new Pusher('5eebcaa203111be8fb46', {
      cluster: 'ap2',
      encryped:true
    });  
    var channel = pusher.subscribe('zt-poll');

    channel.bind('zt-vote', function(data) {
      dataPoints.forEach((point)=>{
          if(point.label==data.zt)
          {
               point.y+=data.points;
          }
      });
      chart.render();
    })
}
