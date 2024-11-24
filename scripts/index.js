$(document).ready(function () {
    const screenWidth = window.innerWidth;
    
    const cardContainer = $("#cards");
    const scrollAmount = 300; // Adjust this for the scroll distance per click

    // make the arrows alternative to scrolling
    $("#right-arrow").click(function () {
        cardContainer.animate({ scrollLeft: "+=" + scrollAmount }, 300);
    });

    $("#left-arrow").click(function () {
        cardContainer.animate({ scrollLeft: "-=" + scrollAmount }, 300);
    });


    // make the see-all see-less button working
    let seeAll = false;
    // Cache the toggle button and job openings container
    const visibilityToggle = $("#job-openings #see-toggle");
    const jobOpeningsContainer = $("#job-openings");

    // Attach resize event handler
    $(window).on("resize", resetToggle);

    // Initial state on page load
    resetToggle();

   // Attach click event handler
    visibilityToggle.on("click", () => {
        if (screenWidth > 770) return; // Only work for small screens

        if (!seeAll) {
            jobOpeningsContainer.css("maxHeight", "none");
            visibilityToggle.find("button").text("See Less"); // Update button text
        } else {
            jobOpeningsContainer.css("maxHeight", "500px");
            visibilityToggle.find("button").text("See All"); // Update button text
        }

        seeAll = !seeAll; // Toggle the state
    });

// Iterate over each input field inside elements with the class 'input'
$('.input input').each(function () {
    const $input = $(this); // Cache the current input element as a jQuery object
    const $label = $input.prev('label'); // Select the previous sibling label element

    // Event listener for when the input loses focus
    $input.on('blur', function () {
        // Check if the input value is empty (trimmed of whitespace)
        if ($input.val().trim() === '') {
            // Reset the label's position to the center of the input field
            $label.css({
                top: '50%',
                transform: 'translateY(-50%)'
            });
        }
    });

    // Event listener for when the input's value changes
    $input.on('input', function () {
        // If the input has a value (non-empty after trimming whitespace)
        if ($input.val().trim() !== '') {
            // Move the label to the top of the input field
            $label.css({
                top: '-0.8em',
                transform: 'none'
            });
        }
    });
});
   $('#submit').click(function (e) {
        e.preventDefault(); // Prevent form submission for validation
        
        var isValid = true; // Flag to track if the form is valid
        var name = $('#name');
        var email = $('#email');
        var nameError = $('#name-error');
        var emailError = $('#email-error');
        var fileInput = $('#file');
        var fileNameSpan = $('#file-name');

        // Reset error styles and messages
        name.removeClass('error');
        email.removeClass('error');
        fileInput.removeClass('error');
        nameError.hide();
        emailError.hide();
        fileNameSpan.text('Attach Resume'); // Reset the file name text

        // Validate Name
        if (name.val().length < 4 || name.val().length > 100) {
            name.addClass('error');
            nameError.text('Invalid Name.');
            nameError.show();
            isValid = false;
        }

        // Validate Email
        var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email.val())) {
            email.addClass('error');
            emailError.text('Invalid Email.');
            emailError.show();
            isValid = false;
        }

        // Check if file is uploaded
        if (fileInput[0].files.length === 0) {
            fileInput.addClass('error');
            fileNameSpan.text('Please upload a resume.'); // Change text if no file is selected
            isValid = false;
        } else {
            // If file is uploaded, update the span text with the file name
            var fileName = fileInput[0].files[0].name;
            fileNameSpan.text(fileName); // Display the file name
        }

        // If the form is valid, submit the form (replace this with actual form submission)
        if (isValid) {
            // You can submit the form or make an AJAX request here
            // For example:
            // $('form').submit(); // Or, if you are using AJAX:
            // $.post('your-api-endpoint', $('form').serialize(), function(response) {
            //    console.log(response);
            // });
            alert('Form is valid!');
        }
    });

    // Handle file selection change
    $('#file').change(function () {
        var fileInput = $(this);
        var fileNameSpan = $('#file-name');
        
        // If file is selected, update the span with the file name
        if (fileInput[0].files.length > 0) {
            var fileName = fileInput[0].files[0].name;
            fileNameSpan.text(fileName); // Display the file name
        } else {
            fileNameSpan.text('Attach Resume'); // Reset text if no file is selected
        }
    });



    // Function to reset the see-all button back to default(hidden) when in mobile size
    function resetToggle ()  {
        if (screenWidth > 770) {
            // Reset to default for larger screens
            jobOpeningsContainer.css("maxHeight", "none");
            visibilityToggle.css("display", "none") // Hide or reset button text
            seeAll = false;
        } else {
            // Reset for smaller screens
            jobOpeningsContainer.css("maxHeight", "500px");
            visibilityToggle.find("button").text("See All");
            seeAll = false;
        }
};

});