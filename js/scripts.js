//business logic

// Name Constructor
function Contact(first, last) {
  this.firstName = first;
  this.lastName = last;
  this.addresses = [];
}

//Address Contructor
function Address(street, city, state) {
  this.street = street;
  this.city = city;
  this.state = state;
}

// New Prototype Method for Contact
Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

// New Prototype Method for Addreses
Address.prototype.fullAddress = function() {
  return this.street + ", " + this.city + " " + this.state;
}

// ALT2: This is an alternative way to reset all the forms using the div class "next-address".
// function resetFields() {
//     $("input#new-first-name").val("");
//     $("input#new-last-name").val("");
//     $("input.new-street").val("");
//     $("input.new-city").val("");
//     $("input.new-state").val("");
// }

// user interface logic
$(document).ready(function() {
  $("#add-address").click(function() {
    $("#new-addresses").append('<div class="new-address">' +
                                 '<div class= "next-address">'+
                                  '<div class="form-group">' +
                                     '<label for="new-street">Street</label>' +
                                     '<input type="text" class="form-control new-street">' +
                                     // ALT1: possible alternative way to append the form
                                     // '<input type="text" class="form-control new-street2">' +
                                   '</div>' +
                                   '<div class="form-group">' +
                                     '<label for="new-city">City</label>' +
                                     '<input type="text" class="form-control new-city">' +
                                   '</div>' +
                                   '<div class="form-group">' +
                                     '<label for="new-state">State</label>' +
                                     '<input type="text" class="form-control new-state">' +
                                   '</div>' +
                                  '</div>' +
                                '</div>');
  });

  $("form#new-contact").submit(function(event) {
    event.preventDefault();

    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();

// Creating new contact
    var newContact = new Contact(inputtedFirstName, inputtedLastName);
// Creating address from input information
    $(".new-address").each(function() {
      var inputtedStreet = $(this).find("input.new-street").val();
      // ALT1: possible alternative way to append form
      // var inputtedStreet = $("input.new-street2").val();
      var inputtedCity = $(this).find("input.new-city").val();
      var inputtedState = $(this).find("input.new-state").val();
      var newAddress = new Address(inputtedStreet, inputtedCity, inputtedState);
      newContact.addresses.push(newAddress);
    });

// Appending UL with List Items of captured address content
    $("ul#contacts").append("<li><span class='contact'>" + newContact.fullName() + "</span></li>");


// Showing the stored values
    $(".contact").last().click(function() {
      $("#show-contact").show();
      $("#show-contact h2").text(newContact.firstName);
      $(".first-name").text(newContact.firstName);
      $(".last-name").text(newContact.lastName);
// Show the addresses that were entered with contact.
      $("ul#addresses").text("");
      newContact.addresses.forEach(function(address) {
        $("ul#addresses").append("<li>" + address.fullAddress() + "</li>");
      });
    });
    
    // ALT2: This is an alternative way to reset all the forms using the div class "next-address".
        // resetFields()
        $(".next-address").remove()


    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input.new-street").val("");
    $("input.new-city").val("");
    $("input.new-state").val("");
  });
});
