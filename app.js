const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());



app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/drapery-cost-calculator.html');
});



app.post('/calculate', (req, res) => {
  const { perimeter, height, fabricType, fullnessPercentage } = req.body;

  let cost = 0;
  let fabricCost = 0;
  let sewingCost = 0;
  let fabricNeededYrds = 0;
  let pricePerPanel = 0;

  switch (fabricType) {
    case 'poly':
      fabricCost = 8.5;
      break;
    case 'satin':
      fabricCost = 10;
      break;
    case 'velvet':
      fabricCost = 11;
      break;
    default:
      fabricCost = 0;
  }

  let heightInches = height * 12;
  let perimeterInches = perimeter * 12;
  let areaSqIn = perimeterInches * heightInches;

  let fabricNeededInches = areaSqIn / 60;

  if (fullnessPercentage == 100) {
    fabricNeededInches *= 4;
  } else if (fullnessPercentage == 50) {
    fabricNeededInches *= 3;
  }

  fabricNeededYrds = fabricNeededInches / 36; // 1 yard = 36 inches

  fabricCost *= Math.ceil(fabricNeededYrds);
  cost += fabricCost;

  if (height <= 10) {
    pricePerPanel = 55;
  } else if (height >= 20 && height < 30) {
    pricePerPanel = 75;
  } else if (height >= 30 && height < 40) {
    pricePerPanel = 85;
  } else if (height >= 40 && height < 50) {
    pricePerPanel = 95;
  } else if (height >= 50) {
    pricePerPanel = 105;
  }

  sewingCost = pricePerPanel * Math.ceil(perimeter / 10);

  if (fullnessPercentage == 50) {
    sewingCost *= 3;
  } else if (fullnessPercentage == 100) {
    sewingCost *= 4;
  }

  let initialLaborCost = 550;
  let laborCost = 0;
  let equipmentCost = 0;

  if (perimeter > 10) {
    let adjustedPerimeter = perimeter - 10;
    laborCost = Math.ceil(adjustedPerimeter / 10) * 110;
    equipmentCost = (adjustedPerimeter / 10) * 50;
    laborCost += initialLaborCost;
  }

  cost += laborCost + equipmentCost + sewingCost;

  const result = {
    fabricNeededYrds: Math.round(fabricNeededYrds),
    pricePerPanel: Math.round(pricePerPanel),
    cost: Math.round(cost).toFixed(2),
    fabricCost: Math.round(fabricCost).toFixed(2),
    sewingCost: Math.round(sewingCost).toFixed(2),
    equipmentCost: Math.round(equipmentCost).toFixed(2),
    laborCost: Math.round(laborCost).toFixed(2),
  };

  res.json(result);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
