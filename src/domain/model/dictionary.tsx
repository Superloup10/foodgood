export type Dictionary = {
    sr: {
        language: string;
    };
    languages: {
        fr: string;
        en: string;
    };
    category: {
        meat: string;
        grocery: string;
        fruit: string;
        vegetable: string;
        dairy_product: string;
        [key: string]: string;
    };
    navebar: {
        products: string;
        contact: string;
        account: string;
        [key: string]: string;
    };
    account: {
        name: string;
        first_name: string;
        email: string;
        address: string;
        phone: string;
        submit: string;
        signup: string;
        login: string;
        [key: string]: string;
    }
};
