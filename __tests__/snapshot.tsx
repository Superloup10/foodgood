import "@testing-library/jest-dom";
import {render} from "@testing-library/react";
import Home from "@/app/[lang]/page";

it("renders homepage unchanged", () => {
    const {container} = render(<Home/>);
    expect(container).toMatchSnapshot();
});
