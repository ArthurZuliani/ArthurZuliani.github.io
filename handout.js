/*
##################################################
Author: Arthur Zuliani
Date: Apr 11, 2022
Purpose: JavaScript/JQuery functions for CIS-1290 SME Presentation
##################################################
*/

/**
 * This is the main method of the application, which runs when the page loads
 * 
 * @author Arthur Zuliani
 * @since 20220411
 */
$(function () {

    let firstPartEncrypted = $("#firstPart").text().toString();
    let secondPartEncrypted = $("#secondPart").text().toString();

    //Get the encrypted message from the page
    let encrypted = firstPartEncrypted.concat(secondPartEncrypted);

    //Focus the text input element
    $("#keyInput").focus();

    //Try to decrypt the message for each key input
    $("#keyInput").on("input", function () {
        let password = $(this).val();

        let decrypted = CryptoJS.AES.decrypt(encrypted.toString(), password).toString(CryptoJS.enc.Utf8);

        if (decrypted.length <= 10) {
            $("#outputMessage").html("Incorrect key");
            $("#outputMessage").addClass("incorrectKey");
            $("#outputMessage").removeClass("correctKey");
            $("#outputDiv").find("#author").remove(); 
        } else {
            $("#outputMessage").html(decrypted);
            $("#outputMessage").addClass("correctKey");
            $("#outputMessage").removeClass("incorrectKey");

            //Include quote author's name
            let authorName = $('<p id="author"></p>').text("Seneca, Lucius Annaeus");
            $("#outputDiv").append(authorName);
        }
    });

    // Default message for the outputMessage tag
    $("#outputMessage").html(firstPartEncrypted + " " + secondPartEncrypted);

});