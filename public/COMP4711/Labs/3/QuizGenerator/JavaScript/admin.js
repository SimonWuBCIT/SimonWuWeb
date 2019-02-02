let number_of_questions = 0;

window.onload = function() {
    populate_questions();
    create_button(document.getElementsByClassName("button_container")[0], strings[document.documentElement.lang].add_text, "add_button");
    create_button(document.getElementsByClassName("button_container")[0], strings[document.documentElement.lang].submit_text, "submit_button");

    bind_add_button();
    bind_submit_button();
}

function bind_add_button() {
    document.querySelector("button.add_button").onclick = function () {
        let question_number = document.querySelectorAll(".lab_questions").length
        load_question(question_number + 1);
    }
}

function bind_submit_button() {
    document.querySelector("button.submit_button").onclick = function () {
        storeQuiz();
    }
}

function bind_delete_button(button) {
    button.onclick = function () {
        let question_div = $(this).closest('.lab_questions');
        question_div.remove();
    }
}

function storeQuiz() {
    let question_div;
    let data;

    function Question() {
        this.number = "";
        this.topic = "";
        this.options = [];
        this.correct_answer = "";
    }

    let question_list = [];
    let answer_list = [];
    let answer_count = 0;
    let answer_radio = [];

    for (let i = 0; (question_div = document.getElementsByClassName("lab_questions")[i]) != undefined; ++i) {
        question_list[i] = new Question();
        question_list[i].number = i + 1
        question_list[i].topic = question_div.querySelector("textarea").value;
        
        answer_list = question_div.querySelectorAll("input.answer_option");
        for (answer_count = 0; answer_count < answer_list.length; ++answer_count) {
            question_list[i].options[answer_count] = answer_list[answer_count].value;
        }

        answer_radio = question_div.querySelectorAll('[type="radio"]');
        for (answer_count = 0; answer_count < answer_radio.length; ++answer_count) {
            if (answer_radio[answer_count].checked) {
                question_list[i].correct_answer = answer_radio[answer_count].value;
            }
        }
    }
    data = JSON.stringify(question_list);
    window.localStorage.setItem("questions", data);
}

function create_button(container, button_text, class_name) {
    let button = document.createElement("button");
    button.innerHTML = button_text;
    button.style.marginTop = "20px";
    button.classList.add(class_name);

    container.appendChild(button);

    return button;
}

function populate_questions() {
    let raw_data = window.localStorage.getItem("questions");
    let data = JSON.parse(raw_data); 
    let question_div;
    let answer_list = [];
    let answer_count = 0;
    let answer_radio;

    if (data === "undefined" || data === null || data.length === 0) {
        load_question();
        ++number_of_questions;
    } else {
        for (let i = 0; i < data.length; ++i) {
            load_question(i + 1);
            question_div = document.getElementsByClassName("lab_questions")[i];
            question_div.querySelector("textarea").value = data[i].topic;
            
            answer_list = question_div.querySelectorAll("input.answer_option");
            for (answer_count = 0; answer_count < answer_list.length; ++answer_count) {
                answer_list[answer_count].value = data[i].options[answer_count];
            }

            answer_radio = question_div.querySelectorAll('[type="radio"]')[data[i].correct_answer];
            answer_radio.checked = true;
        }
    }
}

function load_question(question_number = 1) {
    let question_div = document.createElement("div");
    question_div.classList.add("lab_questions");

    let question_title = document.createElement("p");
    
    if (typeof(question_number) != "number") {
        question_number = 1;
    }
    ++number_of_questions;

    question_title.innerHTML = "Question " + number_of_questions;
    question_div.appendChild(question_title);
    let delete_button = create_button(question_title, strings[document.documentElement.lang].delete_text, "delete_button");
    bind_delete_button(delete_button);

    let text_box = document.createElement("textarea");
    text_box.style.width = "50vw";
    text_box.style.height = "10vh";
    question_div.appendChild(text_box);

    let radio_buttons = [];
    let labels = [];
    let break_elements = [];

    for (let i = 0; i < 4; ++i) {
        radio_buttons[i] = document.createElement("input");
        radio_buttons[i].type = "radio";
        radio_buttons[i].name = "option" + number_of_questions;
        radio_buttons[i].value = i;
        radio_buttons[i].style.width = "5vw";
        radio_buttons[i].style.margin = "0";

        labels[i] = document.createElement("input");
        labels[i].classList.add("answer_option");
        labels[i].style.width = "45vw";

        break_elements[i] = document.createElement("br");

        question_div.appendChild(break_elements[i]);
        question_div.appendChild(radio_buttons[i]);
        question_div.appendChild(labels[i])
    }

    document.getElementsByClassName("list_of_questions")[0].appendChild(question_div);
}
