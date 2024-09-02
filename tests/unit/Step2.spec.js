import { render, screen } from "@testing-library/vue";
import Step2 from "@components/UserRegistration/Step2/Step2.vue";

test("should render form fields based on registration type", async () => {
  const formData = {
    registrationType: "pf",
    name: "",
    cpf: "",
    birthDate: "",
  };

  render(Step2, {
    global: {
      provide: {
        formData,
        errors: {},
        formattedCpf: "",
        updateCpf: jest.fn(),
        formattedCnpj: "",
        updateCnpj: jest.fn(),
        formattedPhone: "",
        updatePhone: jest.fn(),
      },
    },
  });

  expect(screen.getByLabelText(/Nome/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/CPF/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Data de Nascimento/i)).toBeInTheDocument();
});

test("should render fields for legal person when selected", async () => {
  const formData = {
    registrationType: "pj",
    corporateName: "",
    cnpj: "",
    foundingDate: "",
  };

  render(Step2, {
    global: {
      provide: {
        formData,
        errors: {},
        formattedCpf: "",
        updateCpf: jest.fn(),
        formattedCnpj: "",
        updateCnpj: jest.fn(),
        formattedPhone: "",
        updatePhone: jest.fn(),
      },
    },
  });

  expect(screen.getByLabelText(/Razão Social/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/CNPJ/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Data de Abertura/i)).toBeInTheDocument();
});
