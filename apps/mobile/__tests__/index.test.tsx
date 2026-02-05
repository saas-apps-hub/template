import { render } from "@testing-library/react-native";
import HomeScreen from "../src/app";

describe("HomeScreen", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(<HomeScreen />);
    expect(getByTestId("heading")).toHaveTextContent(/Welcome/);
  });
});
