console.log('\n\n%cScript contato.js carregado!\n\n\n', 'background-color:yellowgreen;color:#000;');

/*
 * Variáveis
 */

// Formulário
const formulario = document.querySelector('#formContato');

// Inputs do Formulário
const nome = formulario.querySelector('#nome'),
    email = formulario.querySelector('#email'),
    cep = formulario.querySelector('#cep'),
    cidade = formulario.querySelector('#cidade'),
    estado = formulario.querySelector('#estado'),
    logradouro = formulario.querySelector('#logradouro'),
    bairro = formulario.querySelector('#bairro'),
    numero = formulario.querySelector('#numero'),
    complemento = formulario.querySelector('#complemento'),
    mensagem = formulario.querySelector('#mensagem');

// Botões do Formulário
const limparBtn = formulario.querySelector('[type="reset"]'),
    enviarBtn = formulario.querySelector('#formContato [type="submit"]');

// Modal
const modalLimparForm = formulario.querySelector('#modalLimparForm'),
    modalBody = formulario.querySelectorAll('.modal-body')[0],
    modalFecharBtn = formulario.querySelectorAll('button.close')[0],
    modalLimparBtn = formulario.querySelector('#confirmarLimparForm'),
    modalCancelarLimparBtn = formulario.querySelector('#cancelarLimparForm');

/*
 * Funções
 */

const prevenirAcaoEsperada = () => {
    event.preventDefault()
};


const limparForm = () => {
    nome.value = '';
    email.value = '';
    cep.value = '';
    cidade.value = '';
    estado.value = '';
    logradouro.value = '';
    bairro.value = '';
    numero.value = '';
    complemento.value = '';
    mensagem.value = '';
}

/*
 * Eventos
 */

limparBtn.addEventListener('click', () => {
    prevenirAcaoEsperada();
    console.log('Aplicando o preventDefault() ao botão de limpar quando clicamos nele. Isso através do eventListener.');
});

modalLimparBtn.addEventListener('click', () => {

    modalCancelarLimparBtn.setAttribute('disabled', '');
    modalLimparBtn.setAttribute('disabled', '');

    modalBody.firstElementChild.innerText = 'Limpando os campos do seu form...';

    setTimeout( () => {

        limparForm();

        modalBody.firstElementChild.innerHTML = '<b>Campos zerados!</b>';

        novoParagrafoModalBody = document.createElement('p');

        textoNovoParagrafoModalBody = document.createTextNode('Vamos fechar esse modal');

        novoParagrafoModalBody.appendChild(textoNovoParagrafoModalBody);

        modalBody.appendChild(novoParagrafoModalBody);

        setTimeout( () => {

            modalFecharBtn.click();

            modalCancelarLimparBtn.removeAttribute('disabled');
            modalLimparBtn.removeAttribute('disabled');

            modalBody.firstElementChild.innerText = 'Você tem certeza que deseja limpar o formulário?';

            modalBody.children[1].remove();

        }, 1500);


    }, 1500);

    

});

formatarCep = function () {

    cepDigitado = this.value;

    if ( cepDigitado.length === 5 ) {

        this.value += '-';

    } else if (cepDigitado.length > 0 && cepDigitado.length <= 9 ) {

        console.log(`Caractere incluso no campo CEP: ${cepDigitado}`)

    };

}

cep.addEventListener('keyup', formatarCep);

function retorno_callback_viacep (resposta) {

    if(!('erro' in resposta)) {

        logradouro.value = resposta.logradouro;
        bairro.value = resposta.bairro;
        cidade.value = resposta.localidade;

        let estados = formulario.querySelectorAll('option');

        for(cadaEstado of estados) {
            if ( cadaEstado === resposta.uf ) {
                cadaEstado.setAttribute('selected', '');
            }
        };

        numero.focus();
        
    } else {
        alert('Opa! parece que esse CEP nao existe! Digite um CEP válido, por favor');

        cidade.value = '';
        estado.firstElementChild.setAttribute('selected', '');
        logradourovalue = '';
        bairrovalue = '';
    }

}

function pesquisarCep (el) {

    let cepLimpo = el.replace(/\D/g, '');

    let cepParte1 = cepLimpo.substr(0,5);
    let cepParte2 = cepLimpo.substr(5,3);
    cep.value = `${cepParte1}-${cepParte2}`;

    if(cep.value.length !== 9) {

        cep.focus();

        cep.previousElementSibling.innerText = 'CEP = Verifique o CEP';
        cep.previousElementSibling.classList.add('text-danger');

    }

    if ( cepLimpo != '') {
        let formatoCep = /^[0-9]{8}$/;

        if(formatoCep.test(cepLimpo)) {
            logradouro.value = '...';
            bairro.value = '...';
            cidade.value = '...';

            scriptCep = document.createElement('script');

            scriptCep.src = `https://viacep.com.br/ws/${cepLimpo}/json/?callback=retorno_callback_viacep`;

            document.body.appendChild(scriptCep);
        }
    }
}