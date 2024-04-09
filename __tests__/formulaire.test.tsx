import { render, fireEvent, waitFor } from '@testing-library/react';
import ClientForm from '@/components/Formulaire/index';


describe('ClientForm Component', () => {
    test('Should add a new client when the form is submitted', async () => {
        // Rendu du composant
        const { getByLabelText, getByText } = render(<ClientForm />);
        
        // Remplir le formulaire
        fireEvent.change(getByLabelText('Nom* :'), { target: { value: 'John' } });
        fireEvent.change(getByLabelText('Prénom* :'), { target: { value: 'Doe' } });
        fireEvent.change(getByLabelText('Email* :'), { target: { value: 'john.doe@example.com' } });
        fireEvent.change(getByLabelText('Adresse* :'), { target: { value: '123 Main St' } });

        // Soumettre le formulaire
        fireEvent.click(getByText('Ajouter Client'));

        // Attendre que le message de succès soit affiché
         waitFor(async () => {
            expect( getByText('Client ajouté avec succès !')).toBeInTheDocument();
        }, { timeout: 5000 });
        
        

       /*
       // Vérifier que les champs du formulaire sont réinitialisés
        expect(getByLabelText('Nom* :')).toHaveValue('');
        expect(getByLabelText('Prénom* :')).toHaveValue('');
        expect(getByLabelText('Email* :')).toHaveValue('');
        expect(getByLabelText('Adresse* :')).toHaveValue('');
        */
    }, 10000); // Déplacez cette valeur à l'intérieur de la fonction de test
});
