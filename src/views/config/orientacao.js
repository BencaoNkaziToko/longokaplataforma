<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Orientação Vocacional</title>
  <style>
    /* Estilos para o modal */
    .modal {
      display: none;
      position: fixed;
      z-index: 1;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background-color: rgba(0, 0, 0, 0.5);
    }
    .modal-content {
      background-color: #fefefe;
      margin: 15% auto;
      padding: 20px;
      border: 1px solid #888;
      width: 80%;
    }
    .close {
      color: #aaa;
      float: right;
      font-size: 28px;
      font-weight: bold;
    }
    .close:hover,
    .close:focus {
      color: black;
      text-decoration: none;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div id="perguntas">
    <!-- As perguntas serão inseridas aqui -->
  </div>
  <button onclick="iniciarOrientacao()">Iniciar Orientação</button>

  <!-- Modal -->
  <div id="resultadoModal" class="modal">
    <div class="modal-content">
      <span class="close" onclick="fecharModal()">&times;</span>
      <h2>Cursos Compatíveis</h2>
      <ul id="listaCursos"></ul>
    </div>
  </div>

  <script>
    const cursos = {
      "Engenharia": ["Gosta de resolver problemas práticos?", "Interessa-se por matemática e física?"],
      "Administração": ["Gosta de liderar e organizar atividades?", "Interessa-se por gestão e estratégia de negócios?"],
      "Medicina": ["Tem interesse em ajudar os outros?", "Gosta de lidar com questões relacionadas à saúde?"],
      "Design": ["Tem habilidades criativas?", "Gosta de expressar suas ideias visualmente?"],
      "Ciência da Computação": ["Gosta de resolver problemas lógicos?", "Interessa-se por tecnologia e programação?"],
      "Psicologia": ["Gosta de compreender o comportamento humano?", "Interessa-se por terapia e aconselhamento?"],
      "Direito": ["Gosta de debater e argumentar?", "Interessa-se por justiça e resolução de conflitos?"],
      "Educação": ["Gosta de ensinar e transmitir conhecimento?", "Interessa-se por pedagogia e desenvolvimento educacional?"],
      "Arquitetura": ["Tem interesse em criar espaços habitáveis?", "Gosta de desenhar e visualizar projetos arquitetônicos?"],
      "Jornalismo": ["Gosta de investigar e relatar eventos?", "Interessa-se por comunicação e mídia?"],
      "Gastronomia": ["Gosta de cozinhar e experimentar novos sabores?", "Interessa-se por gastronomia e culinária?"],
      "Engenharia Civil": ["Gosta de construir estruturas e infraestruturas?", "Interessa-se por engenharia e construção?"],
      "Artes Cênicas": ["Tem habilidades de atuação?", "Interessa-se por teatro e performance?"],
    };

    let perguntasDiv;
    let resultadoModal;

    function iniciarOrientacao() {
      perguntasDiv = document.getElementById("perguntas");
      resultadoModal = document.getElementById("resultadoModal");

      mostrarProximaPergunta();
    }

    function mostrarProximaPergunta() {
      if (perguntasDiv.children.length === 0) {
        mostrarResultado();
        return;
      }

      const proximaPergunta = perguntasDiv.firstElementChild;
      perguntasDiv.removeChild(proximaPergunta);
      const curso = proximaPergunta.dataset.curso;
      const pergunta = proximaPergunta.dataset.index;

      const resposta = prompt(cursos[curso][pergunta] + " (sim/não)").toLowerCase();
      if (resposta === "sim") {
        mostrarProximaPergunta();
      } else {
        const novaPergunta = proximaPergunta.cloneNode(true);
        perguntasDiv.appendChild(novaPergunta);
      }
    }

    function mostrarResultado() {
      const cursosCompatíveis = [];
      for (let curso in cursos) {
        let compativel = true;
        for (let i = 0; i < cursos[curso].length; i++) {
          const resposta = prompt(cursos[curso][i] + " (sim/não)").toLowerCase();
          if (resposta !== "sim") {
            compativel = false;
            break;
          }
        }
        if (compativel) {
          cursosCompatíveis.push(curso);
        }
      }

      const listaCursos = document.getElementById("listaCursos");
      listaCursos.innerHTML = "";
      cursosCompatíveis.forEach(curso => {
        const itemCurso = document.createElement("li");
        itemCurso.textContent = curso;
        listaCursos.appendChild(itemCurso);
      });

      resultadoModal.style.display = "block";
    }

    function fecharModal() {
      resultadoModal.style.display = "none";
    }
  </script>
</body>
</html>
