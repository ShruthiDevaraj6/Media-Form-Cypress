const data = require ('C:/Users/dshru/Cypress Automation/cypress/fixtures/editorPage.json')
import {userSignUp} from "../PageObjects/EditorFormselectors"
describe('Verify media form sign up', () => 
{
    let userdata;
    before(()=>{  
    
        cy.fixture('editorPage.json').then((data)=>{
        userdata=data
            })
        }) 
    it('Verify first signup page', () => {
      cy.visit("https://editorielle-fe-uat.vercel.app/media-form")
      cy.fixture('editorPage.json').then((data =>{
      cy.title().should('eq','Editorielle')
      cy.get('.gap-x-6').children('.flex-wrap').children().eq(0).children('div.w-full').find(userSignUp.form.firstName).type(userdata.firstname);
      //cy.get(userSignUp.form.firstName).type(userdata.firstname, {force:true})
      //cy.get(userSignUp.form.lastName).type(userdata.lastname, {force:true})
      cy.get('.gap-x-6').children('.flex-wrap').children(':nth-child(2)').children('div.w-full').children(userSignUp.form.lastName).type(userdata.lastname);
      cy.get(userSignUp.form.email).type(userdata.email, {force:true})
      cy.get(userSignUp.form.nameOfPub).type(userdata.publicationName,{force:true})
      cy.get(userSignUp.form.pubWebsite).type(userdata.publicationSite, {force:true})
      //Click Next
      cy.get(userSignUp.form.submitBtn).then(($button) => {
       
        if ($button.is(':enabled')) {
          
          cy.wrap($button).click({force:true});
        } else {
          
          cy.log('Fill in all the fields');
        }
      });
      //Second Page
      //Media type dropdown
      cy.get(userSignUp.form.mediatypeDropdown).then(($dropdown) => {
        cy.wrap($dropdown).scrollIntoView();
        cy.wrap($dropdown).click();
        cy.contains("Podcast").click()
      });
      //I am dropdown
      cy.get(userSignUp.form.iamDropdown).then(($dropdown) => {
        cy.wrap($dropdown).scrollIntoView();
        cy.wrap($dropdown).click();
        cy.contains("Podcaster").click()
      });
      //Request Title
      cy.get('.gap-x-6').children(':nth-child(3)').children('div.w-full').children(userSignUp.form.reqTitle).type(userdata.requestTitle)
      //Details
      cy.get('.gap-x-6').children(':nth-child(4)').children(':nth-child(1)').children(userSignUp.form.details).type(userdata.details)
      //Negative assertion if the details are less than 10 characters
      //cy.get('.gap-x-6').children(':nth-child(4)').children(':nth-child(1)').children('textarea:nth-child(1)').should('not.be.visible').and('not.contain','Enquiry must be at least 10 characters')
      //Click Next
      cy.get(userSignUp.form.submitBtn).then(($button) => {
       
        if ($button.is(':enabled')) {
          
          cy.wrap($button).click({force:true});
        } else {
          
          cy.log('Fill in all the fields');
        }
      });
    }))

    //Verify third page
    //Datepicker
    cy.get('div.w-full').children('.react-datepicker-wrapper').children('.react-datepicker__input-container').children('.w-full').type('05/05/2023{enter}')
    //Time dropdown
    cy.get('.gap-x-6').children('.date-input').children('.w-60').children('.react-datepicker-wrapper').children('.react-datepicker__input-container').children('.w-full').then(($dropdown) => {
        cy.wrap($dropdown).scrollIntoView();
        cy.wrap($dropdown).click();
        cy.contains("16:30").click()
      });
    //Toggle
    cy.get('form.w-full').children(':nth-child(3)').children(':nth-child(1)').find('button[id="headlessui-switch-\\:r0\\:"]').click({force:true})
    //Privacy policy checkbox
    cy.get('.gap-x-6').children(':nth-child(4)').children(':nth-child(1)').children('.relative').children(':nth-child(1)').children('.flex').children(userSignUp.form.privacyChkbox).click()
    //Second checkbox
    cy.get('.gap-x-6').children(':nth-child(5)').children(':nth-child(1)').children('.relative').children(':nth-child(1)').children('.flex').children(userSignUp.form.secondChkbox).click()
    //Finish and send button
    cy.get('button[data-cy="mf-submit-button"]').click({force:true})
    //Form submission success message
    cy.get('.w-full').children(':nth-child(1)').children('.flex').children('.text-center').children('.text-2xl').should('have.text','Request sent!')
       
})
})

    
  
