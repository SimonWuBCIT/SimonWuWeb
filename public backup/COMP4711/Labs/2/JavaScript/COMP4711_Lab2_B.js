function load_questions() {
    let question0 = "<p>Question 1: Functions in JavaScript starts with the keyword:</p>"
    let question1 = "<p>Question 2: Which of the follow is a not a valid JavaScript primitive data type?</p>"
    let question2 = "<p>Question 3: Which of the follow ways to declare an array is correct</p>"
    let question3 = "<p>Question 4: What will be the value of sum?<br>" + 
                    "<span class='purple'>var</span> a <span class='green'>=</span> 4<br>" +
                    "<span class='purple'>var</span> b <span class='green'>=</span> <span class='light_green'>'5'</span><br>" +
                    "<span class='purple'>var</span> sum <span class='green'>=</span> a <span class='green'>+</span> b</p>"
    let question4 = "<p>Question 5: When do we use bracket notations?</p>"

    let my_question = [[],[],[],[],[]];
    my_question[0].text = question0;
    my_question[0].option0 = '<input type="radio" name="question1" value="0">function<br>'
    my_question[0].option1 = '<input type="radio" name="question1" value="1">method<br>'
    my_question[0].option2 = '<input type="radio" name="question1" value="2">fun<br>'
    my_question[0].option3 = '<input type="radio" name="question1" value="3">var<br><br>' 
    
    my_question[1].text = question1;
    my_question[1].option0 = '<input type="radio" name="question2" value="0">Numeric<br>'
    my_question[1].option1 = '<input type="radio" name="question2" value="1">String<br>'
    my_question[1].option2 = '<input type="radio" name="question2" value="2">Boolean<br>'
    my_question[1].option3 = '<input type="radio" name="question2" value="3">Date<br><br>'

    my_question[2].text = question2;
    my_question[2].option0 = '<input type="radio" name="question3" value="0"><span class="purple">var</span> color;<br>' +
    '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;color <span class="green">=</span> [<span class="light_green">"red", "blue", "yellow"</span>];<br>'
    my_question[2].option1 = '<input type="radio" name="question3" value="1">' +
    '<span class="purple">var</span> color <span class="green">=</span>' +
    '[<span class="light_green">"red", "yellow",</span> <span class="orange">3</span>];<br>'
    my_question[2].option2 = '<input type="radio" name="question3" value="2">' +
    '<span class="purple">var</span> color <span class="green">=</span>' +
    '[<span class="light_green">"red", "yellow",</span> <span class="orange">false</span>];<br>'
    my_question[2].option3 = '<input type="radio" name="question3" value="3">All of the above<br><br>'
    
    my_question[3].text = question3;
    my_question[3].option0 = '<input type="radio" name="question4" value="0">undefined<br>'
    my_question[3].option1 = '<input type="radio" name="question4" value="1">error<br>'
    my_question[3].option2 = '<input type="radio" name="question4" value="2">45<br>'
    my_question[3].option3 = '<input type="radio" name="question4" value="3">9<br><br>'

    my_question[4].text = question4;
    my_question[4].option0 = '<input type="radio" name="question5" value="0">When we are accessing properties of objects that contains operators<br>'
    my_question[4].option1 = '<input type="radio" name="question5" value="1">When we might have to convert the property name to a string<br>'
    my_question[4].option2 = '<input type="radio" name="question5" value="2">It does the same thing as the dot notation, so whenever we feel like it<br>'
    my_question[4].option3 = '<input type="radio" name="question5" value="3">All of the above<br><br>'

    let my_answers = [1, 4, 4, 3, 4];
    
    let how_many_questions = prompt("How many question would you like to try?");

    if (how_many_questions != null) {
        if (how_many_questions > 5) {
            how_many_questions = 5;
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