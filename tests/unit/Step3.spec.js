import { render, screen } from "@testing-library/vue";
import Step3 from "@/components/UserRegistration/Step3/Step3.vue";

test("should render password input", () => {
  const formData = { password: "" };
  const errors = { password: "" };

  render(Step3, {
    global: {
      provide: {
        formData,
        errors,
      },
    },
  });

  expect(
    screen.getByLabelText("Senha", { selector: "input" })
  ).toBeInTheDocument();
});
