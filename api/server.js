const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/registration", (req, res) => {
  res.send(`
    <html>
      <body>
        <h1>Formulário de Cadastro</h1>
      </body>
    </html>
  `);
});

app.post("/registration", (req, res) => {
  const data = req.body;

  const validationCommonFields =
    data.email && data.registrationType && data.password;

  const validatePhysicalPerson = data.name && data.cpf && data.birthDate;
  const validateLegalPerson =
    data.corporateName && data.cnpj && data.foundingDate;

  if (!validationCommonFields) {
    return res.status(400).json({ error: "Dados comuns incompletos" });
  }

  if (data.registrationType === "pf") {
    if (!validatePhysicalPerson) {
      return res
        .status(400)
        .json({ error: "Dados de pessoa física incompletos" });
    }
  } else if (data.registrationType === "pj") {
    if (!validateLegalPerson) {
      return res
        .status(400)
        .json({ error: "Dados de pessoa jurídica incompletos" });
    }
  } else {
    return res.status(400).json({ error: "Tipo de registro inválido" });
  }

  res.json({ success: true, message: "Cadastro realizado com sucesso!" });
});

app.listen(port, () => {
  console.info(`Servidor rodando na porta ${port}`);
});
