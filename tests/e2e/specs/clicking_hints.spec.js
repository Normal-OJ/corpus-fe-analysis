import hints from '../../../src/util/hint';

describe('Clicking hints at ChaHeaderInput', () => {
  it('Opens the dialog with hints', () => {
    // visit upload page
    cy.visit('/upload')

    // click (select) 手動輸入文本
    cy.get('[data-cy="goManuallyBtn"]').click()

    // assert that the ui-hint component is exist and hint dialog is invisible
    cy.get('[data-cy="nameCodeHint"]')
      .should('be.hidden')

    // assert that the input is exist
    cy.get('[data-cy="nameCode"]')
      .should('contain', '*說話者代碼 (Name code) (必填)')

    // open the hint dialog next to the input
    cy.get('[data-cy="nameCode"] > button')
      .click()

    // assert that title and content is exist
    cy.contains('說話者代碼 (Name code) (必填)')
    cy.get('[data-cy="uiHintContent"]')
      .should('have.html', hints.nameCode)

    // close the hint dialog
    cy.get('[data-cy="uiHintCloseBtn"]')
      .click()

    // assert that hint dialog is invisible
    cy.get('[data-cy="uiHintContent"]')
      .should('be.hidden')
    cy.get('[data-cy="nameCodeHint"]')
      .should('be.hidden')
  })
})