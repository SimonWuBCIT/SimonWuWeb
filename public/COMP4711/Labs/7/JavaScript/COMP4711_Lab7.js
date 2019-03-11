function load_questions() {
    let question0 = "<p>Question 1: In an object method, <span style='color: red;'>this</span> refers to:</p>"
    let question1 = "<p>Question 2: In HTML event handlers, what does <span style='color: red;'>this</span> refer to?</p>"
    let question2 = "<p>Question 3: In a JavaScript function, what is the default binding for this?</p>"
    let question3 = "<p>Question 4: What does <span style='color: red;'>this</span> refer to in the code:<br>" +
                    "<span style='color: blue;'>var</span> x = <span style='color: red;'>this</span>;</p>"
    let question4 = "<p>Question 5: What does this refer to in the following code?<br>" + 
                    "var person1 = { firstName: function() {return <span style='color: red;'>this</span>.firstName;}}<br>" + 
                    "var person2 = { firstName: \"John\",}<br>" +
                    "person1.fullName.call(person2);</p>"
    let question5 = "<p>Question 6: What is the difference between break and continue?</p>";
    let question6 = "<p>Question 7: Which of the following is a valid way to add a class via JavaScript?</p>";
    let question7 = "<p>Question 8: What is the difference between browser-level events and DOM-level events?</p>";
    let question8 = "<p>Question 9: How do you use JavaScript to change attributes of an element?</p>";
    let question9 = "<p>Question 10: How do I add a DOM element via JavaScript?</p>";
    

    let my_question = [[],[],[],[],[],[],[],[],[],[]];
    my_question[0].text = question0;
    my_question[0].option0 = '<input type="radio" name="question1" value="0">The "owner" of the method<br>'
    my_question[0].option1 = '<input type="radio" name="question1" value="1">The global object<br>'
    my_question[0].option2 = '<input type="radio" name="question1" value="2">The immediate child of the "owner"<br>'
    my_question[0].option3 = '<input type="radio" name="question1" value="3">Invalid<br><br>' 
    
    my_question[1].text = question1;
    my_question[1].option0 = '<input type="radio" name="question2" value="0">The global object<br>'
    my_question[1].option1 = '<input type="radio" name="question2" value="1">Invalid<br>'
    my_question[1].option2 = '<input type="radio" name="question2" value="2">The HTML element that received the event<br>'
    my_question[1].option3 = '<input type="radio" name="question2" value="3">The parent of the HTML element<br><br>'

    my_question[2].text = question2;
    my_question[2].option0 = '<input type="radio" name="question3" value="0">The owner of the function<br>'
    my_question[2].option1 = '<input type="radio" name="question3" value="1">The function pointer<br>'
    my_question[2].option2 = '<input type="radio" name="question3" value="2">The return value<br>'
    my_question[2].option3 = '<input type="radio" name="question3" value="3">None of the above<br><br>'
    
    my_question[3].text = question3;
    my_question[3].option0 = '<input type="radio" name="question4" value="0">undefined<br>'
    my_question[3].option1 = '<input type="radio" name="question4" value="1">null<br>'
    my_question[3].option2 = '<input type="radio" name="question4" value="2">x<br>'
    my_question[3].option3 = '<input type="radio" name="question4" value="3">The global object<br><br>'

    my_question[4].text = question4;
    my_question[4].option0 = '<input type="radio" name="question5" value="0">null<br>'
    my_question[4].option1 = '<input type="radio" name="question5" value="1">Undefined<br>'
    my_question[4].option2 = '<input type="radio" name="question5" value="2">person2<br>'
    my_question[4].option3 = '<input type="radio" name="question5" value="3">0<br><br>'

    my_question[5].text = question5;
    my_question[5].option0 = '<input type="radio" name="question5" value="0">break terminates the loop, continue terminates the current iteration of the loop<br>'
    my_question[5].option1 = '<input type="radio" name="question5" value="1">continue terminates the loop, break terminates the current iteration of the loop<br>'
    my_question[5].option2 = '<input type="radio" name="question5" value="2">Both does the same thing<br>'
    my_question[5].option3 = '<input type="radio" name="question5" value="3">None of the above<br><br>'

    my_question[6].text = question6;
    my_question[6].option0 = '<input type="radio" name="question6" value="0">document.querySelector(".my_element".classList.remove("new_class");<br>'
    my_question[6].option1 = '<input type="radio" name="question6" value="1">document.querySelector(".my_element".classList.add("new_class");<br>'
    my_question[6].option2 = '<input type="radio" name="question6" value="2">document.querySelector(".my_element".class.add("new_class");<br>'
    my_question[6].option3 = '<input type="radio" name="question6" value="3">None of the above<br><br>'

    my_question[7].text = question7;
    my_question[7].option0 = '<input type="radio" name="question7" value="0">DOM-level events defines the browsers behavior such as load and window resize. Browser-level events deals with content interactions such as submit and click.<br>'
    my_question[7].option1 = '<input type="radio" name="question7" value="1">Browser-level events defines the browsers behavior such as load and window resize. DOM-level events deals with content interactions such as submit and click.<br>'
    my_question[7].option2 = '<input type="radio" name="question7" value="2">They are the same<br>'
    my_question[7].option3 = '<input type="radio" name="question7" value="3">None of the above<br><br>'

    my_question[8].text = question8;
    my_question[8].option0 = '<input type="radio" name="question8" value="0">document.querySelector(".my_element a").setAttribute("target", "_blank");<br>'
    my_question[8].option1 = '<input type="radio" name="question8" value="1">document.querySelector(".my_element a").attribute("target", "_blank");<br>'
    my_question[8].option2 = '<input type="radio" name="question8" value="2">All of the above<br>'
    my_question[8].option3 = '<input type="radio" name="question8" value="3">None of the above<br><br>'

    my_question[9].text = question9;
    my_question[9].option0 = '<input type="radio" name="question9" value="0">You can\'t<br>'
    my_question[9].option1 = '<input type="radio" name="question9" value="1">let element = document.createElement("p");<br>document.getElementByTagName("body")[0].addChild(element);<br>'
    my_question[9].option2 = '<input type="radio" name="question9" value="2">let element = document.createElement("p");<br>document.getElementByTagName("body")[0].child = element;<br>'
    my_question[9].option3 = '<input type="radio" name="question9" value="3">let element = document.createElement("p");<br>document.getElementsByTagName("body")[0].appendChild(element)<br>'

    let my_answers = [1, 4, 4, 3, 3];
    
    let how_many_questions = prompt("How many question would you like to try?");

    if (how_many_questions != null) {
        if (how_many_questions > 10) {
            how_many_questions = 10;
        }
        if (how_many_questions < 0) {
            how_many_questions = 0;
        }
        for (let i = 0; i < how_many_questions; ++i) {
            let question_container = document.createElement("div");
            let question_block = my_question[i].text + my_question[i].option0 + my_question[i].option1 +my_question[i].option2 + my_question[i].option3;
            question_container.innerHTML = question_block;
            
            document.getElementsByTagName("body")[0].appendChild(question_container);
        }
    }
}