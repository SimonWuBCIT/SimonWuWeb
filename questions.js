let questions = [];
let options = [];

exports.initAll = function () {
    populateQuestions();
};

exports.myQuestions = function (question_number) {
    return questions[question_number];
};

exports.myOptions = function (question_number) {
    populateOptions(question_number);
    return options;
}

exports.myAnswers = function (question_number) {
    let answer = 0;
    switch (question_number) {
        case 0:
            answer = 0;
            break;
        case 1:
            answer = 2;
            break;
        case 2:
            answer = 0;
            break;
        case 3:
            answer = 3;
            break;
        default:
            answer = 2;
            break;
    }
    return answer;
}

function populateQuestions() {
    questions[0] = "Question 1: In an object method, this refers to:"
    questions[1] = "Question 2: In HTML event handlers, what does this refer to?"
    questions[2] = "Question 3: In a JavaScript function, what is the default binding for this?"
    questions[3] = "Question 4: What does this refer to in the code:<br>" +
        "var x = this;"
    questions[4] = "Question 5: What does this refer to in the following code?<br>" +
        "var person1 = { firstName: function() {return this.firstName;}}<br>" +
        "var person2 = { firstName: ''John'',}<br>" +
        "person1.fullName.call(person2);"
}

function populateOptions(question_number) {
    switch (question_number) {
        case 0:
            options[0] = "<input type=''radio'' name=''question1'' value=''0''>The ''owner'' of the method<br>"
            options[1] = "<input type=''radio'' name=''question1'' value=''1''>The global object<br>"
            options[2] = "<input type=''radio'' name=''question1'' value=''2''>The immediate child of the ''owner''<br>"
            options[3] = "<input type=''radio'' name=''question1'' value=''3''>Invalid<br><br>"
            break;
        case 1:
            options[1] = "<input type=''radio'' name=''question2'' value=''0''>The global object<br>"
            options[2] = "<input type=''radio'' name=''question2'' value=''1''>Invalid<br>"
            options[3] = "<input type=''radio'' name=''question2'' value=''2''>The HTML element that received the event<br>"
            options[4] = "<input type=''radio'' name=''question2'' value=''3''>The parent of the HTML element<br><br>"
            break;
        case 2:
            options[0] = "<input type=''radio'' name=''question3'' value=''0''>The owner of the function<br>"
            options[1] = "<input type=''radio'' name=''question3'' value=''1''>The function pointer<br>"
            options[2] = "<input type=''radio'' name=''question3'' value=''2''>The return value<br>"
            options[3] = "<input type=''radio'' name=''question3'' value=''3''>None of the above<br><br>"
            break;
        case 3:
            options[0] = "<input type=''radio'' name=''question4'' value=''0''>undefined<br>"
            options[1] = "<input type=''radio'' name=''question4'' value=''1''>null<br>"
            options[2] = "<input type=''radio'' name=''question4'' value=''2''>x<br>"
            options[3] = "<input type=''radio'' name=''question4'' value=''3''>The global object<br><br>"
            break;
        default:
            options[0] = "<input type=''radio'' name=''question5'' value=''0''>null<br>"
            options[1] = "<input type=''radio'' name=''question5'' value=''1''>Undefined<br>"
            options[2] = "<input type=''radio'' name=''question5'' value=''2''>person2<br>"
            options[3] = "<input type=''radio'' name=''question5'' value=''3''>0<br><br>"
            break;
    }
}
