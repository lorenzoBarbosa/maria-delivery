const cadastroButton = document.querySelector(".menu-cadastro");
console.log(cadastroButton);

const overlay = document.getElementById("overlay");
console.log(overlay);

cadastroButton.addEventListener("click", function(event) {
    overlay.classList.add("ativo");
    console.log("clicou");
});

const fecharCard = document.getElementById("fechar-card");
console.log(fecharCard);

fecharCard.addEventListener("click", function(event) {
    overlay.classList.remove("ativo");
    console.log("clicou");
});

const fecharCard2 = document.getElementById("overlay");
console.log(fecharCard2);
fecharCard2.addEventListener("click", function(event) {
    if(event.target === overlay){
        overlay.classList.remove("ativo");
        console.log("clicou");
    }
});

const observador = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add("ativo");
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll(".revelar").forEach((el) => observador.observe(el));


async function enviarDados(dados){
    try{
        const resposta = await fetch("http://localhost:5678/webhook/maria-delivery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
        });

        if (resposta.status === 200) {
            mensagem.textContent = "Cadastro realizado com sucesso!";
            alert("Cadastro realizado com sucesso!")
            overlay.classList.remove("ativo");
        } else if (resposta.status === 400) {
            alert("Email não cadastrado, digite novamente.")
            mensagem.textContent = "Seu e-mail não é válido, tente novamente!";
        } else {
            mensagem.textContent = "Erro no servidor. Tente novamente mais tarde.";
            overlay.classList.remove("ativo");
        }
    }
    catch (erro) {
        console.error("Erro ao enviar os dados:", erro);
    }

}

const form = document.getElementById("form-cadastro");
const mensagem = document.getElementById("mensagem");

form.addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;

    if (!email.includes("@")) {
        mensagem.textContent = "Digite um e-mail válido.";
        return;
    }

    if (senha.length < 6) {
        mensagem.textContent = "A senha deve ter pelo menos 6 caracteres.";
        return;
    }

    mensagem.textContent = "Enviando...";

    const dados = { email, senha };
    await enviarDados(dados);
});

const menuBotao = document.getElementById("menu-botao");
const menu = document.querySelector(".menu");

menuBotao.addEventListener("click", function() {
    const aberto = menu.classList.toggle("ativo");
    menuBotao.classList.toggle("ativo", aberto);
    menuBotao.setAttribute("aria-expanded", aberto);
});

cadastroButton.addEventListener("click", function() {
    menu.classList.remove("ativo");
    menuBotao.classList.remove("ativo");
    menuBotao.setAttribute("aria-expanded", "false");
});