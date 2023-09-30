describe('template spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  });

  it('only current page is displayed', () => {
    // Use cy.get() to select all divs with class 'myPage'
    cy.get('.myPage').should('have.length.gt', 0).as('myPageDivs');

    // Use cy.get() again to select the first div with class 'active'
    cy.get('@myPageDivs')
      .eq(0) // Select the first div with class 'myPage'
      .should('have.class', 'active') // Assert that it has the class 'active'
      .should('be.visible'); // Assert that it is visible

    // Use cy.get() again to select all other divs with class 'myPage'
    cy.get('@myPageDivs')
      .not(':eq(0)') // Exclude the first div with class 'myPage'
      .should('not.have.class', 'active') // Assert that they do not have the class 'active'
      .should('not.be.visible'); // Assert that they are not visible
  });

  it('click button 2, opens page 2', () => {
    // Use cy.get() to select all divs with class 'myPage'    
    cy.get('.myPage').should('have.length.gt', 1).as('myPageDivs');

    // Use cy.get() to select all buttons with ID starting with 'button-'
    cy.get('[id^="button-"]').should('have.length.gt', 1).as('buttons');

    // Ensure there are as many buttons as there are divs
    cy.get('@myPageDivs').should('have.length.gt', 0).then(($divs) => {
      cy.get('@buttons').should('have.length', $divs.length);
    });

    // Click the button with ID 'button-1'
    cy.get('#button-1').click();

    // Check that 'div-1' became active
    cy.get('@myPageDivs')
      .eq(1) // Select the second div with class 'myPage' (index 1)
      .should('have.class', 'active') // Assert that it has the class 'active'
      .should('be.visible'); // Assert that it is visible

    // Check that current button is highlighted
    cy.get('#button-1').should('have.class', 'highlighted');
  });

  it('check buttons previous and next become inactive approprietly', () => {
    // Check that 'previous' button is disabled and 'next' is not
    cy.get('#prevBtn').should('be.disabled');
    cy.get('#nextBtn').should('not.be.disabled');

    // Click the last button with an ID starting with 'button-'
    cy.get('[id^="button-"]:last').click();
    
    // Check that 'previous' button is not disabled and 'next' is 
    cy.get('#prevBtn').should('not.be.disabled');
    cy.get('#nextBtn').should('be.disabled');
  })
});
