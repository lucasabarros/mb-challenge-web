import { render, screen, fireEvent } from "@testing-library/vue";
import UserRegistration from "@/views/UserRegistration/UserRegistration.vue";

test("should show error messages when required fields are empty and submit is clicked", async () => {
  render(UserRegistration);

  await fireEvent.update(
    screen.getByLabelText(/Endereço de e-mail/i),
    "test@example.com"
  );
  await fireEvent.click(screen.getByLabelText(/Pessoa Física/i));
  await fireEvent.click(screen.getByText(/Continuar/i));

  await fireEvent.click(screen.getByText(/Continuar/i));

  expect(
    screen.getByText(/Por favor, insira o\(a\) nome\./i)
  ).toBeInTheDocument();
  expect(
    screen.getByText(/Por favor, insira o\(a\) cpf\./i)
  ).toBeInTheDocument();
  expect(
    screen.getByText(/Por favor, insira o\(a\) data\./i)
  ).toBeInTheDocument();
});
