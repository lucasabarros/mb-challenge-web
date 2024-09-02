import { render, screen, fireEvent } from "@testing-library/vue";
import Step1 from "@components/UserRegistration/Step1/Step1.vue";

test("should render email input and radio group", async () => {
  render(Step1, {
    global: {
      provide: {
        formData: {
          email: "",
          registrationType: "",
        },
        errors: {},
      },
    },
  });

  expect(screen.getByLabelText(/Endereço de e-mail/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Pessoa Física/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Pessoa Jurídica/i)).toBeInTheDocument();
});

test("should update email input", async () => {
  const { getByLabelText } = render(Step1, {
    global: {
      provide: {
        formData: {
          email: "",
        },
        errors: {},
      },
    },
  });

  const emailInput = getByLabelText(/Endereço de e-mail/i);
  await fireEvent.update(emailInput, "test@test.com");
  expect(emailInput.value).toBe("test@test.com");
});
