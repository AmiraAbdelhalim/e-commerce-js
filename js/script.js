const submitBtn = document.querySelector('#submitBtn');
const nameField = document.querySelector('#name-field');
const emailField = document.querySelector('#email-field');
const subField = document.querySelector('#sub-field');
const msgField = document.querySelector('#msg-field');
const container = document.querySelector('#contact');

submitBtn.onclick = function(ev) {
    ev.preventDefault();
    // console.log(ev);
    const name = ev.target.form.elements[0].value;
    const email = ev.target.form.elements[1].value;
    const subject = ev.target.form.elements[2].value;
    const msg = ev.target.form.elements[3].value;

    const json = {"name": name, "email": email, "subject": subject, "message": msg};

    sendMsg(json);
    
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
        const resultField = document.createElement('p');
        
        if(msg.status){
            resultField.textContent = msg.message;
            resultField.style.color = 'green';
        }

        container.appendChild(resultField);
    });
}