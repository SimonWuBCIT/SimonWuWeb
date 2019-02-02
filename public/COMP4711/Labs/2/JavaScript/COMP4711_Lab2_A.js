function load_button() {
    for (let character = 0; character < 26; ++character) {
        if (character == 13) {
            let break_text = document.createElement("br");
            document.getElementsByClassName("questions")[0].appendChild(break_text);
        }
        let alpha_button = document.createElement("BUTTON");
        alpha_button.innerHTML = String.fromCharCode(65 + character);
        alpha_button.onclick = function() {alert(alpha_button.innerHTML);};
        document.getElementsByClassName("questions")[0].appendChild(alpha_button);
    }
}