import { render, screen, cleanup } from "@testing-library/vue";
import Step4 from "@/components/UserRegistration/Step4/Step4.vue";

test("should render summary of information based on registration type", () => {
  const formDataPf = {
    registrationType: "pf",
    email: "test@test.com",
    name: "Lucas Barros",
    cpf: "123.456.789-00",
    birthDate: "2000-01-01",
    corporateName: "",
    cnpj: "",
    foundingDate: "",
    phone: "123-456-7890",
    password: "password",
  };

  const formDataPj = {
    registrationType: "pj",
    email: "test@example.com",
    name: "",
    cpf: "",
    birthDate: "",
    corporateName: "Company Inc.",
    cnpj: "12.345.678/0001-90",
    foundingDate: "2010-05-15",
    phone: "(16) 99191-9191",
    password: "123456",
  };

  const errors = {};

  render(Step4, {
    global: {
      provide: {
        formData: formDataPf,
        errors,
        formattedCpf: "123.456.789-00",
        updateCpf: jest.fn(),
        formattedCnpj: "",
        updateCnpj: jest.fn(),
        formattedPhone: "(16) 99191-9191",
        updatePhone: jest.fn(),
      },
    },
  });

  expect(screen.getByText(/Endereço de e-mail/i)).toBeInTheDocument();
  expect(screen.getByText(/Nome/i)).toBeInTheDocument();
  expect(screen.getByText(/CPF/i)).toBeInTheDocument();
  expect(screen.getByText(/Data de Nascimento/i)).toBeInTheDocument();
  expect(screen.getByText(/Telefone/i)).toBeInTheDocument();
  expect(screen.queryByText(/Razão Social/i)).toBeNull();
  expect(screen.queryByText(/CNPJ/i)).toBeNull();

  cleanup();

  render(Step4, {
    global: {
      provide: {
        formData: formDataPj,
        errors,
        formattedCpf: "",
        updateCpf: jest.fn(),
        formattedCnpj: "12.345.678/0001-90",
        updateCnpj: jest.fn(),
        formattedPhone: "(16) 99191-9191",
        updatePhone: jest.fn(),
      },
    },
  });

  expect(screen.getByText(/Endereço de e-mail/i)).toBeInTheDocument();
  expect(screen.queryByText(/Nome/i)).toBeNull();
  expect(screen.queryByText(/CPF/i)).toBeNull();
  expect(screen.queryByText(/Data de Nascimento/i)).toBeNull();
  expect(screen.getByText(/Razão Social/i)).toBeInTheDocument();
  expect(screen.getByText(/CNPJ/i)).toBeInTheDocument();
  expect(screen.getByText(/Data de Abertura/i)).toBeInTheDocument();
});
