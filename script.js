
emailjs.init("_VbqmhA7tyO_z_5bs");
// Função para enviar e-mail
function sendEmail() {
    const form = document.getElementById('emailForm');
    
    const name = form.elements['name'].value;
    const email = form.elements['email'].value;
    const message = form.elements['message'].value;



    if (validateForm(name, email, message)) {
        if (isValidEmail(email)) {

            emailjs.sendForm('service_rar3rwr', 'template_c2or60n', form)
                .then((response) => {
                    alert('E-mail enviado com sucesso:', response);

                })
                .catch((error) => {
                    alert('Erro ao enviar o e-mail:', error);

                });
        } else {
            alert('Por favor, insira um e-mail válido.');
        }
    } else {
        alert('Por favor, preencha todos os campos do formulário.');
    }
}


function validateForm(name, email, message) {

    return name.trim() !== '' && email.trim() !== '' && message.trim() !== '';
}


function isValidEmail(email) {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
