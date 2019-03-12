let list_of_answers = [];
let req = new XMLHttpRequest();

window.onload = async function() {
    //retrieveQuiz();
    await getQuestions();
}

function create_button(container, button_text, class_name) {
    let button = document.createElement("button");
    button.innerHTML = button_text;
    button.style.marginTop = "20px";
    button.classList.add(class_name);

    container.appendChild(button);

    return button;
}

function bind_submit_button() {
    document.querySelector("button.submit_button").onclick = function () {
        validate_answers();
    }
}

function validate_answers() {
    let question_list = document.getElementsByClassName("lab_questions");
    let answer_radio;
    let answer_count = 0;

    let correct_answer;
    let correct_count = 0;
    let wrong_count = 0;

    for (let i = 0; i < question_list.length; ++i) {
        answer_radio = question_list[i].querySelectorAll('[type="radio"]');
        correct_answer = answer_radio[list_of_answers[i]];
        correct_answer.nextSibling.style.backgroundColor = "green";
        if (correct_answer.checked) {
            ++correct_count;
            continue;
        }
        ++wrong_count;
        for (answer_count = 0; answer_count < answer_radio.length; ++answer_count) {
            if (answer_radio[answer_count].checked) {
                answer_radio[answer_count].nextSibling.style.backgroundColor = "red";
            }
        }
    }

    let score_container = document.getElementsByClassName("scoreContainer")[0];
    score_container.innerHTML = "Correct: " + correct_count + ", Incorrect: " + wrong_count;
}

function retrieveQuiz (data) {
    //let raw_data = window.localStorage.getItem("questions");
    //let data = JSON.parse(raw_data); 
    let question_div;
    let answer_list = [];
    let answer_count = 0;
    // let answer_radio;

    if (data === "undefined" || data.length === 0) {
        let empty = document.createElement("p");
        empty.innerHTML = "No Questions";
        document.body.appendChild(empty);
    } else {
        for (let i = 0; i < data.length; ++i) {
            load_question(i + 1);
            question_div = document.getElementsByClassName("lab_questions")[i];
            question_div.querySelector(".topic").innerHTML = data[i].topic;
            
            answer_list = question_div.querySelectorAll("label.answer_option");
            for (answer_count = 0; answer_count < answer_list.length; ++answer_count) {
                answer_list[answer_count].innerHTML = data[i].selection[answer_count];
            }

            list_of_answers.push(data[i].correctAnswer);
        }
        create_button(document.getElementsByClassName("button_container")[0], strings[document.documentElement.lang].submit_text, "submit_button");
        bind_submit_button();
    }
}

function load_question(question_number = 1) {
    let question_div = document.createElement("div");
    question_div.classList.add("lab_questions");

    let question_title = document.createElement("p");
    
    if (typeof(question_number) != "number") {
        question_number = 1;
    } 

    question_title.innerHTML = "Question " + question_number;
    question_div.appendChild(question_title);

    let text_box = document.createElement("p");
    text_box.classList.add("topic");
    question_div.appendChild(text_box);

    let radio_buttons = [];
    let labels = [];
    let break_elements = [];

    for (let i = 0; i < 4; ++i) {
        radio_buttons[i] = document.createElement("input");
        radio_buttons[i].type = "radio";
        radio_buttons[i].name = "option" + question_number;
        radio_buttons[i].style.width = "5vw";
        radio_buttons[i].style.margin = "0";

        labels[i] = document.createElement("label");
        labels[i].classList.add("answer_option");
        labels[i].style.width = "45vw";

        break_elements[i] = document.createElement("br");

        question_div.appendChild(radio_buttons[i]);
        question_div.appendChild(labels[i])
        question_div.appendChild(break_elements[i]);
    }

    document.getElementsByClassName("list_of_questions")[0].appendChild(question_div);
}

async function getQuestions() {
    let url = "https://story.simonwu.work:443/getQuiz";

    const setting = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({table_name : "lab7Quiz"})
    };
    
    let res = await fetch(url, setting);
    let data = await res.json();

    load(data);
}

function load(parse_response) {
    //let response = this.responseText;
    //let parse_response = JSON.parse(response);
    for (let i = 0; i < parse_response.length; ++i) {
        let tempString = parse_response[i].selection.substring(1, parse_response[i].selection.length - 1);
        parse_response[i].selection = JSON.parse(tempString);
    }
    console.log(parse_response);
    retrieveQuiz(parse_response);
}

function unsanitize(old_string) {
    let json_string = "";
    for (let i = 0; i < old_string.length; ++i) {
        if (old_string[i] === "\\") {
            continue;
        } else {
            json_string += old_string[i];
        }
    }
    console.log(json_string);
    return json_string;
}