/// <reference types="cypress" />
describe("home page", () => {

    beforeEach(() => {

        cy.fixture('transactions').as('mockData');

        cy.server()
        cy.route('https://api.tzstats.com/tables/**', '@mockData').as('transactions');

        cy.visit('/');
    });

    it("should load transactions page", () => {

        cy.location('pathname').should('equal', '/transactions')
        cy.contains('Transactions');

        cy.wait('@transactions');

        cy.get('tbody > tr').should("have.length", 3);
        cy.get('tbody > tr').first().should("contain", 'tz....Cj4MX');
    });
});