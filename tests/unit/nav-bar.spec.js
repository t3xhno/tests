import NavBar from "@/components/NavBar";
import { render, screen } from "@testing-library/vue";

describe("NavBar", () => {
  const renderNavBar = (props) => render(NavBar, { props });

  it("Shows logout if authenticated", () => {
    renderNavBar({ authenticated: true });
    screen.getByText("Logout");
  });

  it("Defaults to false, shows login", () => {
    renderNavBar();
    screen.getByText("Login");
  });

  it("Shows login when explicityl false", () => {
    renderNavBar({ authenticated: false });
    screen.getByText("Login");
  });
});
