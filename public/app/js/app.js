 // initialize swagger client, point to a resource listing
  window.client = new SwaggerClient({
    url: "http://petstore.swagger.io/v2/swagger.json",
    success: function() {
      // upon connect, fetch a pet and set contents to element "mydata"
      client.pet.getPetById({petId:1},{responseContentType: 'application/json'}, function(data) {
        document.getElementById("api").innerHTML = JSON.stringify(data.obj);
      });
    }
  });