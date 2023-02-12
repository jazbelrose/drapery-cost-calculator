function calculateCost() {
    let perimeter = document.getElementById("perimeter").value;
    let height = document.getElementById("height").value;
    let fabricType = document.getElementById("fabricType").value;
    let fullnessPercentage = document.getElementById("fullnessPercentage").value;
    let cost = 0;
    let fabricCost = 0;
    let sewingCost = 0;
    let fabricNeededYrds = 0;
    let pricePerPanel = 0;

    switch (fabricType) {
        case "poly":
            fabricCost = 8.5;
            break;
        case "satin":
            fabricCost = 10;
            break;
        case "velvet":
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
        laborCost += initialLaborCost
    }

    cost += laborCost + equipmentCost + sewingCost;

    document.getElementById("fabricNeededYrds").innerHTML = Math.round(fabricNeededYrds);
    document.getElementById("pricePerPanel").innerHTML = Math.round(pricePerPanel);
    document.getElementById("cost").innerHTML = Math.round(cost).toFixed(2);
    document.getElementById("fabricCost").innerHTML = Math.round(fabricCost).toFixed(2);
    document.getElementById("sewingCost").innerHTML = Math.round(sewingCost).toFixed(2);
    document.getElementById("equipmentCost").innerHTML = Math.round(equipmentCost).toFixed(2);
    document.getElementById("laborCost").innerHTML = Math.round(laborCost).toFixed(2);
}

$(function() {
    
    $("#fabricNeededYrdsContainer").hide(); 
    $("#pricePerPanelContainer").hide(); 
    $("#fabricCostContainer").hide();
    $("#sewingCostContainer").hide();
    $("#equipmentCostContainer").hide();
    $("#laborCostContainer").hide();
  
    $("#toggleFabricNeededYrds").on("click", function () {
        $("#fabricNeededYrdsContainer").toggle(this.checked);
    });

    $("#togglePricePerPanel").on("click", function () {
        $("#pricePerPanelContainer").toggle(this.checked);
    });
    
    $("#toggleFabricCost").on("click", function() {
      $("#fabricCostContainer").toggle(this.checked);
    });
  
    $("#toggleSewingCost").on("click", function() {
      $("#sewingCostContainer").toggle(this.checked);
    });
  
    $("#toggleEquipmentCost").on("click", function() {
      $("#equipmentCostContainer").toggle(this.checked);
    });
  
    $("#toggleLaborCost").on("click", function() {
      $("#laborCostContainer").toggle(this.checked);
    });
  });
  