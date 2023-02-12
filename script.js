



$('form').submit(function(e) {
    e.preventDefault();
    const perimeter = $('#perimeter').val();
    const height = $('#height').val();
    const fabricType = $('#fabricType').val();
    const fullnessPercentage = $('#fullnessPercentage').val();
  
    $.post('/calculate', {
      perimeter: perimeter,
      height: height,
      fabricType: fabricType,
      fullnessPercentage: fullnessPercentage
    }, function(result) {
      $('#fabricNeededYrds').html(result.fabricNeededYrds);
      $('#pricePerPanel').html(result.pricePerPanel);
      $('#cost').html(result.cost);
      $('#fabricCost').html(result.fabricCost);
      $('#sewingCost').html(result.sewingCost);
      $('#equipmentCost').html(result.equipmentCost);
      $('#laborCost').html(result.laborCost);
    });
  });
  

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
  