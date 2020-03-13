const submitBtn = document.querySelector('#submitBtn');
const nameField = document.querySelector('#name-field');
const emailField = document.querySelector('#email-field');
const subField = document.querySelector('#sub-field');
const msgField = document.querySelector('#msg-field');
const resultField = document.createElement('p');
const container = document.querySelector('#contact');

submitBtn.onclick = function(ev) {
    resultField.textContent = '';
    ev.preventDefault();
    // console.log(ev);
    const name = ev.target.form.elements[0].value;
    const email = ev.target.form.elements[1].value;
    const subject = ev.target.form.elements[2].value;
    const msg = ev.target.form.elements[3].value;

    if (!ev.target.form.checkValidity()) {
        // ev.preventDefault();
        ev.stopPropagation();

    } else {
        const json = {"name": name, "email": email, "subject": subject, "message": msg};

        sendMsg(json);
    }

    ev.target.form.classList.add('was-validated');
    
}

function sendMsg(json) {
    $.ajax({
        method: "POST",
        url: "https://afternoon-falls-30227.herokuapp.com/api/v1/contact_us",
        data: json,
        dataType: "json"
    })
    .done(function( msg ) {
        // window.open(`mailto:only1nour@ymail.com?subject=${json.subject}&body=${json.message}`);
        
        if(msg.status){
            resultField.textContent = msg.message;
            resultField.style.color = 'green';
            resultField.style.paddingTop = '1rem';
        }

        container.appendChild(resultField);
    });
}