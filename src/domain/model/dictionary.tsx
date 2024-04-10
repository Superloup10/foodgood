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
    Nos_produits: string;
    Nous_contacter: string;
    Mon_compte: string;
    [key: string]: string;
  };
};
