import "@testing-library/jest-dom";
import * as NextNavigation from "next/navigation";
import {render, screen} from "@testing-library/react";
import LocaleSwitcher from "@/components/ui/locale-switcher";
import {useDictionary} from "@/context/DictionaryContext";
import french from "@/dictionaries/fr.json"
import english from "@/dictionaries/en.json"

jest.mock("next/navigation");
jest.mock('@/context/DictionaryContext', () => ({
    useDictionary: jest.fn()
}));

describe('LocaleSwitcher', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it("renders correctly for English locale", () => {
        (NextNavigation.usePathname as jest.Mock).mockReturnValue("/");
        (NextNavigation.useParams as jest.Mock).mockReturnValue({lang: 'en'});
        (useDictionary as jest.Mock).mockReturnValue({dictionary: english});
        render(<LocaleSwitcher/>);

        const button = screen.getByRole("button", {hidden: true});
        expect(button).toHaveTextContent("Toggle language");

        const icon = screen.getByTestId("EN");
        expect(icon).toBeInTheDocument();
    });

    it("renders correctly for French locale", () => {
        (NextNavigation.usePathname as jest.Mock).mockReturnValue("/");
        (NextNavigation.useParams as jest.Mock).mockReturnValue({lang: "fr"});
        (useDictionary as jest.Mock).mockReturnValue({dictionary: french});
        render(<LocaleSwitcher/>);

        const button = screen.getByRole("button", {hidden: true});
        expect(button).toHaveTextContent("Changer de langue");

        const icon = screen.getByTestId("FR");
        expect(icon).toBeInTheDocument();
    });
});
